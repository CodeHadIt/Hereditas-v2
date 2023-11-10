"use client";
import TestatorError from "@/components/common/TestatorError";
import ConnectRequest from "@/components/common/connectRequest";
import EtherSkeleton from "@/components/common/etherSkeleton";
import GiftNotFound from "@/components/common/giftNotFound";
import { GiftContext, GiftsContextInterface } from "@/context/GiftContext";
import { useContext } from "react";
import { useAccount } from "wagmi";
import EtherGiftTable from "./EtherGiftTable";

const EtherGiftsMain = () => {
  const {
    giftsData: { etherGifts, giftState },
  } = useContext(GiftContext) as GiftsContextInterface;
  const { address } = useAccount();


  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <EtherSkeleton party="Beneficiary" />
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
          {etherGifts.length > 0 ? <EtherGiftTable gifts={etherGifts} /> : null}
        </>
      ) : (
        <ConnectRequest />
      )}
      {giftState === "finished" && etherGifts.length < 1 && (
        <GiftNotFound gift="Ether" />
      )}
    </div>
  );
};

export default EtherGiftsMain;
