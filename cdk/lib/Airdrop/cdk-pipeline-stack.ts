import * as dotenv from "dotenv";
import { Construct, Stack, StackProps, Stage } from "@aws-cdk/core";
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { Role } from "@aws-cdk/aws-iam";
import config, { appEnv } from "../../config";
import { CDKPipelineStage } from "./cdk-pipeline-stage";

dotenv.config();

const createPipeline = (stack: CDKPipelineStack, stage: appEnv): CodePipeline => {
  const appConfig = config.get(stage);
  if (!appConfig) {
    throw new Error("Unknown stage");
  }

  const pipeline = new CodePipeline(stack, `${stage}-airdrop-pipeline`, {
    pipelineName: `${stage}-airdrop-pipeline`,
    synth: new CodeBuildStep("Synth", {
      input: CodePipelineSource.gitHub(appConfig.repo.source, appConfig.repo.branch),
      commands: [
        `APP_ENV=${stage}`,
        `aws s3 cp ${appConfig.appEnvBucketPath} .`,
        `aws s3 cp ${appConfig.cdkEnvBucketPath} ./cdk/`,
        "yarn",
        "yarn build",
        "cd cdk",
        "pwd && yarn install --frozen-lockfile",
        "ls ../.next",
        "pwd && npx cdk deploy --require-approval=never --verbose",
      ],
      primaryOutputDirectory: "cdk/cdk.out",
      role: Role.fromRoleArn(stack, `${stage}-singularitynet-cd`, <string>process.env.SINGULARITYNET_CD_ROLE_ARN),
    }),
  });

  const cdkPipelineStage = new CDKPipelineStage(stack, `${stage}-airdrop-PreProd`, {}) as Stage;
  // @ts-ignore
  pipeline.addStage(cdkPipelineStage);

  return pipeline;
};

export class CDKPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    createPipeline(this, appEnv.ropsten);
    createPipeline(this, appEnv.mainnet);
  }
}
