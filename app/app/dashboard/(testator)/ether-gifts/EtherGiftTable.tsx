'use client'
import React, { useContext, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EtherGifts } from '@/types/giftTypes';
import { Button } from '@/components/ui/button';
import { cancelEtherGift } from '@/lib/cancelGifts';
import { useEthersSigner } from '@/lib/hooks/useEthersSigner';
import { useToast } from '@/components/ui/use-toast';
import { GiftContext, GiftsContextInterface } from '@/context/GiftContext';

import { cancelState } from '@/types/giftTypes';

const EtherGiftTable = ({ gifts }: { gifts: EtherGifts[] }) => {
  const {
    giftsData: { setGiftState },
  } = useContext(GiftContext) as GiftsContextInterface;
  const [cancelState, setCancelState] = useState<cancelState>("initial");
  const signer = useEthersSigner();
  const { toast } = useToast();

  const handleCancelGift = async(index: number, beneficiary: string, value: string)=> {
    const response = await cancelEtherGift(index, beneficiary, value, signer!);
    if (response.ok) {
      toast({
        title: "Congratulations 🎉",
        description: response.message,
      });
      setGiftState("initial");
    } else if (response.error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: response.message,
      });
    }
  }
  return (
    <Table className="border rounded-md">
      <TableCaption>Your Ether Gifts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ether Amount</TableHead>
          <TableHead>Beneficiary</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Rescind Gift</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gifts.map((gift, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">
              {gift.value}
            </TableCell>
            <TableCell>{`${gift.beneficiary.slice(
              0,
              6
            )}...${gift.beneficiary.slice(38, 42)}`}</TableCell>
            <TableCell>{`${gift.releaseDay} ${gift.releaseMonth} ${gift.releaseYear}`}</TableCell>
            {gift.released ? (
              <TableCell>
                <Button
                  variant="destructive"
                  className="hover:cursor-not-allowed"
                >
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
            {!gift.released ? (
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleCancelGift(
                      gift.giftIndex,
                      gift.beneficiary,
                      gift.value
                    )
                  }
                  disabled={cancelState === "cancelling"}
                >
                  {cancelState === "cancelling" ? "Cancelling..." : "Cancel Gift"}
                </Button>
              </TableCell>
            ) : (
              <TableCell>
                <Button variant="outline" className="hover:cursor-not-allowed">
                  Already Claimed
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EtherGiftTable