import {
  WillsAbi,
  WillsContractAddress,
  NFTAbi,
  TokenAbi,
} from "@/constants/contract";
import { ethers, JsonRpcSigner } from "ethers";


export const cancelEtherGift = async (
  id: number,
  beneficiary: string,
  value: string,
  signer: JsonRpcSigner
) => {
  try {
    const WillsContract = new ethers.Contract(
      WillsContractAddress,
      WillsAbi,
      signer
    );
    const cancelEtherTransaction = await WillsContract.cancelEtherGift(
      id,
      beneficiary
    );
    await cancelEtherTransaction.wait();
    return {
      message: `Successfully cancelled your ${value} Ether Gift`,
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { message: "Ether Gift cancellation failed", error: error };
  }
};

export const cancelTokenGift = async (id: number, beneficiary: string, name: string, signer: JsonRpcSigner) => {
  try {
    const WillsContract = new ethers.Contract(
      WillsContractAddress,
      WillsAbi,
      signer
    );
    const cancelTokenTransaction = await WillsContract.cancelFungibleTokenGift(
      id,
      beneficiary
    );
    await cancelTokenTransaction.wait();
    return { message: `Successfully cancelled your ${name} Gift`, ok: true };
  } catch (error) {
    console.log(error);
    return { message: `Token Gift cancellation failed`, error: error };
  }
};

export const cancelNftGift = async (id:number, beneficiary:string, name: string, signer: JsonRpcSigner) => {
  try {
    const WillsContract = new ethers.Contract(
      WillsContractAddress,
      WillsAbi,
      signer
    );
    const cancelTokenTransaction = await WillsContract.cancelNFTGift(
      id,
      beneficiary
    );
    await cancelTokenTransaction.wait();
    return { message: `Successfully cancelled your ${name} Gift`, ok: true };
  } catch (error) {
    console.log(error);
    return { message: `NFT Gift Cancellation failed`, error: error };
  }
};