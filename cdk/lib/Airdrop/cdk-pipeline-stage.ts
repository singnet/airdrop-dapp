import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { AirdropStack } from './airdrop-stack';


export class CDKPipelineStage extends Stage {
    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps){
        super(scope, id, props)

        const service = new AirdropStack(this, "WebService");

        this.urlOutput = service.urlOutput
    }
}

