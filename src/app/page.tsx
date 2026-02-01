import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <Card className="w-4/5 mx-auto sm:max-w-96 sm:text-2xl dark">
          <CardHeader>
            <CardTitle>
              Dan&apos;s Computer <br /> Repair Shop{" "}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <address>
              555 Gateway Lane <br />
              Kansas City, KS 55555
              <p>Daily: 9AM to 5PM</p>
            </address>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={"tel:5555555555"} className="hover:underline">
              555-555-5555
            </Link>
          </CardFooter>
        </Card>
        {/* <div className="flex flex-col gap-6 p-12 rounded-xl bg-foreground w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl"> */}
      </main>
    </div>
  );
}
