import { type UseFormReturn } from "react-hook-form";

export type FormInput = {
  name: string;
  form: UseFormReturn<any>;
  label: string;
};
