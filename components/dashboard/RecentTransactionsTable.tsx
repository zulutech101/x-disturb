import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTransaction } from "@/hooks/useTransaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

type StatusType = "Completed" | "Pending" | "Failed";

const statusBadgeStyle: Record<StatusType, string> = {
  Completed: "bg-muted text-green-500",
  Pending: "bg-muted text-orange-500",
  Failed: "bg-muted text-red-500",
};

export default function TransactionTable() {
  const { transactions, loading } = useTransaction();

  console.log(loading);
  console.log({ transactions });

  const skeletonRows = Array.from({ length: 5 }).map((_, idx) => (
    <TableRow key={`skeleton-${idx}`}>
      <TableCell className="px-6 py-4">
        <Skeleton className="h-4 w-full rounded-md" />
      </TableCell>
      <TableCell className="px-6 py-4">
        <Skeleton className="h-4 w-full rounded-md" />
      </TableCell>
      <TableCell className="px-6 py-4">
        <Skeleton className="h-6 w-full rounded-full" />
      </TableCell>
      <TableCell className="px-6 py-4">
        <Skeleton className="h-4 w-full rounded-md" />
      </TableCell>
    </TableRow>
  ));

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileBlob, "geofence-transactions.xlsx");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Transactions</h2>
      <div className="rounded-xl border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? skeletonRows
              : paginatedData.map((tx, i) => (
                  <TableRow key={i}>
                    <TableCell>{tx.createdAt}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {tx.customerName}
                    </TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                          statusBadgeStyle[tx.status as StatusType] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Button
          onClick={handleExport}
          variant="outline"
          className="bg-muted text-red-500 hover:text-red-600"
        >
          Export Report
        </Button>

        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            size="icon"
            variant="ghost"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            size="icon"
            variant="ghost"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
