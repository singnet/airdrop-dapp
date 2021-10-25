export class WalletNotConnectedError extends Error {
  constructor(public message: string = "Please connect your wallet") {
    super(message);
    this.name = "WalletNotConnectedError";
  }
}
