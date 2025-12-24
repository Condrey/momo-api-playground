import { cn } from "@/lib/utils";
import CodeSnippet from "./code-snippet";

interface Props {
  message: string | undefined;
  language?: string;
  filePath?: string;
  className?: string;
}
export default function ResponseContainer({
  message,
  language,
  filePath,
  className,
}: Props) {
  return (
    <>
      <div
        className={cn(
          message === undefined
            ? "hidden"
            : "flex min-h-[150] w-full max-w-7xl flex-col items-center justify-center",
          className,
        )}
      >
        <CodeSnippet
          code={message!}
          language={language || "json"}
          filePath={filePath}
        />
      </div>
    </>
  );
}
