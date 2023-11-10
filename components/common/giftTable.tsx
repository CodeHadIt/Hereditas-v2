'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAccount } from 'wagmi';
import { useEthersSigner } from '@/lib/hooks/useEthersSigner';
import { AllGifts } from '@/types/giftTypes';
import { Button } from '../ui/button';

interface Iprops {
  party?: "Testator" | "Beneficiary";
  gifts: AllGifts[];
}

const GiftTable = ({party,  gifts }: Iprops) => {

  return (
    <Table className="border !rounded-md">
      <TableCaption>All Your Gifts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Gift Type</TableHead>
          <TableHead>Gift Details</TableHead>
          <TableHead>{party}</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gifts.map((gift, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">
              {gift.giftType}
            </TableCell>
            {gift.giftType === "ether" && (
              <TableCell>{gift.value} Ether</TableCell>
            )}
            {gift.giftType === "nft" && (
              <TableCell>
                {gift.tokenId} {gift.nftImageName} NFT
              </TableCell>
            )}
            {gift.giftType === "token" && (
              <TableCell>
                {gift.value} {gift.tokenName} Tokens
              </TableCell>
            )}
            {party === "Testator" ? (
              <TableCell>{`${gift.beneficiary.slice(
                0,
                6
              )}...${gift.beneficiary.slice(38, 42)}`}</TableCell>
            ) : (
              <TableCell>{`${gift.testator.slice(0, 6)}...${gift.testator.slice(
                38,
                42
              )}`}</TableCell>
            )}
            <TableCell>{`${gift.releaseDay} ${gift.releaseMonth} ${gift.releaseYear}`}</TableCell>
            {gift.released ? (
              <TableCell>
                <Button variant="destructive" className="hover:cursor-not-allowed">
                  Claimed
                </Button>
              </TableCell>
            ) : (
              <TableCell>
                <Button variant="secondary" className="hover:cursor-text">
                  Not Claimed
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GiftTable