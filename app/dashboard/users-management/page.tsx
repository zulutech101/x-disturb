"use client"
import { updateUserStatus, useFetchUsers } from "@/app/api/user-management-api";
import UserManagementTable from "@/components/dashboard/user-management-table ";

import React, {  useState } from "react";


const Page = () => {
  const [searchQuery,setSearchQuery]=useState("")
  const { users, loading } = useFetchUsers();
  
  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const result = await updateUserStatus(userId, currentStatus);
    if (!result.success) {
      alert(result.message); // Handle error as needed
    }
  };



  const visibleDtata = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex bg-white dark:bg-inherit text-gray-950 dark:text-white flex-col gap-8">
      <p className="text-3xl font-bold leading-5">Users Management</p>
      <div className="relative">
        <input
          type="text"
          onChange={(e)=>setSearchQuery(e.target.value)}
          className="h-10 rounded-md w-4/5 bg-gray-100 dark:bg-gray-700 text-gray-950 dark:text-white placeholder:text-gray-400 p-3 pl-10"
          placeholder="Search by name or email"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 17a6 6 0 100-12 6 6 0 000 12zM21 21l-4.35-4.35"
            />
          </svg>
        </span>
      </div>

      <UserManagementTable users={visibleDtata} handleToggle={handleToggleStatus} isLoading={loading}/>
    </div>
  );
};

export default Page;
