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
        toast.success("Your message has been received. I will get back to you as soon as possible. If I don't, call the police.");
      }
      setLoading(false);
      form.reset()
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
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            Your message is important to me. Please fill out the form below, and
            I will get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <hr className="bg-gray-300" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormInput
                control={form.control}
                name="name"
                placeholder="Name"
                error={form.formState.errors.name}
                label="Name"
                className="col-span-3"
              />
              <FormInput
                control={form.control}
                name="email"
                placeholder="Email"
                error={form.formState.errors.email}
                label="Email"
                className="col-span-3"
              />
              <FormInput
                control={form.control}
                name="message"
                placeholder="Message"
                multiline
                error={form.formState.errors.message}
                label="Message"
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
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
