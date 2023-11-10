import {
  ReactNode,
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { EtherGifts, NFTGifts, TokenGifts, AllGifts, GiftsLengths } from "./giftTypes";

export type giftState = "initial" | "fetching" | "error" | "finished"


export interface GiftsInterface {
  giftState: giftState,
  setGiftState: Dispatch<SetStateAction<giftState>>,
  allGifts: AllGifts[];
  setAllGifts?: Dispatch<SetStateAction<AllGifts[]>>;
  etherGifts: EtherGifts[];
  setEtherGifts?: Dispatch<SetStateAction<EtherGifts[]>>;
  nftGifts: NFTGifts[];
  setNftGifts?: Dispatch<SetStateAction<NFTGifts[]>>;
  tokenGifts: TokenGifts[];
  setTokenGifts?: Dispatch<SetStateAction<TokenGifts[]>>;
  giftsLength: GiftsLengths | null;
  setGiftsLength?: Dispatch<SetStateAction<GiftsLengths | null>>;
}

export type giftContextProviderProps = {
    children: ReactNode
}

export interface BeneficiaryInterface extends GiftsInterface {
  testatorAddress: string;
  setTestatorAddress: Dispatch<SetStateAction<string>>
}

export type beneficiaryContextProviderProps = {
    children: ReactNode
}