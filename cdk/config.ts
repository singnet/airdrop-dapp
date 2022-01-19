import * as dotenv from "dotenv";
dotenv.config();

export const awsEnvironment = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
};

export enum appEnv {
  ropsten = "ropsten",
  mainnet = "mainnet",
}

const envS3Bucket: { [key in appEnv]: string } = {
  [appEnv.ropsten]: "snet-ropsten-v2-configs",
  [appEnv.mainnet]: "snet-mainnet-v2-configs",
};

const zoneName = "singularitynet.io";

const domainNames: { [key in appEnv]: string } = {
  [appEnv.ropsten]: "ropsten-airdrop.singularitynet.io",
  [appEnv.mainnet]: "nunet-airdrop.singularitynet.io",
};

const githubRepo = "singnet/airdrop-dapp";
const githubBranch: { [key in string]: string } = {
  ropsten: "development",
  mainnet: "master",
};

type Config = {
  repo: {
    source: string;
    branch: string;
  };
  appStack: {
    defaultLambdaName: string;
    imageLambdaName: string;
    bucketName: string;
    distributionName: string;
    imageCachePolicyName: string;
  };
  appEnvBucketPath: string;
  cdkEnvBucketPath: string;
  zoneName: string;
  domainName: string;
  certificateARN: string;
  basicAuthLambdaARNWithVersion?: string;
};

const config = new Map<appEnv, Config>();

const createConfig = (stage: appEnv): Config => ({
  repo: {
    source: githubRepo,
    branch: githubBranch[stage],
  },
  appStack: {
    defaultLambdaName: `${stage}-airdrop-default-lambda`,
    imageLambdaName: `${stage}-airdrop-image-lambda`,
    bucketName: `${stage}-airdrop-bucket`,
    distributionName: `${stage}-airdrop-distribution`,
    imageCachePolicyName: `${stage}-airdrop-image-cache-policy`,
  },
  appEnvBucketPath: `s3://${envS3Bucket[stage]}/airdrop-dapp/application/.env`,
  cdkEnvBucketPath: `s3://${envS3Bucket[stage]}/airdrop-dapp/cdk/.env`,
  domainName: domainNames[stage],
  zoneName,
  certificateARN: <string>process.env.CERTIFICATE_ARN,
  // Add this ARN if you need to attach a basic authentication to your app
  // before the actual release date
  // basicAuthLambdaARNWithVersion: process.env.BASIC_AUTH_LAMBDA_ARN,
});

config.set(appEnv.ropsten, createConfig(appEnv.ropsten));
config.set(appEnv.mainnet, createConfig(appEnv.mainnet));

export default config;
