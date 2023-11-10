import React from 'react'
import { Card } from '@/components/ui/card'
import { GiftsLengths } from '@/types/giftTypes'

interface Iprops {
    gifts: GiftsLengths | null
}

const Cards = ({gifts}: Iprops) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-6">
      <Card className="flex flex-col items-center justify-center gap-1 py-14 px-8 ">
        <div className="text-3xl font-bold">{gifts?.totalGifts}</div>
        <p className="text-paragraph">Total Gifts</p>
      </Card>
      <Card className="flex flex-col items-center justify-center gap-1 py-14 px-8 ">
        <div className="text-3xl font-bold">{gifts?.totalEtherGifts}</div>
        <p className="text-paragraph">Total Ether Gifts</p>
      </Card>
      <Card className="flex flex-col items-center justify-center gap-1 py-14 px-8 ">
        <div className="text-3xl font-bold">{gifts?.totalNftGifts}</div>
        <p className="text-paragraph">Total NFT Gifts</p>
      </Card>
      <Card className="flex flex-col items-center justify-center gap-1 py-14 px-8 ">
        <div className="text-3xl font-bold">{gifts?.totalEtherGifts}</div>
        <p className="text-paragraph">Tokens Gift</p>
      </Card>
    </div>
  );
}

export default Cards