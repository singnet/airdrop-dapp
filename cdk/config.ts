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
  [appEnv.mainnet]: "airdrop.singularitynet.io",
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
  envBucketPath: string;
  zoneName: string;
  domainName: string;
  certificateARN: string;
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
  envBucketPath: `s3://${envS3Bucket[stage]}/airdrop-dapp/application/.env`,
  domainName: domainNames[stage],
  zoneName,
  certificateARN: "arn:aws:acm:us-east-1:533793137436:certificate/cbea64df-2a5a-4a8f-80f9-d9cf5c9ef716",
});

config.set(appEnv.ropsten, createConfig(appEnv.ropsten));
config.set(appEnv.mainnet, createConfig(appEnv.mainnet));

export default config;
