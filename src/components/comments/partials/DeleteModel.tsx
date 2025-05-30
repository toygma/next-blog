import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading:boolean;
};

const DeleteModal = ({
  isOpen,
  onConfirm,
  onCancel,
  loading,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this comment?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This comment will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={loading} loading={loading} variant="destructive" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
