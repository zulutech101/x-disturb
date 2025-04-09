import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
// Define allowed status types
type StatusType = "Completed" | "Pending" | "Failed"
// Define transaction type
type Transaction = {
  date: string
  customer: string
  amount: string
  status: StatusType
}

const allTransactions: Transaction[] = [
  { date: "22.01.2024 09:52", customer: "Kirubel Kaleb", amount: "3,500", status: "Completed" },
  { date: "02.03.2024 13:43", customer: "Kamuzu Asge", amount: "2,800", status: "Completed" },
  { date: "02.05.2024 21:12", customer: "Kerosin Ashenafi", amount: "2,200", status: "Pending" },
  { date: "03.09.2024 10:39", customer: "Ashebir Ashenafi", amount: "1,800", status: "Completed" },
  { date: "13.10.2024 04:40", customer: "Melon Melaku", amount: "1,500", status: "Failed" },
  { date: "21.11.2024 15:30", customer: "Jonas Abebe", amount: "3,300", status: "Completed" },
  { date: "30.12.2024 18:05", customer: "Liya Bekele", amount: "2,400", status: "Pending" },
  { date: "04.01.2025 09:00", customer: "Tigist Mulu", amount: "2,900", status: "Completed" },
  { date: "10.01.2025 16:45", customer: "Abel Tesfaye", amount: "2,700", status: "Failed" },
  { date: "15.01.2025 12:30", customer: "Hana Girma", amount: "3,600", status: "Completed" },
]

const statusBadgeStyle: Record<StatusType, string> = {
  Completed: "bg-muted text-green-500",
  Pending: "bg-muted text-orange-500",
  Failed: "bg-muted text-red-500",
}

export default function GeofenceTable() {
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage)

  const paginatedData = allTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(allTransactions)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const fileBlob = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(fileBlob, "geofence-transactions.xlsx")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Top Performing Geofences</h2>

      <div className="rounded-xl border p-4 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Customer</th>
              <th className="py-2 px-4 font-medium">Amount</th>
              <th className="py-2 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((tx, i) => (
              <tr key={i} className="border-t last:border-b">
                <td className="py-4 px-4">{tx.date}</td>
                <td className="py-4 px-4 text-muted-foreground">{tx.customer}</td>
                <td className="py-4 px-4">{tx.amount}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${statusBadgeStyle[tx.status]}`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <Button onClick={handlePrev} disabled={currentPage === 1} size="icon" variant="ghost">
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
  )
}

