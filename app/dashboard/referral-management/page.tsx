"use client";

import React, { useEffect, useState } from "react";
import {
  fetchReferralCodes,
  addReferralCode,
  deleteReferralCode,
  updateReferralCode,
} from "@/app/api/referral-management-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface ReferralCode {
  id: string;
  name: string;
  description: string;
  createdAt?: Timestamp;
}

const ReferralManagementPage = () => {
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ReferralCode | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getCodes = async () => {
    const data = await fetchReferralCodes();
    setReferralCodes(data);
  };

  useEffect(() => {
    getCodes();
  }, []);

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editing) {
        await updateReferralCode(editing.id, formData);
        toast.success(`"${formData.name}" updated successfully`);
      } else {
        await addReferralCode(formData.name, formData.description);
        toast.success(`"${formData.name}" added successfully`);
      }

      setOpen(false);
      setEditing(null);
      setFormData({ name: "", description: "" });
      getCodes();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save referral code");
    }
  };

  const handleEdit = (code: ReferralCode) => {
    setEditing(code);
    setFormData({ name: code.name, description: code.description });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const code = referralCodes.find((c) => c.id === id);
    if (!code) return;

    const confirmed = confirm(
      `Are you sure you want to delete "${code.name}"?`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteReferralCode(id);
      toast.success(`"${code.name}" has been deleted`);
      getCodes();
    } catch (err) {
      console.log(err);

      toast.error("Failed to delete referral code");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-white">
          🔑 Referral Code Management
        </h2>
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary text-white hover:bg-primary/90"
        >
          + Add Referral Code
        </Button>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full text-sm bg-white dark:bg-gray-900">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Description</th>
              <th className="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tbody>
              {referralCodes.length > 0 ? (
                referralCodes.map((code) => (
                  <tr
                    key={code.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-4 text-gray-800 dark:text-white">
                      {code.name}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {code.description}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(code)}
                          disabled={deletingId === code.id}
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(code.id)}
                          disabled={deletingId === code.id}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="p-6 text-center text-muted-foreground"
                  >
                    No referral codes yet.
                  </td>
                </tr>
              )}
            </tbody>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 border-none shadow-xl rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              {editing ? "Edit Referral Code" : "Add Referral Code"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Code name (e.g., Mosque)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleSave}
            >
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferralManagementPage;
