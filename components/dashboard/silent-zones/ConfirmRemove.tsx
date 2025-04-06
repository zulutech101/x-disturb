"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface ConfirmRemovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmRemovalDialog({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmRemovalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl shadow-lg border p-6 bg-white dark:bg-gray-900">
        <DialogHeader className="text-center">
          <div className="flex justify-center items-center text-red-600 mb-2">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <DialogTitle className="text-lg font-semibold">
            Remove Silent Zone?
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. Are you sure you want to remove this
            silent zone permanently?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-full px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
