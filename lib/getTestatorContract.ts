import { WillsAbi, WillsContractAddress } from "@/constants/contract"
import { ethers, JsonRpcSigner } from "ethers";
import { mergeEtherGifts, mergeNftGifts, mergeTokenGifts } from "./functions/mergeFuncs";


export const getTestatorContract = async (address: string, signer: JsonRpcSigner) => {
    try {
        const WillsContract = new ethers.Contract(
          WillsContractAddress,
          WillsAbi,
          signer
        );

        //Length of Beneficiaries
        const lengthOfBeneficiaries =
          await WillsContract.getListOfBeneficiaries(address);
        const formattedLength = ethers.formatUnits(lengthOfBeneficiaries, 0);

        const beneficiaries = [];

        //Loop through the Number of Beneficiaries to pluck out the beneficiaries into an array.
        for (let i = 0; i < lengthOfBeneficiaries; i++) {
          const beneficiary = await WillsContract.listOfBeneficiaries(
            address,
            i
          );
          beneficiaries.push(beneficiary);
        }

        //Initializing the Length of Gifts given to each beneficiary
        let etherGiftsLength = 0,
          tokenGiftsLength = 0,
          nftGiftsLength = 0;

        const TOKEN_GIFTS = [];
        const NFT_GIFTS = [];
        const ETHER_GIFTS = [];

        //Looping through the beneficiaries array and querying the contract to get the length of gifts given to each beneficiary
        for (let i = 0; i < beneficiaries.length; i++) {
          let beneficiary = beneficiaries[i];
          const lengthOfEtherGifts = await WillsContract.getGiftLength(
            "",
            address,
            beneficiary
          );
          etherGiftsLength = lengthOfEtherGifts;

          const lengthOfTokenGifts = await WillsContract.getGiftLength(
            "ERC20",
            address,
            beneficiary
          );
          tokenGiftsLength = lengthOfTokenGifts;

          const lengthOfNftGifts = await WillsContract.getGiftLength(
            "NFT",
            address,
            beneficiary
          );
          nftGiftsLength = lengthOfNftGifts;

          //Next, we use loop through the length of the gifts given to a beneficary and use the index(num of gifts) to pluck the actual gifts given to the each beneficiary. We then push each of these gifts into their own seperate array.

          //Getting All Ether Gifts
          for (let i = 0; i < etherGiftsLength; i++) {
            let index = i;
            //Getting the gift given to the particular beneficiary.
            const etherGifts = await WillsContract.etherGifts(
              address,
              beneficiary,
              index
            );
            //formatting/cleaning the return data with utility functions
            const mergedGift = await mergeEtherGifts(etherGifts, index);
            ETHER_GIFTS.push(mergedGift);
          }

          //Getting All Token Gifts
          for (let i = 0; i < tokenGiftsLength; i++) {
            let index = i;
            const tokenGifts = await WillsContract.tokenGifts(
              address,
              beneficiary,
              index
            );
            const mergedGift = await mergeTokenGifts(tokenGifts, index, signer);
            TOKEN_GIFTS.push(mergedGift);
          }

          //Getting All NFT Gifts
          for (let i = 0; i < nftGiftsLength; i++) {
            let index = i;
            const nftGifts = await WillsContract.nftGifts(
              address,
              beneficiary,
              index
            );
            const mergedGift = await mergeNftGifts(nftGifts, index, signer);
            NFT_GIFTS.push(mergedGift);
          }
        }

        return { ETHER_GIFTS, NFT_GIFTS, TOKEN_GIFTS, lengthOfBeneficiaries };
    } catch (error) {
      console.log(error)
      return {message: error, error: true}
    }
};
