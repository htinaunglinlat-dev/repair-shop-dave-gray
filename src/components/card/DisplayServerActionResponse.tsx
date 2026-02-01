import { cn } from "@/lib/utils";

type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

type MessageBoxProps = {
  type: "error" | "success";
  content: React.ReactNode;
};

const MessageBox = ({ type, content }: MessageBoxProps) => (
  <div
    className={cn(
      "bg-accent px-4 py-2 my-2 rounded-lg",
      type === "error" ? "text-red-500" : "text-green-500"
    )}
  >
    {type === "success" ? "✅" : "🐔"}
    {content}
  </div>
);

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {data?.message && <MessageBox type="success" content={data.message} />}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors && (
        <MessageBox
          type="success"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>{`${key}: ${validationErrors[key]}`}</p>
          ))}
        />
      )}
    </div>
  );
}
