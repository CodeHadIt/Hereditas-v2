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
import { Skeleton } from "@/components/ui/skeleton";

const EtherSkeleton = ({ party }: { party: string }) => {
  return (
    <div>
      <Table className="border">
        <TableCaption>Loading Ether Gifts...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ether Amount</TableHead>
            <TableHead>{party}</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rescind Gift</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-4 w-[40px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-[100px] rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-[100px] rounded-md" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default EtherSkeleton