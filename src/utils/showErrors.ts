import { toast } from "sonner";

type FormErrors = {
  [key: string]: string[] | string | undefined;
};

export const showFormErrors = (errors?: FormErrors) => {
  if (!errors) return;

  Object.entries(errors).forEach(([field, messages]) => {
    if (!messages) return;

    if (typeof messages === "string") {
      toast.error(`${field === "formErrors" ? "" : `${field}: `}${messages}`);
    } else if (Array.isArray(messages)) {
      messages.forEach((msg) => {
        toast.error(`${field === "formErrors" ? "" : `${field}: `}${msg}`);
      });
    }
  });
};
