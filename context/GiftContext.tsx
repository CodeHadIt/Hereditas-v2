'use client'
import { getTestatorContract } from '@/lib/getTestatorContract'
import { useEthersSigner } from '@/lib/hooks/useEthersSigner'
import { giftContextProviderProps, GiftsInterface, giftState } from '@/types/contextTypes'
import { AllGifts, EtherGifts, GiftsLengths, NFTGifts, TokenGifts } from '@/types/giftTypes'
import { createContext, FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export interface GiftsContextInterface {
  giftsData: GiftsInterface;
}

export const GiftContext = createContext<GiftsContextInterface>(
  {} as GiftsContextInterface
);

const GiftContextProvider:FC<giftContextProviderProps>=({ children }) => {
    const [giftState, setGiftState] = useState<giftState>("initial")
    const [allGifts, setAllGifts] = useState<AllGifts[]>([]);
    const [etherGifts, setEtherGifts] = useState<EtherGifts[]>([]);
    const [nftGifts, setNftGifts] = useState<NFTGifts[]>([]);
    const [tokenGifts, setTokenGifts] = useState<TokenGifts[]>([]);
    const [giftsLength, setGiftsLength] = useState<GiftsLengths | null>(null);

    const giftsData: GiftsInterface = {
      giftState,
      setGiftState,
      allGifts,
      setAllGifts,
      etherGifts,
      setEtherGifts,
      nftGifts,
      setNftGifts,
      tokenGifts,
      setTokenGifts,
      giftsLength,
      setGiftsLength,
    }
    const signer = useEthersSigner();
    const { address } = useAccount();
    useEffect(() => {
      const fetchData = async () => {
        setGiftState("fetching");
        const testatorGifts = await getTestatorContract(address!, signer!);
        const { ETHER_GIFTS, NFT_GIFTS, TOKEN_GIFTS, lengthOfBeneficiaries, error, message } =
          testatorGifts;
        if(!error) {
          const allGifts = ETHER_GIFTS!.concat(NFT_GIFTS as [], TOKEN_GIFTS!);
          const giftLengths: GiftsLengths = {
            totalGifts:
              ETHER_GIFTS!.length + NFT_GIFTS!.length + TOKEN_GIFTS!.length,
            totalEtherGifts: ETHER_GIFTS!.length,
            totalNftGifts: NFT_GIFTS!.length,
            totalTokenGifts: TOKEN_GIFTS!.length,
            totalBeneficiaries: lengthOfBeneficiaries,
          };
          setGiftsLength(giftLengths);
          setAllGifts(allGifts);
          setEtherGifts(ETHER_GIFTS!);
          setNftGifts(NFT_GIFTS!);
          setTokenGifts(TOKEN_GIFTS!);
          setGiftState("finished");
        } else {
          setGiftState("error")
        }
        
      };
      fetchData();
    }, [address, signer, giftState]);
  return (
    <GiftContext.Provider value={{ giftsData }}>
      <div>{children}</div>
    </GiftContext.Provider>
  );
}


export default GiftContextProvider;