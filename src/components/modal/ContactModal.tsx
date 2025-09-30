"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "../input/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  ContactMessageInput,
  contactMessageSchema,
} from "@/validation/contact.schema";
import { useForm } from "react-hook-form";
import { mailSend } from "@/lib/actions/mail.send";
import { toast } from "sonner";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactMessageInput) => {
    setLoading(true);
    try {
      const result = await mailSend(data);
      if (result.success) {
        toast.success(
          "Mesajınız alındı. Size en kısa sürede geri döneceğim. Dönmezsem, polisi arayın."
        );
      }
      setLoading(false);
      form.reset();
      onClose();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[50vh] max-h-[90vh] lg:max-w-[40%]">
        <DialogHeader>
          <DialogTitle>İletişime Geçin</DialogTitle> 
          <DialogDescription>
            Mesajınız benim için önemli. Lütfen aşağıdaki formu doldurun, size en
            kısa sürede geri dönüş yapacağım.
          </DialogDescription>
        </DialogHeader>

        <hr className="bg-gray-300" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormInput
                control={form.control}
                name="name"
                placeholder="Adınız" 
                error={form.formState.errors.name}
                label="Adınız" 
                className="col-span-3"
              />
              <FormInput
                control={form.control}
                name="email"
                placeholder="E-posta" 
                error={form.formState.errors.email}
                label="E-posta" 
                className="col-span-3"
              />
              <FormInput
                control={form.control}
                name="message"
                placeholder="Mesajınız" 
                multiline
                error={form.formState.errors.message}
                label="Mesajınız" 
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <Button
                loading={loading}
                disabled={loading}
                type="submit"
                className="cursor-pointer"
              >
                Mesajı Gönder 
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}