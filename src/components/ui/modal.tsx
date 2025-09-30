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
  loading: boolean;
  title: string;
  description: string;
};

const Modal = ({
  isOpen,
  onConfirm,
  onCancel,
  loading,
  title,
  description,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            variant="destructive"
            onClick={onConfirm}
          >
            Evet, Sil.
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
