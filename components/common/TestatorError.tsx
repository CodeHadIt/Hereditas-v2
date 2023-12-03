'use client'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { useNetwork } from 'wagmi';
import { currentChain, supportedChains } from '@/constants/networks';

const TestatorError = ({ message }: { message?: string }) => {
  const { chain } = useNetwork();
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="space-y-1">
        <p className="text-destructive">
          An Error occured fetching gifts for the connected address.
        </p>
      </div>
      {!supportedChains.includes(chain?.id!) ? (
        <p className="text-muted-foreground italic">
          Please switch from {chain?.name} to {currentChain}
        </p>
      ) : (
        <Button asChild>
          <Link href="/app/dashboard">Try Again</Link>
        </Button>
      )}
    </div>
  );
};

export default TestatorError