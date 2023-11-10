import {
  Card,
  CardFooter
} from "@/components/ui/card";
import { cancelNftGift } from "@/lib/cancelGifts";
import { claimNftGift } from "@/lib/claimGifts";
import { getCurrentTime } from "@/lib/functions/utilityFuncs";
import { useEthersSigner } from "@/lib/hooks/useEthersSigner";
import { NFTGifts } from "@/types/giftTypes";
import { CheckCircle2, Timer } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";


type actionState = "initial" | "processing" | "error" | "finished";

const NftCard = ({
  party,
  nft,
}: {
  nft: NFTGifts;
  party: "Beneficiary" | "Testator";
}) => {
  const [actionState, setActionState] = useState<actionState>("initial");
  const signer = useEthersSigner();
  const {toast} = useToast()

  const handleCancelGift = async (
    index: number,
    beneficiary: string,
    name: string
  ) => {
    setActionState("processing");
    const response = await cancelNftGift(index, beneficiary, name, signer!);
    if (response.ok) {
      toast({
        title: "Congratulations 🎉",
        description: response.message,
      });
      setActionState("finished")
    } else if (response.error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: response.message,
      });
    }
  };

  const handleClaimGift = async (
    index: number,
    name: string,
    testator: string,
  ) => {
    setActionState("processing")
    const response = await claimNftGift(index, name, testator, signer!);
    if (response.ok) {
      toast({
        // variant: "successful",
        title: "Congratulations 🎉",
        description: response.message,
      });
      setActionState("finished")
    } else if (response.error) {
      toast({
        // variant: "destructive",
        title: "Oops!",
        description: response.message,
      });
    }
  };
  return (
    <Card className="flex flex-col items-center gap-4">
      <div className="w-full h-40 relative rounded-lg">
        <Image
          src={nft.nftImage}
          alt={`${nft.nftImageName} nft`}
          className="rounded-t-md"
          fill
        />
      </div>
      <div className="flex flex-col px-4">
        <p>
          Art: <span className="text-muted-foreground">{nft.nftImageName}</span>
        </p>
        <p>
          Collection:{" "}
          <span className="text-muted-foreground">{nft.collectionName}</span>
        </p>
        <p>
          {party}:{" "}
          <span className="text-muted-foreground">{`${nft.beneficiary.slice(
            0,
            6
          )}...${nft.beneficiary.slice(38, 42)}`}</span>
        </p>
      </div>
      {party === "Beneficiary" && (
        <CardFooter>
          {!nft.released ? (
            <Button
              variant="destructive"
              onClick={() =>
                handleCancelGift(
                  nft.giftIndex,
                  nft.beneficiary,
                  nft.collectionName
                )
              }
              disabled={actionState === "processing"}
            >
              {actionState === "processing" ? "Cancelling" : "Cancel"}
            </Button>
          ) : (
            <Button variant="outline" className="hover:cursor-not-allowed">
              Already Claimed
            </Button>
          )}
        </CardFooter>
      )}

      {party === "Testator" && (
        <CardFooter className="space-x-3">
          {Number(nft.rawReleaseDate) > getCurrentTime() && (
            <Button
              variant="destructive"
              className="space-x-3 hover:cursor-wait"
            >
              <span>Pending</span>
              <Timer />
            </Button>
          )}
          {!nft.released && Number(nft.rawReleaseDate) < getCurrentTime() && (
            <>
              <Button
                variant="secondary"
                className="space-x-3 hover:cursor-text"
              >
                <span>Due</span>
                <CheckCircle2 className="text-primary" />
              </Button>
              <Button
                onClick={() =>
                  handleClaimGift(
                    nft.giftIndex,
                    nft.collectionName,
                    nft.testator
                  )
                }
                disabled={actionState === "processing"}
              >
                {actionState === "processing" ? "Claiming" : "Claim"}
              </Button>
            </>
          )}
          {nft.released && (
            <Button variant="outline" className="hover:cursor-not-allowed">
              Claimed
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default NftCard;
