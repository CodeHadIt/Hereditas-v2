'use client'
import TestatorError from '@/components/common/TestatorError';
import CardSkeleton from '@/components/common/cardSkeleton';
import ConnectRequest from '@/components/common/connectRequest';
import GiftNotFound from '@/components/common/giftNotFound';
import GiftTable from '@/components/common/giftTable';
import TableSkeleton from '@/components/common/tableSkeleton';
import { GiftContext, GiftsContextInterface } from '@/context/GiftContext';
import { useContext } from 'react';
import { useAccount } from 'wagmi';
import Cards from './cards';

const DashboardHome = () => {
    const { giftsData: {allGifts, giftsLength, giftState} } = useContext(GiftContext) as GiftsContextInterface
    const { address } = useAccount();


  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <CardSkeleton />
        <TableSkeleton party="Beneficiary" />
      </div>
    );
  }

  if (giftState === "error") {
    return <TestatorError />;
  }

  return (
    <div className="flex flex-col gap-9 max-w-4xl text-center">
      {address ? (
        <>
          {allGifts.length > 0 ? (
            <>
              <h3 className="text-3xl">
                {`Hello 👋, ${address?.slice(0, 6)}...${address?.slice(
                  38,
                  42
                )}`}
              </h3>
              <Cards gifts={giftsLength} />
              <GiftTable party="Beneficiary" gifts={allGifts} />
            </>
          ) : null}
        </>
      ) : (
        <ConnectRequest />
      )}
      {giftState === "finished" && allGifts.length < 1 && <GiftNotFound />}
    </div>
  );
}

export default DashboardHome;