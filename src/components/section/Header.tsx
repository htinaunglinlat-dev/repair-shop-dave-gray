import { File, Home, LogOut, UsersRound } from "lucide-react";
import { NavButton } from "../base/NavButton";
import Link from "next/link";
import { ModeToggle } from "../base/ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { NavButtonMenu } from "@/components/base/NavButtonMenu";

export function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex justify-between items-center">
          <NavButton href="/tickets" label="Home" icon={Home} />
          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0"
            title="Tickets"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              {
                title: "Search Customers",
                href: "/customers",
              },
              {
                title: "New Customers",
                href: "/customers/form",
              },
            ]}
          />
          <NavButton icon={File} label="Tickets" href="/tickets"  />
          <ModeToggle />
          <Button
            variant={"outline"}
            size={"icon"}
            aria-label="logout"
            title="Logout"
            asChild
          >
            <LogoutLink>
              <LogOut className="text-red-500" />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
