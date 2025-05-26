"use client"
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
  label: string;
  value: string;
}

interface Props {
  control: any;
  name: string;
  label?: string;
  error?: any;
  options: Option[]; 
}

const FormRadio = ({ label, error, control, name, options }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex items-center"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="font-medium text-sm text-red-500">
            {error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormRadio;
