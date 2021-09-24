import { Construct, SecretValue, Stack, StackProps, Stage } from "@aws-cdk/core";
import { CdkPipeline, CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { CDKPipelineStage } from "./cdk-pipeline-stage";

const createPipeline = (stack: CDKPipelineStack, name: string, repo: string, branch: string): CodePipeline => {
  const pipeline = new CodePipeline(stack, name, {
    pipelineName: name,
    synth: new ShellStep("Synth", {
      input: CodePipelineSource.gitHub(repo, branch),
      commands: ["cd cdk", "npm run install-cdk", "npm run deploy"],
      primaryOutputDirectory: "cdk/cdk.out",
    }),
  });

  const cdkPipelineStage = new CDKPipelineStage(stack, "PreProd", {}) as Stage;
  // @ts-ignore
  pipeline.addStage(cdkPipelineStage);

  return pipeline;
};

export class CDKPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const pipeline = new CodePipeline(this, "Pipeline", {
    //   pipelineName: "RootAppPipeline",
    //   synth: new ShellStep("Synth", {
    //     input: CodePipelineSource.gitHub("Vivek205/airdrop-dapp", "pipeline"),
    //     commands: ["cd cdk", "npm run install-cdk", "npm run deploy"],
    //     primaryOutputDirectory: "cdk/cdk.out",
    //   }),
    // });

    // const cdkPipelineStage = new CDKPipelineStage(this, "PreProd", {}) as Stage;
    // // @ts-ignore
    // pipeline.addStage(cdkPipelineStage);

    createPipeline(this, "Development Pipeline", "Vivek205/airdrop-dapp", "pipeline");
    createPipeline(this, "Pipeline", "Vivek205/airdrop-dapp", "master");
  }
}
