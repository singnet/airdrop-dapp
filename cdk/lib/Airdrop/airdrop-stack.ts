import * as dotenv from "dotenv";
import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53Targets from "@aws-cdk/aws-route53-targets";
import * as path from "path";
import { buildOutputDir } from "../../bin/cdk";
import config, { appEnv } from "../../config";
import { EdgeLambda } from "@aws-cdk/aws-cloudfront";
import { Version } from "@aws-cdk/aws-lambda";

// dotenv Must be the first expression
dotenv.config();

console.log("app environment derived from process => ", process.env.APP_ENV);
const appEnvStage: appEnv = <appEnv>process.env.APP_ENV || appEnv.ropsten;
const appConfig = config.get(appEnvStage);

if (!appConfig) {
  throw new Error("Invalid config for the App");
}

const {
  appStack: { defaultLambdaName, imageLambdaName, bucketName, distributionName, imageCachePolicyName },
  zoneName,
  domainName,
  certificateARN,
} = appConfig;

console.log("certificateARN", certificateARN);

console.log("environments", {
  defaultLambdaName,
  imageLambdaName,
  bucketName,
  distributionName,
  imageCachePolicyName,
});

export class AirdropStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    console.log("inside the builder");
    // Lambda functions for handling edge page requests
    const defaultLambda = new lambda.Function(this, defaultLambdaName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(buildOutputDir, "default-lambda")),
    });

    // // Lambda functions for handling edge api requests
    // const apiLambda = new lambda.Function(this, apiLambdaName, {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: "index.handler",
    //   code: lambda.Code.fromAsset(path.join(outputDir, "api-lambda")),
    // });

    // Lambda functions for handling images
    const imageLambda = new lambda.Function(this, imageLambdaName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(buildOutputDir, "image-lambda")),
    });

    // Static Asset bucket for cloudfront distribution as default origin
    const myBucket = new s3.Bucket(this, bucketName, {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Allow images to be fetched
    myBucket.grantRead(imageLambda);

    const origin = new origins.S3Origin(myBucket);

    const cloudfrontEdgeLambdaAssociation: EdgeLambda[] = [
      {
        functionVersion: defaultLambda.currentVersion,
        eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
      },
    ];

    if (appConfig?.basicAuthLambdaARNWithVersion) {
      cloudfrontEdgeLambdaAssociation.push({
        functionVersion: Version.fromVersionArn(this, "basic_auth_lambda", appConfig.basicAuthLambdaARNWithVersion),
        eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
      });
    }

    // Default distribution requests to the default lambda
    const distribution = new cloudfront.Distribution(this, distributionName, {
      defaultBehavior: {
        origin: origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: cloudfrontEdgeLambdaAssociation,
      },
      domainNames: [domainName],
      certificate: acm.Certificate.fromCertificateArn(this, "AirdropCertificate", certificateARN),
      enableLogging: true,
    });

    // Forward static file request to s3 directly
    distribution.addBehavior("_next/static/*", origin, {});

    // // Forward API requests to the API edge lambda
    // distribution.addBehavior("api/*", origin, {
    //   edgeLambdas: [
    //     {
    //       functionVersion: apiLambda.currentVersion,
    //       eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
    //       includeBody: true,
    //     },
    //   ],
    // });

    // Image cache policy extends the default cache policy, but with query params
    const imageCachePolicy = new cloudfront.CachePolicy(this, imageCachePolicyName, {
      ...cloudfront.CachePolicy.CACHING_OPTIMIZED,
      cachePolicyName: imageCachePolicyName,
      comment: "Policy to cache images for _next/image",
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.allowList(...["url", "w", "q"]),
    });

    // Forward image requests
    distribution.addBehavior("_next/image*", origin, {
      edgeLambdas: [
        {
          functionVersion: imageLambda.currentVersion,
          eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
        },
      ],
      cachePolicy: imageCachePolicy,
    });

    // Upload deployment bucket
    new s3deploy.BucketDeployment(this, "nextJsAssets", {
      sources: [s3deploy.Source.asset(path.join(buildOutputDir, "assets"))],
      destinationBucket: myBucket,
      distribution: distribution,
      prune:true,
      retainOnDelete: false,
    });

    this.urlOutput = new cdk.CfnOutput(this, "DistributionDomain", {
      value: `https://${distribution.distributionDomainName}`,
    });

    // ROUTE53 MAPPING
    // We are using a Zone that already exists so we can use a lookup on the Zone name.
    const zone = route53.HostedZone.fromLookup(this, "baseZone", {
      domainName: zoneName,
    });

    // Create the wildcard DNS entry in route53 as an alias to the new CloudFront Distribution.
    new route53.ARecord(this, "AliasRecord", {
      zone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(distribution)),
    });

    // console.log("Airdrop stack inside: urloutput", this.urlOutput.toString());
  }
}
