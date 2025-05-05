import React from "react";

const targetCategories = ["Orthodox", "Protestant", "Mosque", "Library"];

export default function NotificationTargetForm({
  title,
  setTitle,
  message,
  setMessage,
  targetType,
  setTargetType,
  selectedCategory,
  setSelectedCategory,
  referralCode,
  setReferralCode,
  handleSend,
}: any) {
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <h3 className="font-semibold mb-2">Target Audience</h3>

      {/* Target Method - Radio Group */}
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="targetType"
            value="all"
            checked={targetType === "all"}
            onChange={() => setTargetType("all")}
          />
          All Users
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="targetType"
            value="category"
            checked={targetType === "category"}
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
            onChange={() => setTargetType("referral")}
          />
          By Referral Code
        </label>
      </div>

      {/* Conditional Fields */}
      {targetType === "category" && (
        <div className="mb-4">
          <label className="block mb-1">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Choose Category --</option>
            {targetCategories.map((cat) => (
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
            placeholder="Enter referral code (e.g., XYZ123)"
          />
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="bg-orange-600 text-white px-6 py-2 rounded w-full"
      >
        Send Notification
      </button>
    </>
  );
}
