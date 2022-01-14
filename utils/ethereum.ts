import BigNumber from 'bignumber.js';
import { serializeError } from 'eth-rpc-errors';

type BigNumberish = string | number | BigNumber;

const ethersToWei = '1000000000000000000';
const ethersToGwei = '1000000000';

export const getGasPrice = async (gasPrice: BigNumberish) => {
  return toGwei(gasPrice);
};

export const toWei = (value: BigNumberish): string => {
  value = new BigNumber(value);
  value = value.multipliedBy(ethersToWei);
  return value.toString();
};

export const toGwei = (value: BigNumberish): string => {
  value = new BigNumber(value);
  value = value.multipliedBy(ethersToGwei);
  return value.toString();
};

export const parseEthersError = (error: any): string | undefined => {
  const serializedError = serializeError(error);
  return (serializedError.data as any)?.originalError?.error?.message;
};

export const toFraction = (balance: string, decimals: string, precision = 8): string => {
  const numerator = new BigNumber(balance.toString());
  const denominator = new BigNumber(10).exponentiatedBy(decimals);
  const value = numerator.dividedBy(denominator);
  if (precision === Infinity) {
    return value.toString();
  }
  return value.decimalPlaces(precision).toString();
};

export const fromFraction = (balance: BigNumberish, decimals: BigNumberish, precision = 8): string => {
  balance = new BigNumber(balance.toString());
  decimals = new BigNumber(10).exponentiatedBy(decimals);
  return balance.multipliedBy(decimals).decimalPlaces(precision).toString();
};
