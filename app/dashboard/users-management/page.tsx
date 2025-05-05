"use client";

import React, { useState } from "react";
import { updateUserStatus, useFetchUsers } from "@/app/api/user-management-api";
import UserManagementTable from "@/components/dashboard/user-management-table ";
import { deleteUser } from "@/app/api/user-management-api";

// inside component


const Page = () => {
  const { users, loading } = useFetchUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [referralFilter, setReferralFilter] = useState("");

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const result = await updateUserStatus(userId, currentStatus);
    if (!result.success) {
      alert(result.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesReferral = referralFilter
      ? user.referralCode === referralFilter
      : true;

    return matchesSearch && matchesRole && matchesReferral;
  });

  const handleDelete = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const result = await deleteUser(userId);
      if (!result.success) alert(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-inherit text-gray-950 dark:text-white p-4">
      <p className="text-3xl font-bold leading-5">Users Management</p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full md:w-1/3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-950 dark:text-white placeholder:text-gray-400 px-3 border-none outline-none focus:outline-none"
          placeholder="Search by name or email"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-10 w-full md:w-1/4 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-950 dark:text-white px-3 border-none outline-none focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={referralFilter}
          onChange={(e) => setReferralFilter(e.target.value)}
          className="h-10 w-full md:w-1/4 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-950 dark:text-white px-3 border-none outline-none focus:outline-none"
        >
          <option value="">All Referral Codes</option>
          <option value="Orthodox Tewahedo">Orthodox Tewahedo</option>
          <option value="Protestant">Protestant</option>
          <option value="Mosque">Mosque</option>
          <option value="Library">Library</option>
        </select>
      </div>

      {/* User Table */}
      <UserManagementTable
        users={filteredUsers}
        handleToggle={handleToggleStatus}
        isLoading={loading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
