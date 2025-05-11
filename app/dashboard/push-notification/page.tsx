"use client";

import React, { useEffect, useState } from "react";
import {
  sendNotification,
  fetchNotificationHistory,
  Notification,
  sendNotficationMobile
} from "@/app/api/notification-api";
import { Loader } from "lucide-react";
import {toast} from 'react-toastify' 
const categories = ["Orthodox", "Protestant", "Mosque", "Library", 'other'];

const PushNotificationPage = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState<"all" | "category" | "referral">(
    "all"
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [history, setHistory] = useState<Notification[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!title || !message) return toast.error("Title and Message required");

    setIsSending(true); // start loading

    try {
      let target = "";
      if (targetType === "all") {
        target = "all";
      } else if (targetType === "category") {
        if (!selectedCategory) return toast.error("Please select a category.");
        target = selectedCategory;
      } else if (targetType === "referral") {
        if (!referralCode) return toast.error("Please enter a referral code.");
        target = referralCode;
      }

      const payload: {
        title: string;
        message: string;
        target: string;
        targetType: "all" | "category" | "referral";
        status: "Scheduled" | "Sent";
        scheduledAt: Date | null;
      } = {
        title,
        message,
        target,
        targetType,
        status: isScheduled ? "Scheduled" : "Sent",
        scheduledAt:
          isScheduled && scheduledDateTime ? new Date(scheduledDateTime) : null,
      };

      await sendNotification(payload);
      await sendNotficationMobile({
        message: payload.message,
        target: payload.target,
        targetType: payload.targetType,
        title: payload.title,
      });
      setTitle("");
      setMessage("");
      setSelectedCategory("");
      setReferralCode("");
      setTargetType("all");
      setIsScheduled(false);
      setScheduledDateTime("");
      await loadHistory();
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setIsSending(false); // stop loading
    }
  };

  const loadHistory = async () => {
    const data = await fetchNotificationHistory();
    console.log(data, 'data')
    setHistory(
      data.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
    );
  };


  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 ">Send Notification</h2>

      <div className="max-w-3xl">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-0"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-0"
        />

        <h3 className="font-semibold mb-2">Target Audience</h3>

        {/* Radio group */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="targetType"
              value="all"
              checked={targetType === "all"}
              onChange={() => setTargetType("all")}
              className="focus:outline-none focus:ring-0"
            />
            All Users
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="targetType"
              value="category"
              checked={targetType === "category"}
              className="focus:outline-none focus:ring-0"
              onChange={() => setTargetType("category")}
            />
            By Category
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="targetType"
              value="referral"
              checked={targetType === "referral"}
              className="focus:outline-none focus:ring-0"
              onChange={() => setTargetType("referral")}
            />
            By Referral Code
          </label>
        </div>

        {/* Conditional Inputs */}
        {targetType === "category" && (
          <div className="mb-4">
            <label className="block mb-1">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="">-- Choose Category --</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        {targetType === "referral" && (
          <div className="mb-4">
            <label className="block mb-1">Referral Code</label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. XYZ123"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
            />
            Schedule Notification
          </label>

          {isScheduled && (
            <input
              type="datetime-local"
              value={scheduledDateTime}
              onChange={(e) => setScheduledDateTime(e.target.value)}
              className="border p-2 rounded w-full"
            />
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isSending}
          className={`px-6 py-2 rounded w-full flex justify-center items-center ${isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 text-white cursor-pointer"
            }`}
        >
          {isSending ? <Loader size={16} className="animate-spin" /> : "Send Notification"}
        </button>
      </div>
      {/* History Table */}
      <h3 className="mt-6 text-lg font-semibold">Notification History</h3>
      <table className="w-full mt-2 border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Message</th>
            <th className="border px-2 py-1">Target</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((notif) => (
            <tr key={notif.id}>
              <td className="border px-2 py-1">{notif.title}</td>
              <td className="border px-2 py-1">{notif.message}</td>
              <td className="border px-2 py-1">{notif.target}</td>
              <td className="border px-2 py-1">
                {notif.createdAt.toDate().toDateString()}
              </td>
              <td className="border px-2 py-1 text-green-600">
                {notif.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PushNotificationPage;
