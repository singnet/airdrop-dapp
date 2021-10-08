#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import * as path from "path";
import { Builder } from "@sls-next/lambda-at-edge";

import { CDKPipelineStack } from "../lib/Airdrop/cdk-pipeline-stack";
import { awsEnvironment } from "../config";

// BUILDING THE APPLICATION
const nextConfigDir = "../";
const commandDir = path.join(process.cwd(), nextConfigDir);
export const buildOutputDir = path.join(process.cwd(), nextConfigDir, ".serverless_nextjs");

const options = {
  // cmd: path.join(cwd, "./node_modules/.bin/next"),
  cmd: "yarn",
  cwd: commandDir,
  env: {},
  args: ["build"],
};

console.log("nextConfigDir", nextConfigDir);
console.log("outputDir", buildOutputDir);
console.log("build options, cwd<->commandDir", options);

// The builder wraps nextJS in Compatibility layers for Lambda@Edge; handles the page
// manifest and creating the default-lambda and api-lambda. The final output is an assets
// folder which can be uploaded to s3 on every deploy.
const builder = new Builder(nextConfigDir, buildOutputDir, options);

builder
  .build()
  .then(() => {
    const app = new cdk.App();

    new CDKPipelineStack(app, "CDKPipelineStack", { env: awsEnvironment });

    // app.synth();
  })
  .catch((err: Error) => {
    console.warn("Build failed for NextJS, aborting CDK operation");
    console.log("detailed error", err.toString());
    console.error({ err });
    throw err;
  })
  .finally(() => {
    console.log("build run completed");
  });
