"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FormInput } from "./types";
import { Input } from "@/components/ui/input";
import { FieldPath, FieldValues } from "react-hook-form";

export const CalendarForm = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  disabled = false,
  disable,
}: FormInput<TFieldValues, TName> & {
  disable?: (data: Date) => boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Input
                type="time"
                className=""
                onChange={(e) => {
                  const hours = Number(e.target.value.split(":")[0]);
                  const minutes = Number(e.target.value.split(":")[1]);
                  field.value.setHours(hours);
                  field.value.setMinutes(minutes);
                  field.onChange(field.value);
                }}
                defaultValue={format(field.value, "HH:mm")}
              />
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) {
                    date.setHours(field.value.getHours());
                    date.setMinutes(field.value.getMinutes());
                    field.onChange(date);
                  }
                }}
                disabled={disable}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};
