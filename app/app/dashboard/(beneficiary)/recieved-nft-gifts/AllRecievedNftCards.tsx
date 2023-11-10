import NftCard from "@/components/common/NftCard";
import { NFTGifts } from "@/types/giftTypes";
import React from "react";

const AllRecievedNftCards = ({ gifts }: { gifts: NFTGifts[] }) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {gifts.map((gift, index) => (
          <NftCard party="Testator" nft={gift} key={index} />
        ))}
      </div>
      <p className="text-muted-foreground">All recieved NFT gifts.</p>
    </div>
  );
};

export default AllRecievedNftCards;
