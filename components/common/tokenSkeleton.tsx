import React from "react";
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

const TokenSkeleton = ({ party }: { party: string }) => {
  return (
    <div>
      <Table className="border">
        <TableCaption>Loading Token Gifts...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Token Name</TableHead>
            <TableHead>Amount Gifted</TableHead>
            <TableHead>{party}</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rescind Gift</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-4 w-[90px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[40px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[90px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-[50px]" />
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

export default TokenSkeleton;
