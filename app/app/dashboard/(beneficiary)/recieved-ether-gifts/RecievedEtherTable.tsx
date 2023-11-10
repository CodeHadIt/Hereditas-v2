'use client'
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';
import { BeneficiaryContext, BeneficiaryContextInterface } from '@/context/BeneficiaryContext';
import { claimEtherGift } from '@/lib/claimGifts';
import { getCurrentTime } from '@/lib/functions/utilityFuncs';
import { useEthersSigner } from '@/lib/hooks/useEthersSigner';
import { EtherGifts, claimState } from "@/types/giftTypes";
import { CheckCircle2, Timer } from 'lucide-react';
import { useContext, useState } from 'react';

const RecievedEtherTable = ({ gifts }: { gifts: EtherGifts[] }) => {
  const {
    beneficiaryData: { setGiftState },
  } = useContext(BeneficiaryContext) as BeneficiaryContextInterface;

  const [claimState, setClaimState] = useState<claimState>("initial");
  const signer = useEthersSigner();
  const { toast } = useToast();
  const hanldeEtherClaim = async (
    index: number,
    value: string,
    testator: string,
  ) => {
    setClaimState("claiming");
    const response = await claimEtherGift(index, value, testator, signer!);
    if (response.ok) {
      toast({
        // variant: "successful",
        title: "Congratulations 🎉",
        description: response.message,
      });
      setGiftState("initial");
      setClaimState("finished")
    } else if (response.error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: response.message,
      });
    }
  };
  return (
    <Table className="border rounded-md">
      <TableCaption>Your Recieved Ether Gifts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ether Amount</TableHead>
          <TableHead>Testator</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Claim Gift</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gifts.map((gift, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">
              {gift.value}
            </TableCell>
            <TableCell>{`${gift.testator.slice(0, 6)}...${gift.testator.slice(
              38,
              42
            )}`}</TableCell>
            <TableCell>
              {`${gift.releaseDay} ${gift.releaseMonth} ${gift.releaseYear}`}
            </TableCell>
            {Number(gift.rawReleaseDate) > getCurrentTime() ? (
              <TableCell>
                <Button variant="destructive" className="space-x-3 hover:cursor-wait">
                  <span>Pending</span>
                  <Timer />
                </Button>
              </TableCell>
            ) : (
              <TableCell>
                <Button variant="secondary" className="space-x-3 hover:cursor-text">
                  <span>Due</span>
                  <CheckCircle2 className="text-primary" />
                </Button>
              </TableCell>
            )}
            {!gift.released ? (
              <TableCell>
                <Button
                  onClick={() =>
                    hanldeEtherClaim(gift.giftIndex, gift.value, gift.testator)
                  }
                  disabled={claimState === "claiming"}
                >
                  {claimState === "claiming" ? "Claiming..." : "Claim"}
                </Button>
              </TableCell>
            ) : (
              <TableCell>
                <Button variant="outline" className="hover:cursor-not-allowed">
                  Claimed
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecievedEtherTable