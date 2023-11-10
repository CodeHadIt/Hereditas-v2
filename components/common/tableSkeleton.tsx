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


const TableSkeleton = ({party} : {party: string}) => {
  return (
    <div>
      <Table className="border">
        <TableCaption>Loading Gifts...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Gift Type</TableHead>
            <TableHead>Gift Details</TableHead>
            <TableHead>{party}</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[130px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[110px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-[120px] rounded-md" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSkeleton