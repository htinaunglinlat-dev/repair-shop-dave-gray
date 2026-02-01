"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message: string;
  disabled?: boolean;
};

export default function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
  disabled = false,
}: Props<S>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex justify-start items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <FormControl>
              <FormLabel
                htmlFor={nameInSchema}
                className={cn(
                  "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-green-600 has-aria-checked:bg-green-50 dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950 cursor-pointer",
                  disabled && "cursor-auto opacity-70",
                )}
              >
                <Checkbox
                  id={nameInSchema}
                  checked={field.value}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                  {...field}
                  disabled={disabled}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">
                    {fieldTitle}
                  </p>
                  <p className="text-muted-foreground text-sm">{message}</p>
                </div>
              </FormLabel>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
