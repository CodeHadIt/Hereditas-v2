'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Gift, Home, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '../ui/card';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState({beneficiary: false, testator: false});
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("recieved")) {
      setIsOpen((prev) => {
        return {
          ...prev,
          beneficiary: true,
        };
      });
    } else if (pathname.includes("home")) {
      setIsOpen({ beneficiary: false, testator: false });
    } else if (
      !pathname.includes("home") &&
      !pathname.includes("recieved")
    ) {
      setIsOpen((prev) => {
        return {
          ...prev,
          testator: true,
        };
      });
    }
  }, [pathname]);

  const handleOpen = (type: string) => {
    if(type === "beneficiary" ) {
        setIsOpen((prev) => {
          return {
            ...prev,
            beneficiary: !prev.beneficiary,
          };
        });
    } else {
        setIsOpen((prev) => {
              return {
                ...prev,
                testator: !prev.testator,
              };
            });
    }

 }  

  return (
    <Card className="h-full flex flex-col gap-10 p-4 border">
      <Link
        href="/app/dashboard/home"
        className="flex gap-3 items-center hover:bg-primary-foreground active:bg-primary-foreground rounded-md p-4"
      >
        <Home />
        <div className="">Home</div>
      </Link>

      <Collapsible
        open={isOpen.testator}
        onOpenChange={() => handleOpen("testator")}
        className="space-y-2"
      >
        <div className="flex gap-3 items-center justify-between hover:bg-primary-foreground active:bg-primary-foreground rounded-md p-4">
          <div className="flex items-center gap-3">
            <Users />
            <div className="">Your Gifts</div>
          </div>
          <CollapsibleTrigger asChild className="hover:cursor-pointer">
            {!isOpen.testator ? <ChevronDown /> : <ChevronUp />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-4 pl-20">
          <Link
            href="/app/dashboard/create-gift"
            className={`${
              pathname.includes("create-gift") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            Create Gift
          </Link>
          <Link
            href="/app/dashboard/all-gifts"
            className={`${
              pathname.includes("all-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            All Gifts
          </Link>
          <Link
            href="/app/dashboard/ether-gifts"
            className={`${
              pathname.includes("ether-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            Ether Gifts
          </Link>
          <Link
            href="/app/dashboard/nft-gifts"
            className={`${
              pathname.includes("nft-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            NFT Gifts
          </Link>
          <Link
            href="/app/dashboard/token-gifts"
            className={`${
              pathname.includes("token-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            Token Gifts
          </Link>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isOpen.beneficiary}
        onOpenChange={() => handleOpen("beneficiary")}
        className="space-y-2"
      >
        <div className="flex gap-3 items-center justify-between hover:bg-primary-foreground active:bg-primary-foreground rounded-md p-4">
          <div className="flex items-center gap-3">
            <Gift />
            <div className="">Recieved Gifts</div>
          </div>
          <CollapsibleTrigger asChild className="hover:cursor-pointer">
            {!isOpen.beneficiary ? <ChevronDown /> : <ChevronUp />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-4 pl-20">
          <Link
            href="/app/dashboard/all-recieved-gifts"
            className={`${
              pathname.includes("all-recieved-gifts") && "text-primary"
            } border-b px-4 py-3 text-sm hover:text-primary`}
          >
            All Recieved Gifts
          </Link>
          <Link
            href="/app/dashboard/recieved-ether-gifts"
            className={`${
              pathname.includes("recieved-ether-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            Recieved Ethers
          </Link>
          <Link
            href="/app/dashboard/recieved-nft-gifts"
            className={`${
              pathname.includes("recieved-nft-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            Recieved Nfts
          </Link>
          <Link
            href="/app/dashboard/recieved-token-gifts"
            className={`${
              pathname.includes("recieved-token-gifts") && "text-primary"
            } border-b px-4 py-3  text-sm hover:text-primary`}
          >
            Recieved Tokens
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default SideBar