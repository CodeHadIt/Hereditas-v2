'use client'
import ConnectRequest from '@/components/common/connectRequest';
import GiftNotFound from '@/components/common/giftNotFound';
import TokenSkeleton from '@/components/common/tokenSkeleton';
import { BeneficiaryContext, BeneficiaryContextInterface } from '@/context/BeneficiaryContext';
import { useContext } from 'react';
import { useAccount } from 'wagmi';
import BeneficiaryForm from '../_components/BeneficiaryForm';
import FetchError from '../_components/FetchError';
import RecievedTokenTable from './RecievedTokenTable';

const RecievedTokenGifts = () => {
  const { beneficiaryData: {tokenGifts, testatorAddress, giftState} } = useContext(
    BeneficiaryContext
  ) as BeneficiaryContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <TokenSkeleton party="Testator" />
      </div>
    );
  }
  
  if(giftState === "error") {
    return (
      <FetchError gift='Tokens' />
    )
  }
  return (
    <div className="flex flex-col gap-9 max-w-4xl items-center h-full">
      {testatorAddress ? (
        <>
          {tokenGifts.length > 0 ? (
            <RecievedTokenTable gifts={tokenGifts} />
          ) : null}
        </>
      ) : (
        <>{address ? <BeneficiaryForm /> : <ConnectRequest />}</>
      )}
      {giftState === "finished" && tokenGifts.length < 1 && (
        <GiftNotFound gift="Token" />
      )}
    </div>
  );
}

export default RecievedTokenGifts