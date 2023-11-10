"use client";
import ConnectRequest from "@/components/common/connectRequest";
import GiftNotFound from "@/components/common/giftNotFound";
import GiftTable from "@/components/common/giftTable";
import TableSkeleton from "@/components/common/tableSkeleton";
import {
  BeneficiaryContext,
  BeneficiaryContextInterface,
} from "@/context/BeneficiaryContext";
import { useContext } from "react";
import { useAccount } from "wagmi";
import BeneficiaryForm from "../_components/BeneficiaryForm";
import FetchError from "../_components/FetchError";

const AllRecievedGiftsMain = () => {
  const { beneficiaryData: {testatorAddress, allGifts, giftState} } = useContext(
    BeneficiaryContext
  ) as BeneficiaryContextInterface;
  const { address } = useAccount();

  if (giftState === "fetching") {
    return (
      <div className="flex flex-col gap-9 max-w-4xl text-center">
        <TableSkeleton party="Beneficiary" />
      </div>
    );
  }

  if (giftState === "error") {
    return <FetchError />;
  }

  return (
    <div className="flex flex-col gap-9 max-w-4xl items-center h-full">
      {testatorAddress ? (
        <>
          {allGifts.length > 0 ? (
            <GiftTable party="Beneficiary" gifts={allGifts} />
          ) : null}
        </>
      ) : (
        <>{address ? <BeneficiaryForm /> : <ConnectRequest />}</>
      )}
      {giftState === "finished" && allGifts.length < 1 && <GiftNotFound />}
    </div>
  );
};

export default AllRecievedGiftsMain;
