'use client'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const TestatorError = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="space-y-1">
        <p className="text-destructive">
          An Error occured fetching gifts for the connected address.
        </p>
      </div>
      <Button asChild>
        <Link href="/app/dashboard">Try Again</Link>
      </Button>
    </div>
  );
};

export default TestatorError