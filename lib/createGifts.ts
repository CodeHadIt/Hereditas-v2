import { WillsAbi, WillsContractAddress, NFTAbi, TokenAbi,  } from "@/constants/contract";
import { ethers, JsonRpcSigner } from "ethers";
import { GiftCreationData } from "@/types/giftTypes";
import { formatReleaseDate } from "./functions/utilityFuncs";

export const createEtherGift = async (
  data: GiftCreationData,  
  signer: JsonRpcSigner
) => {
    try {
        const WillsContract = new ethers.Contract(
            WillsContractAddress,
            WillsAbi,
            signer
        );
        const {beneficiaryAddress, value, releasedDate} = data;
        const formattedDate = formatReleaseDate(releasedDate);
        const etherCreateTransaction = await WillsContract.createEtherGift(
          beneficiaryAddress,
          value,
          formattedDate,
          { value: ethers.parseUnits(value, 18) }
        );
        await etherCreateTransaction.wait();
        return {message: "Successfully created ether gift", ok: true }
    } catch (error) {
        console.log(error)
        return {message: "Failed to create ether gift", error: error}
    }
};

export const createNFTGift = async (
  data: GiftCreationData,  
  signer: JsonRpcSigner
) => {
    try {
        const WillsContract = new ethers.Contract(
            WillsContractAddress,
            WillsAbi,
            signer
        );
        const {contractAddress, beneficiaryAddress, value, releasedDate} = data;
        const nftContract = new ethers.Contract(
          contractAddress!,
          NFTAbi,
          signer
        );
        const approvalForAllTransaction = await nftContract.setApprovalForAll(
            WillsContractAddress,
            true
        );
        await approvalForAllTransaction.wait();
        const formattedDate = formatReleaseDate(releasedDate);
        const nftGiftCreateTransaction = await WillsContract.createNFTGift(
          contractAddress!,
          beneficiaryAddress,
          value,
          formattedDate
        );
        await nftGiftCreateTransaction.wait();
        return {message: "Successfully created Nft gift", ok: true }
    } catch (error) {
        console.log(error)
        return {message: "Failed to create nft gift", error: error}
    }
};

export const createTokenGift = async (
  data: GiftCreationData,  
  signer: JsonRpcSigner
) => {
    try {
        const WillsContract = new ethers.Contract(
            WillsContractAddress,
            WillsAbi,
            signer
        );
        const {contractAddress, beneficiaryAddress, value, releasedDate} = data;
        const tokenContract = new ethers.Contract(
            contractAddress!,
            TokenAbi,
            signer
        );
        const approveContractTransaction = await tokenContract.approve(
          WillsContractAddress,
          value
        );
        await approveContractTransaction.wait();
        const formattedDate = formatReleaseDate(releasedDate);
        const tokenGiftCreateTransaction =
          await WillsContract.createFungibleTokenGift(
            contractAddress,
            beneficiaryAddress,
            value,
            formattedDate
          );
        await tokenGiftCreateTransaction.wait();
        return {message: "Successfully created ERC20 Token gift", ok: true }
    } catch (error) {
        console.log(error)
        return { message: "Failed to create ERC20 Token gift", error: error };
    }
};
