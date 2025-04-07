"use client"
import UserManagementTable from "@/components/dashboard/user-management-table ";

import React, { useState } from "react";


const Page = () => {
  const [searchQuery,setSearchQuery]=useState("")
  const [dummyUsers,setDummyUsers]=useState([
    {
      id: "1",
      name: "Meri Nigatu",
      location: "Meskid",
      email:"email@gmail.com",
      status: "ON",
    },
    {
      id: "2",
      name: "Tilahun Asefa",
      location: "Abrihot",
      email:"email@gmail.com",
      status: "ON",
    },
    {
      id: "3",
      name: "Ashetu Birehanu",
      location: "Hotel",
      email:"email@gmail.com",
      status: "OFF",
    },
    {
      id: "4",
      name: "Ashebier Kidane",
      location: "Park",
      email:"email@gmail.com",
      status: "OFF",
    },
    {
      id: "5",
      name: "Mariana Asher",
      location: "Cinema",
      email:"email@gmail.com",
      status: "ON",
    },
  ])

  const handleToggle = (userId: string) => {
    setDummyUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "ON" ? "OFF" : "ON" } 
          : user 
      )
    );
  };

  const visibleDtata = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex bg-white dark:bg-inherit text-gray-950 dark:text-white flex-col gap-8">
      <p className="text-xl font-medium leading-5">Users Management</p>
      <div className="relative">
        <input
          type="text"
          onChange={(e)=>setSearchQuery(e.target.value)}
          className="h-10 rounded-md w-4/5 bg-gray-200 dark:bg-gray-700 text-gray-950 dark:text-white placeholder:text-gray-400 p-3 pl-10"
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

      <UserManagementTable users={visibleDtata} handleToggle={handleToggle} />
    </div>
  );
};

export default Page;
