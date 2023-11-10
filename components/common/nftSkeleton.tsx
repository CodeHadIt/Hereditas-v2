import React from 'react'
import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from '../ui/skeleton';

const NftSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="flex flex-col items-center gap-4 min-w-[300px]">
        <div className="w-full h-40 relative rounded-lg">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex flex-col items-center gap-4 px-4">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
        <CardFooter className="space-x-3">
          <Skeleton className="h-8 w-[100px]" />
        </CardFooter>
      </Card>
      <p className="text-muted-foreground">Loading Nft Gifts...</p>
    </div>
  );
}

export default NftSkeleton