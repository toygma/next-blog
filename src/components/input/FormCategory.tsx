"use client";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiple-selector";

type MyOption = {
  label: string;
  value: string;
};

const OPTIONS: MyOption[] = [
  // --- Genel Geliştirme Alanları ---
  { label: "Yazılım", value: "Yazilim" },
  { label: "Full-Stack Geliştirme", value: "Full-Stack Gelistirme" },

  // --- Frontend Dilleri ve Cerceveleri (Frameworks) ---
  { label: "Javascript", value: "Javascript" },
  { label: "Typescript", value: "Typescript" },
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },

  // --- Backend Dilleri ve Cerceveleri ---
  { label: "Node.js", value: "Node.js" },
  { label: "Express.js", value: "Express.js" },
  { label: "Python", value: "Python" },

  // --- Veritabanlari (Databases) ---
  { label: "MongoDB", value: "MongoDB" },
  { label: "PostgreSQL", value: "PostgreSQL" },

  // --- DevOps & Altyapi ---
  { label: "Docker", value: "Docker" },
  { label: "Kubernetes", value: "Kubernetes" },

  // --- Tasarim, Performans ve Guvenlik ---
  { label: "Responsive Tasarim", value: "Responsive Tasarim" },
  { label: "Kullanici Deneyimi (UX)", value: "Kullanici Deneyimi" },
  { label: "Web Performansi", value: "Web Performansi" },
  { label: "Siber Guvenlik", value: "Siber Guvenlik" },

  // --- Strateji ve Pazarlama ---
  { label: "SEO", value: "SEO" },
  { label: "Dijital Pazarlama", value: "Dijital Pazarlama" },

  // --- Diger ---
  { label: "Diger", value: "Diger" },
];

interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  error?: any;
}

const FormCategory = ({ control, name, label, placeholder, error }: Props) => {
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
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-600">
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
