export enum appEnv {
  ropsten = "ropsten",
  mainnet = "mainnet",
}

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
};

const config = new Map<appEnv, Config>();

const createConfig = (stage: string): Config => ({
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
});

config.set(appEnv.ropsten, createConfig(appEnv.ropsten));
config.set(appEnv.mainnet, createConfig(appEnv.mainnet));

export default config;
