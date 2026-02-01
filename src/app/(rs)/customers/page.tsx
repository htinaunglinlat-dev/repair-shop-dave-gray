import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import getCustomerSearchResults from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";

export const metadata = {
  title: "Customers Search",
};

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function CustomerPage({ searchParams }: Props) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-2",
  });
  // query the database
  const result = await getCustomerSearchResults(searchText);
  span.end();

  // return the result
  return (
    <>
      <CustomerSearch />
      {result.length ? (
        <CustomerTable data={result} />
      ) : (
        <p className="mt-4">No results found.</p>
      )}
    </>
  );
}
