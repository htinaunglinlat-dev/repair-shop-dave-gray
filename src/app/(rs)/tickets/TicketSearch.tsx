import SearchButton from "@/components/base/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import TableLoading from "./TableLoading";

export default function TicketSearch() {
  return (
    <div>
      <Form action={"/tickets"} className="flex flex-col gap-2">
        <div className="w-full flex gap-2 items-center">
          <Input
            name="searchText"
            type="text"
            placeholder="Search Tickets"
            className="w-full"
            autoFocus
          />
          <SearchButton />
        </div>
        <TableLoading />
      </Form>
    </div>
  );
}

// NEST
