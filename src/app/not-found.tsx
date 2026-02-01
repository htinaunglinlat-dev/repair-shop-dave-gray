import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export const metadata = {
  title: "Page Not Found.",
};

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <Image
          src="/images/not-found-1024x1024.png"
          width={260}
          height={260}
          alt="Page Not Found"
          priority
          className="rounded-2xl shadow-md dark:shadow-none dark:opacity-90"
        />

        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Button asChild>
          <Link
            href="/tickets"
            className="mt-2 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go to Ticket Page
          </Link>
        </Button>
      </div>
    </div>
  );
}
