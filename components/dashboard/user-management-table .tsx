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

import { Pen, Trash2, LoaderCircle } from "lucide-react";
import { User } from "@/app/api/user-management-api";
// import { useRouter } from "next/navigation";

interface UserManagementTableProps {
  users: User[];
  handleToggle: (id: string, status: boolean) => void;
  isLoading: boolean;
}
const UserManagementTable = ({
  users,
  handleToggle,
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
            <TableRow>
              <TableCell colSpan={7}>
                <div className="h-[50vh] flex items-center justify-center">
                  <LoaderCircle
                    className="animate-spin text-primary"
                    size={60}
                  />
                </div>
              </TableCell>
            </TableRow>
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
                    {user.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-500  dark:text-gray-200">
                    {user.email}
                  </TableCell>
                  <TableCell className="flex items-center gap-4 px-6 py-4 text-sm ">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Pen className="mr-2 text-blue-900 dark:text-blue-500 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="p-0">
                          <div className="bg-white  border-gray-200 shadow-md shadow-gray-400 text-gray-900 w-20 px-4  py-2 rounded-full text-center z-10">
                            Edit
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash2 className="text-red-600 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="p-0">
                          <div className="bg-white border-gray-200 text-red-500 shadow-md shadow-gray-500  w-20 text-center px-4 py-2 rounded-full z-10">
                            Delete
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  <TableCell>
                    <div className="relative inline-block w-20 h-8">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => handleToggle(user.id, user.isActive)}
                        id={`switch-${user.id}`}
                        className="opacity-0 w-0 h-0"
                      />
                      <label
                        htmlFor={`switch-${user.id}`}
                        className={`absolute w-full h-full bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ${
                          user.isActive
                            ? "bg-green-500"
                            : "bg-white dark:bg-gray-400 border border-gray-400 dark:border-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute  top-1 w-6 h-6  rounded-full transition-transform duration-300 ${
                            user.isActive
                              ? "transform translate-x-8 bg-white right-9"
                              : "bg-gray-400 dark:bg-white left-1"
                          }`}
                        ></span>
                        <span
                          className={`absolute w-full h-full flex justify-center items-center text-xs  font-medium ${
                            user.isActive
                              ? "-left-2 text-white"
                              : "-right-2 text-gray-400 dark:text-white"
                          }`}
                        >
                          {user.isActive ? "ON" : "OFF"}
                        </span>
                      </label>
                    </div>
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
