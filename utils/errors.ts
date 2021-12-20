export class WalletNotConnectedError extends Error {
  constructor(public message: string = "Please connect your wallet") {
    super(message);
    this.name = "WalletNotConnectedError";
  }
}

export class APIError extends Error {
  constructor(public message: string = "API Failed") {
    super(message);
    this.name = "APIError";
  }
}

export class ValidationError extends Error {
  constructor(public message: string = "Validation Error") {
    super(message);
    this.name = "ValidationError";
  }
}
