"use client"

import React, { useState } from 'react';

const UserDetailPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("active");

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-900 text-gray-950 dark:text-white  rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage User</h1>

      <div className="flex items-center mb-6">
        {/* <img
          src="https://via.placeholder.com/150"
          alt="User"
          className="w-32 h-32 rounded-full mr-6"
        /> */}
        <div>
          <h2 className="text-xl font-medium">Mariana Asher</h2>
          <p className="text-sm text-gray-500">Entered Zone: Downtown</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Account Status</h3>
        <div>
          <div className="flex items-center mb-3 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer">
            <input
              type="radio"
              id="active"
              name="account-status"
              value="active"
              checked={selectedStatus === "active"}
              onChange={handleStatusChange}
              className="mr-3"
            />
            <label htmlFor="active" className="text-lg">Active</label>
          </div>

          <div className="flex items-center mb-3 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer">
            <input
              type="radio"
              id="banned"
              name="account-status"
              value="banned"
              checked={selectedStatus === "banned"}
              onChange={handleStatusChange}
              className="mr-3"
            />
            <label htmlFor="banned" className="text-lg">Banned</label>
          </div>

          <div className="flex items-center px-3 py-2 border border-gray-200 rounded-lg cursor-pointer">
            <input
              type="radio"
              id="suspended"
              name="account-status"
              value="suspended"
              checked={selectedStatus === "suspended"}
              onChange={handleStatusChange}
              className="mr-3"
            />
            <label htmlFor="suspended" className="text-lg">Suspended</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
