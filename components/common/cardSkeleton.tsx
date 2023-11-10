import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-6">
      <Card className="flex flex-col items-center justify-center gap-2 py-14 px-8 ">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-4 w-[150px]" />
      </Card>
      <Card className="flex flex-col items-center justify-center gap-2 py-14 px-8 ">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-4 w-[150px]" />
      </Card>
      <Card className="flex flex-col items-center justify-center gap-2 py-14 px-8 ">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-4 w-[150px]" />
      </Card>
    </div>
  );
}

export default CardSkeleton