import Web3 from "web3";

const zeros = "000000000000000000";

export const mulDecimals = (_value: string | number, decimals: number) => {
  let dotPosition = _value.toString().indexOf(".");
  const value = dotPosition === -1 ? _value.toString() + "." + zeros : _value + zeros;
  if (dotPosition === -1) dotPosition = _value.toString().length;
  return value.slice(0, dotPosition + decimals + 1).replace(/\D/g, "");
};

export const divDecimals = (_value: string, decimals: number) => {
  const value = zeros + _value;
  return Number(value.slice(0, -decimals) + "." + value.slice(-decimals, -decimals + 3));
};

export const isValidAddress = (address: string) => {
  return Web3.utils.isAddress(address) && Web3.utils.checkAddressChecksum(address);
};

export const compareBigNumbers = (value1: string, value2: string) => {
  return Web3.utils.toBN(value1).cmp(Web3.utils.toBN(value2));
};

export const getSumOfBigNumbers = (value1: string, value2: string) => {
  return Web3.utils.toBN(value1).add(Web3.utils.toBN(value2)).toString();
};
