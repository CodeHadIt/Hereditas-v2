'use client'
import ConnectRequest from '@/components/common/connectRequest';
import GiftNotFound from '@/components/common/giftNotFound';
import NftSkeleton from '@/components/common/nftSkeleton';
import { BeneficiaryContext, BeneficiaryContextInterface } from '@/context/BeneficiaryContext';
import { useContext } from 'react';
import { useAccount } from 'wagmi';
import BeneficiaryForm from '../_components/BeneficiaryForm';
import AllRecievedNftCards from './AllRecievedNftCards';
import FetchError from '../_components/FetchError';

const RecievedNftGiftsMain = () => {
  const { beneficiaryData: {nftGifts, testatorAddress, giftState} } = useContext(
    BeneficiaryContext
  ) as BeneficiaryContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <NftSkeleton />
      </div>
    );
  }

  if (giftState === "error") {
    return <FetchError gift="Nfts" />;
  }
  return (
    <div className="flex flex-col gap-9 max-w-4xl items-center h-full">
      {testatorAddress ? (
        <>
          {nftGifts.length > 0 ? (
            <AllRecievedNftCards gifts={nftGifts} />
          ) : null}
        </>
      ) : (
        <>{address ? <BeneficiaryForm /> : <ConnectRequest />}</>
      )}
      {giftState === "finished" && nftGifts.length < 1 && (
        <GiftNotFound gift="Nft" />
      )}
    </div>
  );
}

export default RecievedNftGiftsMain