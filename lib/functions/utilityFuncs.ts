import { ethers, JsonRpcSigner } from "ethers";
import { NFTAbi, TokenAbi } from "@/constants/contract";

export const fetchNftData = async (uri: string) => {
  const response = await fetch(uri);
  const metadata = await response.json();
  return {
    image: metadata.image,
    name: metadata.name,
  };
};

export const getTokenURI = async (address: string, id: number, signer: JsonRpcSigner) => {
  const nftContract = new ethers.Contract(address, NFTAbi, signer);
  const tokenUriTransaction = await nftContract.tokenURI(id);

  const collectionNameTransaction = await nftContract.name();
  return {
    uri: tokenUriTransaction,
    collectionName: collectionNameTransaction,
  };
};

export const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const getTokenName = async (address: string, signer: JsonRpcSigner) => {
  const tokenContract = new ethers.Contract(address, TokenAbi, signer);
  const tokenNameTransaction = await tokenContract.name();
  return tokenNameTransaction;
};

export const getCurrentTime = () => {
  const newDate = new Date().getTime() / 1000;
  return newDate;
};

export const formatReleaseDate = (date: Date) => {
  const newDate = new Date(date);
  return Math.floor(newDate.getTime() / 1000);
};