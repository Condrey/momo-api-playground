"use client";
import { CheckCheckIcon, CopyIcon, FileCode2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function CodeSnippet({
  code,
  language = "typescript",
  filePath,
}: {
  code: string;
  language?: string;
  filePath?: string;
}) {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();

  async function handleCopy() {
    if (code !== null) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          toast.info("code snippet copied to clipboard Successfully");
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          toast.error("Failed to copy code snippet to clipboard");
        });
      // artificial non-blocking delay of 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  return (
    <div className="bg-mtn-blue flex w-full max-w-5xl flex-col rounded-sm px-2 py-2">
      <div className="text-mtn-blue-foreground flex items-center justify-between gap-3">
        <span className="italic">{filePath}</span>
        <span className="text-primary">
          <FileCode2Icon className="mr-o.5 inline" strokeWidth={1.3} />
          {language}
        </span>
      </div>
      <div className="relative">
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => startTransition(handleCopy)}
          disabled={isPending}
          title="copy code snippet"
          className="absolute top-3 right-2"
        >
          {isPending ? (
            <CheckCheckIcon className="text-green-500" />
          ) : (
            <CopyIcon />
          )}
          <span className="sr-only">Copy code snippet</span>
        </Button>

        <SyntaxHighlighter
          language={language}
          style={
            theme === "light" ? oneLight : theme === "dark" ? oneDark : oneLight
          }
          wrapLongLines
          wrapLines
          showLineNumbers
        >
          {`${code}`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
