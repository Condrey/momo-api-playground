import { cn } from "@/lib/utils";
import CodeSnippet from "./code-snippet";

interface Props {
  message: string | undefined;
}
export default function ResponseContainer({ message }: Props) {
  return (
    <>
      <div
        className={cn(
          message === undefined
            ? "hidden"
            : " flex min-h-[150] max-w-prose flex-col items-center justify-center ",
        )}
      >
        <CodeSnippet code={message!} language="json" />
      </div>
    </>
  );
}
