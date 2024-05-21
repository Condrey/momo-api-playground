"use client";
import { cn } from "@/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

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
  const [isCopied, setIsCopied] = useState<boolean>(false);
  function handleCopy() {
    if (code !== null) {
      navigator.clipboard
        .writeText(code)
        .then(() => setIsCopied(true))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  }

  return (
    <div className="flex w-full max-w-5xl flex-col">
      <div className="space-x-4">
        <span>{filePath}</span>
        <Copy
          onClick={handleCopy}
          className={cn(
            "float-right size-8 rounded-md border border-stone-500/50 p-2 hover:bg-stone-500",
            isCopied && "hidden",
          )}
        />
        <CheckCheck
          onClick={handleCopy}
          className={cn(
            "float-right size-8 rounded-md border border-stone-500/50 p-2 hover:bg-stone-500",
            !isCopied && "hidden",
          )}
        />{" "}
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === "light" ? oneLight : oneDark}
        wrapLongLines
        wrapLines
      >
        {`${code}`}
      </SyntaxHighlighter>
    </div>
  );
}
