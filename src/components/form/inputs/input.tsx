import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInput } from "./types";
import { FieldPath, FieldValues } from "react-hook-form";

export const InputForm = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  label,
  name,
  placeholder,
  disabled = false,
}: FormInput<TFieldValues, TName> & {
  placeholder: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="md:col-span-2 w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input disabled={disabled} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
