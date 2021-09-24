import { Construct, SecretValue, Stack, StackProps, Stage } from "@aws-cdk/core";
import { CdkPipeline, CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import config, { appEnv } from "../../config";
import { CDKPipelineStage } from "./cdk-pipeline-stage";

const createPipeline = (stack: CDKPipelineStack, stage: appEnv): CodePipeline => {
  const appConfig = config.get(stage);
  if (!appConfig) {
    throw new Error("Unknown stage");
  }

  const pipeline = new CodePipeline(stack, `${stage}-airdrop-pipeline`, {
    pipelineName: `${stage}-airdrop-pipeline`,
    synth: new ShellStep("Synth", {
      input: CodePipelineSource.gitHub(appConfig.repo.source, appConfig.repo.branch),
      commands: [`APP_ENV=${stage}`, "pwd && cd cdk && pwd", "npm ci", "npm run deploy"],
      primaryOutputDirectory: "cdk/cdk.out",
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
