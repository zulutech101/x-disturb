"use client";

import React, { useEffect, useState } from "react";
import {
  fetchReferralCodes,
  addReferralCode,
  updateReferralCode,
  deleteReferralCode,
  getUsersByReferralCode,
  sendPushToGroup,
  exportUsersByGroup,
  fetchReferralCodeById,
} from "@/app/api/referral-management-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Send, Download, Eye, Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "@/app/api/user-management-api";

type ReferralCategory = "Orthodox" | "Protestant" | "Mosque" | "Library";
interface ReferralCode {
  id: string;
  name: string;
  description: string;
  category: ReferralCategory;
}

const ReferralManagementPage = () => {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [open, setOpen] = useState(false);
  const [editCode, setEditCode] = useState<ReferralCode | null>(null);
  const [formData, setFormData] = useState<
    Omit<ReferralCode, "id" | "createdAt">
  >({
    name: "",
    description: "",
    category: "Orthodox",
  });

  const getCodes = async () => {
    const data = await fetchReferralCodes();
    setCodes(data);
  };

  useEffect(() => {
    getCodes();
  }, []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    setIsSaving(true);
    try {
      if (editCode) {
        await updateReferralCode(editCode.id, formData);
        toast.success(`Updated ${formData.name}`);
      } else {
        await addReferralCode(formData);
        toast.success(`Added ${formData.name}`);
      }
      setOpen(false);
      setFormData({ name: "", description: "", category: "Orthodox" });
      setEditCode(null);
      getCodes();
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReferralCode(id);
      toast.success("Referral code deleted");
      getCodes();
    } catch {
      toast.error("Delete failed");
    }
  };
  const [viewingUsers, setViewingUsers] = useState<User[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState<string>("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewUsers = async (code: ReferralCode) => {
    try {
      const users = await getUsersByReferralCode(code.id);
      setViewingUsers(users);
      setSelectedGroupName(code.name);
      setIsViewModalOpen(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch users");
    }
  };

  const handleSendPush = async (code: ReferralCode) => {
    await sendPushToGroup(code.id);
    toast.success(`Push sent to ${code.name} group`);
  };

  const handleExport = async (code: ReferralCode) => {
    await exportUsersByGroup(code.id);
    toast.success(`Exported users for ${code.name}`);
  };

  const handleEdit = async (id: string) => {
    try {
      const code = await fetchReferralCodeById(id);
      if (code) {
        setEditCode(code);
        setFormData({
          name: code.name,
          description: code.description,
          category: code.category,
        });
        setOpen(true);
      } else {
        toast.error("Referral code not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch referral code");
    }
  };
  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Referral Code Management
        </h2>
        <Button
          onClick={() => {
            setEditCode(null); // CLEAR this first!
            setFormData({ name: "", description: "", category: "Orthodox" }); // also reset form
            setOpen(true);
          }}
        >
          + Add Referral Code
        </Button>
      </div>

      <table className="w-full border text-sm bg-white dark:bg-gray-900 rounded">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Category</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr
              key={code.id}
              className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="p-3">{code.name}</td>
              <td className="p-3">{code.description}</td>
              <td className="p-3">{code.category}</td>
              <td className="p-3 text-center space-x-2">
              <Button onClick={() => handleViewUsers(code)}>
                  <Eye size={16} />
                </Button>
                <Button onClick={() => handleEdit(code.id)}>
                  <Pencil size={16} />
                </Button>

                <Button
                  className="text-red-500"
                  onClick={() => handleDelete(code.id)}
                >
                  <Trash2 size={16} />
                </Button>
              
                <Button onClick={() => handleSendPush(code)}>
                  <Send size={16} />
                </Button>
                <Button onClick={() => handleExport(code)}>
                  <Download size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>{editCode ? "Edit" : "Add"} Referral Code</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="referral-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <Input
                id="referral-name"
                placeholder="e.g. Orthodox Special"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="referral-description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description
              </label>
              <Input
                id="referral-description"
                placeholder="Optional description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="referral-category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Category
              </label>
              <select
                id="referral-category"
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ReferralCategory,
                  })
                }
              >
                <option value="Orthodox">Orthodox</option>
                <option value="Protestant">Protestant</option>
                <option value="Mosque">Mosque</option>
                <option value="Library">Library</option>
              </select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader size={16} className="animate-spin" />
              ) : editCode ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Users in <span className="text-primary">{selectedGroupName}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto mt-4 space-y-3">
            {viewingUsers.length > 0 ? (
              viewingUsers.map((user) => (
                <div
                  key={user.id}
                  className="border p-3 rounded-md flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-800"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {user.email}
                    </p>
                  </div>
                  {user.role && (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                      {user.role}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No users found.
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferralManagementPage;

