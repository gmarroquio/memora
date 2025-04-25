import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormInput } from "./types";

export const SwitchForm: React.FC<
  FormInput & {
    message?: { on: string; off: string };
  }
> = ({ form, name, label, message }) => {
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
