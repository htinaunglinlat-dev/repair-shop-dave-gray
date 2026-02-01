"use client"

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function TableLoading() {
  const status = useFormStatus()
  return (
    <div className={cn("w-full grid place-content-center overflow-hidden transition", status.pending ? "h-15!" : "h-0!")}>
      <Loader2 className="animate-spin" />
    </div>
  );
}