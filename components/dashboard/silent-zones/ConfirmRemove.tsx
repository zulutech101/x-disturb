"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmRemovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmRemovalDialog({
  isOpen,
  onClose,
}: ConfirmRemovalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
        <DialogHeader>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove silent zone Permanently?
          </DialogDescription>
        </DialogHeader>

        <div className="space-x-2">
          <Button onClick={onClose} variant="outline">
            No
          </Button>
          <Button className="bg-red-700 text-white">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
