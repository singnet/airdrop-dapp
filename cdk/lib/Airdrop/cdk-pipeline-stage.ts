import * as dotenv from "dotenv";
import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
import { AirdropStack } from "./airdrop-stack";
import * as path from "path";
import { Builder } from "@sls-next/lambda-at-edge";

// dotenv Must be the first expression
dotenv.config();

const nextConfigDir = "../";
const cwd = path.join(process.cwd(), nextConfigDir);
const outputDir = path.join(nextConfigDir, ".serverless_nextjs");

const options = {
  // cmd: path.join(cwd, "./node_modules/.bin/next"),
  cmd: "yarn",
  cwd: cwd,
  env: {},
  args: ["build"],
};

const builder = new Builder(nextConfigDir, outputDir, options);

export class CDKPipelineStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    // builder
    //   .build()
    //   .then(() => {
    // console.log("inside the builder");
    const service = new AirdropStack(this, "WebService");

    this.urlOutput = service.urlOutput;
    //   })
    //   .catch((err) => {
    //     console.warn("Build failed for NextJS, aborting CDK operation");
    //     console.log("detailed error", err.toString());
    //     console.error({ err });
    //     throw err;
    //   })
    //   .finally(() => {
    //     console.log("build run completed");
    //   });
  }
}
