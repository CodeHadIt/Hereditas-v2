'use client'
import { NFTGifts } from '@/types/giftTypes'
import NftCard from '@/components/common/NftCard'
import React from 'react'

const AllNFTCards = ({ gifts }: { gifts: NFTGifts[]}) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {gifts.map((gift, index) => (
          <NftCard party="Beneficiary" nft={gift} key={index} />
        ))}
      </div>
      <p className="text-muted-foreground">All your NFT gifts</p>
    </div>
  );
}

export default AllNFTCards