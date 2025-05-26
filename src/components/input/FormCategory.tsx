"use client";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
  { label: "Nextjs", value: "Next.js" },
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "Docker", value: "Docker" },
  { label: "Kubernetes", value: "Kubernetes" },
  { label: "Express.js", value: "Express.js" },
  { label: "Cyber Security", value: "Cyber Security" },
  { label: "Full-Stack Development", value: "Full-Stack Development" },
  { label: "Python", value: "Python" },
  { label: "Javascript", value: "Javascript" },
  { label: "Typescript", value: "Typescript" },
  { label: "Software", value: "Software" },
  { label: "Other", value: "Other" },
];

interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  error?: any;
}

const FormCategory = ({
  control,
  name,
  label,
  placeholder,
  error,
}: Props) => {


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="w-full">
              <MultipleSelector
                value={field.value || []}
                onChange={(selected) => field.onChange(selected)}
                defaultOptions={OPTIONS}
                hideClearAllButton
                placeholder={placeholder}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </div>
          </FormControl>
          <FormMessage className="font-medium text-sm text-red-500">
            {error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormCategory;
