"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash2, Edit } from "lucide-react";
import { User } from "@/app/api/user-management-api";
import Link from "next/link";
// import { useRouter } from "next/navigation";

interface UserManagementTableProps {
  users: User[];
  handleToggle: (id: string, status: boolean) => void;
  handleDelete: (id: string) => void;
  isLoading: boolean;
}

const UserManagementTable = ({
  users,
  handleToggle,
  handleDelete,

  isLoading,
}: UserManagementTableProps) => {
  // const router = useRouter()

  return (
    <div className="rounded-xl border overflow-hidden shadow-sm bg-background">
      <Table className="min-w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-950 dark:text-white shadow-md rounded-xl">
        <TableHeader className="border-b border-gray-400 dark:border-gray-600 ">
          <TableRow>
            <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Name
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Email
            </TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Referral Code</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead>Last Login</TableHead>

            <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Action
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-user-${i}`} className="animate-pulse">
                  <TableCell className="px-6 py-4">
                    <div className="h-4 w-32 bg-[#f9d3c4] dark:bg-[#b54c2f]/20 rounded-md" />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="h-4 w-48 bg-[#f9d3c4] dark:bg-[#b54c2f]/20 rounded-md" />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#f9d3c4] dark:bg-[#b54c2f]/20" />
                      <div className="w-8 h-8 rounded-full bg-[#f9d3c4] dark:bg-[#b54c2f]/20" />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="h-6 w-20 bg-[#f9d3c4] dark:bg-[#b54c2f]/20 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : users && users.length > 0 ? (
            <>
              {users.map((user) => (
                //   onClick={()=>router.push(`users-management/${user.id}`)}
                <TableRow
                  key={user.id}
                  className="border-b border-gray-400 dark:border-gray-600 cursor-pointer"
                >
                  {/* <Link href={`dashboard/users-management/${user.id}`}> */}
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name || "N/A"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-500  dark:text-gray-200">
                    {user.email || "N/A"}
                  </TableCell>
                  <TableCell>{user.role || "N/A"}</TableCell>
                  <TableCell>{user.referralCode || "N/A"}</TableCell>
                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt.toDate()).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {user.lastLogin
                      ? new Date(user.lastLogin.toDate()).toLocaleString()
                      : "N/A"}
                  </TableCell>

                  <TableCell className="flex items-center gap-3 px-6 py-4 text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`users-management/${user.id}`}
                            className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                            aria-label="Edit user"
                          >
                            <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-white">
                          <span className="text-sm">Edit</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                            aria-label="Delete user"
                          >
                            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-white">
                          <span className="text-sm text-red-500">Delete</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  <TableCell>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => handleToggle(user.id, user.isActive)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors duration-300"></div>
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          user.isActive ? "translate-x-6" : ""
                        }`}
                      ></div>
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {user.isActive ? "On" : "Off"}
                      </span>
                    </label>
                  </TableCell>

                  {/* </Link> */}
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-gray-500 py-12"
              >
                No User data!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagementTable;
