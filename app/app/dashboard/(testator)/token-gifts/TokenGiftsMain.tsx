'use client'
import TestatorError from '@/components/common/TestatorError';
import ConnectRequest from "@/components/common/connectRequest";
import GiftNotFound from '@/components/common/giftNotFound';
import TokenSkeleton from '@/components/common/tokenSkeleton';
import { GiftContext, GiftsContextInterface } from "@/context/GiftContext";
import { useContext } from 'react';
import { useAccount } from "wagmi";
import TokenGiftsTable from './TokenGiftsTable';

const TokenGiftsMain = () => {
  const { giftsData: {tokenGifts, giftState} } = useContext(GiftContext) as GiftsContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <TokenSkeleton party="Beneficiary" />
      </div>
    );
  }

  if (giftState === "error") {
    return <TestatorError />;
  }

  return (
    <div className="flex flex-col gap-9 max-w-4xl">
      {address ? (
        <>
          {tokenGifts.length > 0 ? (
            <TokenGiftsTable gifts={tokenGifts} />
          ) : null}
        </>
      ) : (
        <ConnectRequest />
      )}
      {giftState === "finished" && tokenGifts.length < 1 && (
        <GiftNotFound gift="Token" />
      )}
    </div>
  );
}

export default TokenGiftsMain