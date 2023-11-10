import { ethers, JsonRpcSigner } from "ethers";
import { fetchNftData, getTokenURI, getOrdinalSuffix, getTokenName } from "./utilityFuncs";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const mergeNftGifts = async (gift: any, index: number, signer: JsonRpcSigner) => {
  const contractAddress = gift.contractAddress;
  const testatorAddress = gift.testator;
  const beneficiaryAddress = gift.beneficiary;
  const releasedStatus = gift.released;
  const tokenId = ethers.formatUnits(gift.tokenId.toString(), 0);
  const timestamp = ethers.formatUnits(gift.releaseDate.toString(), 0);
  const nftUriData = await getTokenURI(
    contractAddress,
    Number(tokenId),
    signer
  );
  const uri = nftUriData.uri;
  const nftImageData = await fetchNftData(uri);
  const date = new Date(Number(timestamp) * 1000);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const preSuffixDay = date.getDate();
  const day = getOrdinalSuffix(preSuffixDay);
  const giftObj = {
    giftType: "nft",
    giftIndex: index,
    collectionName: nftUriData.collectionName,
    contractAddress: contractAddress,
    testator: testatorAddress,
    beneficiary: beneficiaryAddress,
    tokenId: tokenId,
    rawReleaseDate: timestamp,
    releaseDay: day,
    releaseMonth: month,
    releaseYear: year,
    released: releasedStatus,
    nftImage: nftImageData.image,
    nftImageName: nftImageData.name,
  };
  return giftObj;
};


export const mergeEtherGifts = async (gift: any, index: number) => {
    const testatorAddress = gift.testator;
    const beneficiaryAddress = gift.beneficiary;
    const releasedStatus = gift.released;
    const value = ethers.formatUnits(gift.amount.toString(), 0);
    const timestamp = ethers.formatUnits(gift.releaseDate.toString(), 0);
    const date = new Date(Number(timestamp) * 1000);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const preSuffixDay = date.getDate();
    const day = getOrdinalSuffix(preSuffixDay);
    const giftObj = {
      giftType: "ether",
      giftIndex: index,
      testator: testatorAddress,
      beneficiary: beneficiaryAddress,
      value: value,
      rawReleaseDate: timestamp,
      releaseDay: day,
      releaseMonth: month,
      releaseYear: year,
      released: releasedStatus,
    };
    return giftObj;
  };

export const mergeTokenGifts = async (
  gift: any,
  index: number,
  signer: JsonRpcSigner
) => {
  const contractAddress = gift.tokenAddress;
  const testatorAddress = gift.testator;
  const beneficiaryAddress = gift.beneficiary;
  const releasedStatus = gift.released;
  const value = ethers.formatUnits(gift.amount.toString(), 0);
  const timestamp = ethers.formatUnits(gift.releaseDate.toString(), 0);
  const tokenName = await getTokenName(contractAddress, signer);
  const date = new Date(Number(timestamp) * 1000);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const preSuffixDay = date.getDate();
  const day = getOrdinalSuffix(preSuffixDay);
  const giftObj = {
    giftType: "token",
    giftIndex: index,
    contractAddress: contractAddress,
    tokenName: tokenName,
    testator: testatorAddress,
    beneficiary: beneficiaryAddress,
    value: value,
    rawReleaseDate: timestamp,
    releaseDay: day,
    releaseMonth: month,
    releaseYear: year,
    released: releasedStatus,
  };
  return giftObj;
};
