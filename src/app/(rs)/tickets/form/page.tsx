import { BackButton } from "@/components/base/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";
import InvalidCard from "@/components/card/InvalidCard";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ customerId?: string; ticketId?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId)
    return {
      title: "Missing Ticket ID or Customer ID",
    };

  if (customerId)
    return {
      title: `New Ticket for Customer #${customerId}`,
    };

  if (ticketId)
    return {
      title: `Edit Ticket #${ticketId}`,
    };

  return { title: "Ticket Form" };
}

export default async function TicketFormPage({ searchParams }: Props) {
  try {
    const { customerId, ticketId } = await searchParams;
    console.log(ticketId);

    if (!customerId && !ticketId)
      return (
        <InvalidCard title="Ticket ID or Customer ID is required to load ticket form." />
      );

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);

    const isManager = managerPermission?.isGranted ?? false;

    // new ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return <InvalidCard title={`Customer ID # ${customerId} not found.`} />;
      }
      if (!customer.active) {
        return (
          <InvalidCard title={`Customer ID # ${customerId} is not active.`} />
        );
      }

      // return ticket form
      // console.log(customer);
      if (isManager) {
        kindeInit(); // Initialize the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({
              id: user.email?.toLowerCase() || "new-ticket@example.com",
              description:
                user.email?.toLowerCase() || "new-ticket@example.com",
            }))
          : [];

        return (
          <TicketForm customer={customer} techs={techs} isManager={isManager} />
        );
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket ID # {ticketId} is not found.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      if (!customer) return notFound();

      // console.log(ticket);
      // console.log(customer);
      // return ticket form
      if (isManager) {
        kindeInit(); // Initialize the Kinde Management API
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            techs={techs}
            isManager={isManager}
          />
        );
      } else {
        const isEditable =
          user?.email?.toLowerCase() == ticket?.tech?.toLowerCase();

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
