import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";

export class CDKPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "RootAppPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("Vivek205/airdrop-dapp", "pipeline"),
        commands: [
            "npm ci", 
            "npm run build", 
            "npx cdk synth"
        ]
      }),
    });
  }
}
