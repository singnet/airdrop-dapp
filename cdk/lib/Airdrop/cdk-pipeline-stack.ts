import { Construct, SecretValue, Stack, StackProps, Stage } from "@aws-cdk/core";
import { CdkPipeline, CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { CDKPipelineStage } from "./cdk-pipeline-stage";

export class CDKPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "RootAppPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("Vivek205/airdrop-dapp", "pipeline"),
        commands: ["npm idskfj", "npm run install-cdk2", "npm run deploy2"],
        primaryOutputDirectory: "cdk/cdk.out",
      }),
    });

    const cdkPipelineStage = new CDKPipelineStage(this, "PreProd", {}) as Stage;
    // @ts-ignore
    pipeline.addStage(cdkPipelineStage);
  }
}
