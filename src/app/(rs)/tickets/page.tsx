import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "@/app/(rs)/tickets/TicketTable";

export const metadata = {
  title: "Tickets",
};

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function TicketsPage({ searchParams }: Props) {
  const { searchText } = await searchParams;

  if (!searchText) {
    // query default results
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No open tickets found.</p>
        )}
      </>
    );
  }

  console.log("we are the world.");

  // query search results

  // return search results

  const results = await getTicketSearchResults(searchText);

  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No results found.</p>
      )}
    </>
  );
}
