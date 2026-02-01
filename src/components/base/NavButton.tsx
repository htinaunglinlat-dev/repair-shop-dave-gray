import Link from "next/link";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export function NavButton({ icon: Icon, label, href }: Props) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      aria-label={label}
      asChild
      className="rounded-full"
    >
      {href ? (
        <Link href={href}>
          <Icon className="size-6" />
        </Link>
      ) : (
        <Icon className="size-6" />
      )}
    </Button>
  );
}
