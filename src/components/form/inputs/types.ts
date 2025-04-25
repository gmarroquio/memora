import { type UseFormReturn } from "react-hook-form";

//eslint-disable-next-line
export type FormInput<T extends Record<string, any>, TName> = {
  name: TName;
  form: UseFormReturn<T>;
  label: string;
};
