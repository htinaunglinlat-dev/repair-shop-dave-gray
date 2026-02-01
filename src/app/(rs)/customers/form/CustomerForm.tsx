"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customer";
import InputWithLabel from "@/components/input/InputWithLabel";
import TextareaWithLabel from "@/components/input/TextareaWithLabel";
import SelectWithLabel from "@/components/input/SelectWithLabel";
import { StatesArray } from "@/constants/StatesArray";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { toast } from "sonner";
import { DisplayServerActionResponse } from "@/components/card/DisplayServerActionResponse";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CheckboxWithLabel from "@/components/input/CheckboxWithLabel";

type Props = {
  customer?: selectCustomerSchemaType;
  isManager: boolean | undefined;
};

export default function CustomerForm({ customer, isManager = false }: Props) {
  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    notes: "",
    active: true,
  };

  const defaultValues: insertCustomerSchemaType = hasCustomerId
    ? {
        id: customer ? customer.id : 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues);
  }, [searchParams.get("customerId")]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: restSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess: ({ data }) => {
      // toast user
      toast.success("Success! 💯", {
        description: data.message,
      });
    },
    onError: ({ error }) => {
      const validationMessage = error.validationErrors
        ? JSON.stringify(error.validationErrors)
        : "";
      const errorMessage =
        error.serverError ||
        error.thrownError?.message ||
        validationMessage ||
        "Unknown error";

      // toast user
      toast.error("Error! ❌", {
        description: `Save failed: ${errorMessage}`,
      });
    },
  });

  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data);
    // executeSave({...data, firstName: "", phone: ""});
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div className="">
        <h2 className="text-2xl font-bold">
          {customer?.id ? `Edit Customer #${customer.id}` : "New Customer"} Form
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col md:flex-row gap-4 md:gap-8"
          >
            <div className="flex flex-col gap-4 w-full max-w-xs ">
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="First Name"
                nameInSchema="firstName"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Last Name"
                nameInSchema="lastName"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Address 1"
                nameInSchema="address1"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Address 2"
                nameInSchema="address2"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="City"
                nameInSchema="city"
              />
              <SelectWithLabel<insertCustomerSchemaType>
                fieldTitle="State"
                nameInSchema="state"
                data={StatesArray}
              />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-xs ">
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Zip Code"
                nameInSchema="zip"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Email"
                nameInSchema="email"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Phone"
                nameInSchema="phone"
              />
              <TextareaWithLabel<insertCustomerSchemaType>
                fieldTitle="Notes"
                nameInSchema="notes"
              />
              {isManager && customer?.id && (
                <CheckboxWithLabel<insertCustomerSchemaType>
                  fieldTitle="Active"
                  nameInSchema="active"
                  message="Toggle whether this customer is active or inactive."
                />
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant={"default"}
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  type="button"
                  title="Reset"
                  variant={"destructive"}
                  onClick={() => {
                    form.reset(defaultValues);
                    restSaveAction();
                  }}
                  disabled={isSaving}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}


