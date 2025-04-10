"use client";
import MetricCard from "@/components/dashboard/metric-card";
import TransactionTable from "@/components/dashboard/RecentTransactionsTable";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">
          Telebirr Transactions
        </h1>
        <p className="text-muted-foreground">
          View and manage telebirr payment transactions, monitor subscriptions,
          and handle invoicing.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Key Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Transaction" value="12,456" />
          <MetricCard title="Active Subscriptions" value="3,210" />
          <MetricCard title="Pending Payments" value="25" />
        </div>
      </div>
      <TransactionTable />
    </div>
  );
};

export default Page;
