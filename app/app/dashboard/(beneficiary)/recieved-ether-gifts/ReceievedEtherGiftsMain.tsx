"use client";
import ConnectRequest from "@/components/common/connectRequest";
import EtherSkeleton from "@/components/common/etherSkeleton";
import GiftNotFound from "@/components/common/giftNotFound";
import {
  BeneficiaryContext,
  BeneficiaryContextInterface,
} from "@/context/BeneficiaryContext";
import { useContext } from "react";
import { useAccount } from "wagmi";
import BeneficiaryForm from "../_components/BeneficiaryForm";
import FetchError from "../_components/FetchError";
import RecievedEtherTable from "./RecievedEtherTable";

const ReceievedEtherGiftsMain = () => {
  const {
    beneficiaryData: { testatorAddress, etherGifts, giftState },
  } = useContext(BeneficiaryContext) as BeneficiaryContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <EtherSkeleton party="Testator" />
      </div>
    );
  }

  if (giftState === "error") {
    return <FetchError gift="Ether" />;
  }
  return (
    <div className="flex flex-col gap-9 max-w-4xl items-center h-full">
      {testatorAddress ? (
        <>
          {etherGifts.length > 0 ? (
            <RecievedEtherTable gifts={etherGifts} />
          ) : null}
        </>
      ) : (
        <>{address ? <BeneficiaryForm /> : <ConnectRequest />}</>
      )}
      {giftState === "finished" && etherGifts.length < 1 && <GiftNotFound />}
    </div>
  );
};

export default ReceievedEtherGiftsMain;
