import { TriangleAlert } from "lucide-react";
import { BackButton } from "../base/BackButton";
import { Card, CardContent, CardFooter } from "../ui/card";

type Props = {
  title: string;
};

export default function InvalidCard({ title }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Card className="w-96">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          {/* Icon */}
          <TriangleAlert className="size-14 text-red-500" />

          {/* Message */}
          <h2 className="text-xl font-medium mb-2 text-center">{title}</h2>
        </CardContent>
        <CardFooter>
          {/* Action Button */}
          <BackButton
            title="Go Back"
            variant="default"
            className="w-full py-3"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
