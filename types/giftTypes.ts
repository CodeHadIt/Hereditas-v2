export interface Gifts {
  giftType: string;
  giftIndex: number;
  testator: string;
  beneficiary: string;
  rawReleaseDate: string;
  releaseDay: string;
  releaseMonth: string;
  releaseYear: number;
  released: boolean;
}

export interface EtherGifts extends Gifts {
  value: string;
}
export interface NFTGifts extends Gifts {
  tokenId: string;
  contractAddress: string;
  collectionName: string;
  nftImage: string;
  nftImageName: string;
}

export interface TokenGifts extends Gifts {
//   tokenId: string;
  value: string;
  contractAddress: string;
  tokenName: string;
}


export interface AllGifts extends Gifts{
  value?: string;
  tokenId?: string;
  contractAddress?: string;
  tokenName?: string;
  collectionName?: string;
  nftImage?: string;
  nftImageName?: string;
}

export interface GiftsLengths {
  totalGifts: number;
  totalEtherGifts: number;
  totalNftGifts: number;
  totalTokenGifts: number;
  totalBeneficiaries: number;
}

export interface GiftCreationData {
  giftType: "ether" | "nft" | "token",
  contractAddress?: string;
  beneficiaryAddress: string,
  value: string,
  releasedDate: Date,
}

export type cancelState = "initial" | "cancelling" | "error" | "finished";

export type claimState = "initial" | "claiming" | "error" | "finished";

