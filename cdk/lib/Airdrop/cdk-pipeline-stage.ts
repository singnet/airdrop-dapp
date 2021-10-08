import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
import { awsEnvironment } from "../../config";
import { AirdropStack } from "./airdrop-stack";

export class CDKPipelineStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new AirdropStack(this, "WebService", { env: awsEnvironment });

    this.urlOutput = service.urlOutput;
  }
}
