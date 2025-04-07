"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";


interface User {
  id: string;
  name: string;
  location: string;
  email: string;
  status: string;
}

interface UserManagementTableProps {
  users: User[];
  handleToggle: (id: string) => void;
}
const UserManagementTable = ({
  users,
  handleToggle,
}: UserManagementTableProps) => {
const router = useRouter()

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-700 text-gray-950 dark:text-white shadow-md rounded-lg">
        <thead className="border-b border-gray-600 ">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Location
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Action
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              
              <tr key={user.id} onClick={()=>router.push(`users-management/${user.id}`)} className="border-b border-gray-600  cursor-pointer">
                {/* <Link href={`dashboard/users-management/${user.id}`}> */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500  dark:text-gray-200">
                {user.location}
              </td>
              <td className="flex items-center gap-4 px-6 py-4 text-sm ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Pen className="mr-2 text-gray-950 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="p-0">
                      <div className="bg-white border-gray-200 shadow-md shadow-gray-400 text-gray-900 px-3 py-2 rounded-full">
                        Edit
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Trash className="text-red-600 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="p-0">
                      <div className="bg-white border-gray-200 shadow-md shadow-gray-400 text-gray-900 px-3 py-2 rounded-full">
                        Delete
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>

              <td>
                <div className="relative inline-block w-20 h-8">
                  <input
                    type="checkbox"
                    checked={user.status === "ON"}
                    onChange={() => handleToggle(user.id)}
                    id={`switch-${user.id}`}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor={`switch-${user.id}`}
                    className={`absolute w-full h-full bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ${
                      user.status === "ON"
                        ? "bg-green-500"
                        : "bg-white dark:bg-gray-400 border border-gray-400 dark:border-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute  top-1 w-6 h-6  rounded-full transition-transform duration-300 ${
                        user.status === "ON"
                          ? "transform translate-x-8 bg-white right-10"
                          : "bg-gray-400 dark:bg-white left-1"
                      }`}
                    ></span>
                    <span
                      className={`absolute w-full h-full flex justify-center items-center text-xs  font-medium ${
                        user.status === "ON"
                          ? "-left-2 text-white"
                          : "-right-2 text-gray-400 dark:text-white"
                      }`}
                    >
                      {user.status}
                    </span>
                  </label>
                </div>
              </td>
            {/* </Link> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;
