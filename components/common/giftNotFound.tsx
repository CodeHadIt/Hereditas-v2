'use client'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const GiftNotFound = ({gift}: {gift?: string}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground">No {gift} Gift found</p>
      <Button asChild>
        <Link href="/app/dashboard/create-gift">Create {gift} Gift</Link>
      </Button>
    </div>
  );
}

export default GiftNotFound