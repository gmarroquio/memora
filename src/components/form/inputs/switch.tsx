import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormInput } from "./types";
import { FieldPath, FieldValues } from "react-hook-form";

export const SwitchForm = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  message,
}: FormInput<TFieldValues, TName> & {
  message?: { on: string; off: string };
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div>
              <div className="flex justify-between items-center">
                <FormLabel>{label}</FormLabel>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
              {message && (
                <Label className="text-xs text-gray-400">
                  {field.value ? message.on : message.off}
                </Label>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
