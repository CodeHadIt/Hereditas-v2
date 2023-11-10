import {
  WillsAbi,
  WillsContractAddress,
  NFTAbi,
  TokenAbi,
} from "@/constants/contract";
import { ethers, JsonRpcSigner } from "ethers";


export const claimEtherGift = async (id: number, value: string, testator: string, signer: JsonRpcSigner) => {
  try {
    const WillsContract = new ethers.Contract(
      WillsContractAddress,
      WillsAbi,
      signer
    );
    const claimEtherTransaction = await WillsContract.releaseEther(
      id,
      testator
    );
    await claimEtherTransaction.wait();
    return {
      message: `Successfully Claimed your ${value} Ether Gift`,
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { message: "Claim failed", error: error };
  }
};

export const claimNftGift = async (id: number, name: string, testator: string, signer: JsonRpcSigner) => {
  try {
    const WillsContract = new ethers.Contract(
      WillsContractAddress,
      WillsAbi,
      signer
    );
    const claimNftTransaction = await WillsContract.releaseNFTGift(
      id,
      testator
    );
    await claimNftTransaction.wait();
    return {
      message: `Successfully Claimed your ${name} Nft Gift`,
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { message: "Claim failed", error: error };
  }
};

export const claimTokenGift = async (id: Number, value: string, testator: string, name: string, signer: JsonRpcSigner) => {
  try {
    const WillsContract = new ethers.Contract(
      WillsContractAddress,
      WillsAbi,
      signer
    );
    const claimTokenTransaction = await WillsContract.releaseFungibleTokenGift(
      id,
      testator
    );
    await claimTokenTransaction.wait();
    return {
      message: `Successfully claimed your ${value} ${name} Gift`,
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { message: "Claim failed", error: error };
  }
};