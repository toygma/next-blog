import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  error?: any;
  multiline?: boolean;
  className?: string;
  type?: "text" | "password" | "email" | "number";
}

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  error,
  multiline,
  type,
  className,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {multiline ? (
              <Textarea
                className="w-full p-2 border rounded-md resize-none"
                placeholder={placeholder}
                {...field}
                rows={6}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                className={className}
              />
            )}
          </FormControl>
          <FormMessage className="font-medium text-sm text-red-500">
            {error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
