'use client'
import { useToast } from '@/components/ui/use-toast';
import { getTestatorContract } from '@/lib/getTestatorContract';
import { useEthersSigner } from '@/lib/hooks/useEthersSigner';
import { beneficiaryContextProviderProps, BeneficiaryInterface, giftState } from '@/types/contextTypes';
import { AllGifts, EtherGifts, GiftsLengths, NFTGifts, TokenGifts } from '@/types/giftTypes';
import { createContext, FC, useEffect, useState } from 'react';


export interface BeneficiaryContextInterface {
  beneficiaryData: BeneficiaryInterface;
}

export const BeneficiaryContext = createContext<BeneficiaryContextInterface>(
  {} as BeneficiaryContextInterface
);

const BeneficiaryContextProvider:FC<beneficiaryContextProviderProps>=({ children }) => {
    const [giftState, setGiftState] = useState<giftState>("initial");
    const [testatorAddress, setTestatorAddress] = useState<string>("")
    const [allGifts, setAllGifts] = useState<AllGifts[]>([]);
    const [etherGifts, setEtherGifts] = useState<EtherGifts[]>([]);
    const [nftGifts, setNftGifts] = useState<NFTGifts[]>([]);
    const [tokenGifts, setTokenGifts] = useState<TokenGifts[]>([]);
    const [giftsLength, setGiftsLength] = useState<GiftsLengths | null>(null);

    const { toast } = useToast();

    const beneficiaryData: BeneficiaryInterface = {
      giftState,
      setGiftState,
      testatorAddress,
      setTestatorAddress,
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
    };
    const signer = useEthersSigner();
    
    useEffect(() => {
      const fetchBeneficiaryGifts = async () => {
        setGiftState("fetching");
        const testatorGifts = await getTestatorContract(testatorAddress!, signer!);
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
          toast({
            variant: "destructive",
            title: "Oops!",
            description: `An error occured fetching gift for ${testatorAddress}`,
          });
          setGiftState("error");
        }
      };
      if(testatorAddress) {
        fetchBeneficiaryGifts()
      }
    }, [testatorAddress, signer, toast, giftState]);


    return (
      <BeneficiaryContext.Provider value={{ beneficiaryData }}>
        <div>{children}</div>
      </BeneficiaryContext.Provider>
    );
}

export default BeneficiaryContextProvider