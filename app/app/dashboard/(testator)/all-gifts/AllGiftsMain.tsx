"use client";
import TestatorError from "@/components/common/TestatorError";
import ConnectRequest from "@/components/common/connectRequest";
import GiftNotFound from "@/components/common/giftNotFound";
import GiftTable from "@/components/common/giftTable";
import TableSkeleton from "@/components/common/tableSkeleton";
import { GiftContext, GiftsContextInterface } from "@/context/GiftContext";
import { useContext } from "react";
import { useAccount } from "wagmi";

const AllGiftsMain = () => {
  const { giftsData: {allGifts, giftState} } = useContext(GiftContext) as GiftsContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <TableSkeleton party="Testator" />
      </div>
    );
  }

  if (giftState === "error") {
    return <TestatorError />;
  }

  return (
    <div className="flex flex-col gap-9 max-w-4xl h-full">
      {address ? (
        <>
          {allGifts.length > 0 ? (
            <GiftTable party="Testator" gifts={allGifts} />
          ) : (
            null
          )}
        </>
      ) : (
        <ConnectRequest />
      )}
      {giftState === "finished" && allGifts.length < 1 && (
        <GiftNotFound />
      )}
    </div>
  );
};

export default AllGiftsMain;
