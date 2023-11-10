"use client";
import TestatorError from "@/components/common/TestatorError";
import ConnectRequest from "@/components/common/connectRequest";
import GiftNotFound from "@/components/common/giftNotFound";
import NftSkeleton from "@/components/common/nftSkeleton";
import { GiftContext, GiftsContextInterface } from "@/context/GiftContext";
import { useContext } from "react";
import { useAccount } from "wagmi";
import AllNFTCards from "./AllNFTCards";

const NftGiftsMain = () => {
  const { giftsData: {nftGifts, giftState} } = useContext(GiftContext) as GiftsContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <NftSkeleton />
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
          {nftGifts.length > 0 ? (
            <AllNFTCards gifts={nftGifts} />
          ) : (
            null
          )}
        </>
      ) : (
        <ConnectRequest />
      )}
      {giftState === "finished" && nftGifts.length < 1 && (
        <GiftNotFound gift="Nft" />
      )}
    </div>
  );
};

export default NftGiftsMain;
