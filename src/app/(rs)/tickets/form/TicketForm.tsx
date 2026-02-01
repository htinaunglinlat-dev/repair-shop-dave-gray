"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  insertTicketSchema,
  type insertTicketSchemaType,
} from "@/zod-schemas/ticket";
import { type selectCustomerSchemaType } from "@/zod-schemas/customer";
import InputWithLabel from "@/components/input/InputWithLabel";
import TextareaWithLabel from "@/components/input/TextareaWithLabel";
import CheckboxWithLabel from "@/components/input/CheckboxWithLabel";
import SelectWithLabel from "@/components/input/SelectWithLabel";
import { useAction } from "next-safe-action/hooks";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/card/DisplayServerActionResponse";

type Props = {
  customer: selectCustomerSchemaType;
  ticket?: insertTicketSchemaType;
  techs?: { id: string; description: string }[];
  isEditable?: boolean;
  isManager?: boolean;
};

export default function TicketForm({
  customer,
  ticket,
  techs: techEmailWithoutDefaultValue,
  isEditable = true,
  isManager = false,
}: Props) {
  // const isManager = Array.isArray(techEmailWithoutDefaultValue);

  const techs = [
    {
      id: "new-ticket@example.com",
      description: "new-ticket@example.com",
    },
    ...(techEmailWithoutDefaultValue ?? []),
  ];

  const defaultValues: insertTicketSchemaType = {
    id: ticket ? ticket.id : "(New)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech.toLowerCase() ?? "new-ticket@example.com",
  };

  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess: ({ data }) => {
      toast.success("Success! 💯", {
        description: data.message,
      });
    },
    onError: () => {
      toast.error("Error! ❌", {
        description: "Save Failed",
      });
    },
  });

  async function submitForm(data: insertTicketSchemaType) {
    // console.log(data);
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div className="">
        <h2 className="text-2xl font-bold">
          {ticket?.id
            ? `${isEditable ? "Edit" : "View"} Ticket #${ticket.id}`
            : "New Ticket"}
          Form
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col md:flex-row gap-4 md:gap-8"
          >
            <div className="flex flex-col gap-4 w-full max-w-xs ">
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Title"
                nameInSchema="title"
                disabled={!isEditable}
              />
              {isManager ? (
                <SelectWithLabel<insertTicketSchemaType>
                  data={techs}
                  fieldTitle="Tech"
                  nameInSchema="tech"
                />
              ) : (
                <InputWithLabel<insertTicketSchemaType>
                  value={form.getValues("tech")}
                  fieldTitle="Tech"
                  nameInSchema="tech"
                  disabled={true}
                />
              )}
              {ticket?.id && (
                <CheckboxWithLabel<insertTicketSchemaType>
                  fieldTitle="Completed"
                  nameInSchema="completed"
                  message="Yes"
                  disabled={!isEditable}
                />
              )}

              <div className="mt-4 space-y-2">
                <h3 className="text-lg">Customer Info</h3>
                <hr className="w-4/5" />
                {customer ? (
                  <>
                    <p>
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p>{customer.address1}</p>
                    <p>
                      {customer.address2 ?? "No Extra Address is provided."}
                    </p>
                    <p>
                      {customer.city} - {customer.state} ({customer.zip})
                    </p>
                    <hr className="w-4/5" />
                    <p>{customer.email}</p>
                    <p>Phone: {customer.phone}</p>
                  </>
                ) : (
                  <p>Customer Info is not provided.</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <TextareaWithLabel<insertTicketSchemaType>
                fieldTitle="Description"
                nameInSchema="description"
                className="h-96"
                disabled={!isEditable}
              />
              {isEditable && (
                <div className="flex gap-2">
                  <Button type="submit" className="w-3/4" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <Button
                    type="reset"
                    variant="destructive"
                    onClick={() => {
                      form.reset(defaultValues);
                      resetSaveAction();
                    }}
                    disabled={isSaving}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
            {/* <p>{JSON.stringify(form.getValues())}</p> */}
          </form>
        </Form>
      </div>
    </div>
  );
}
