"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";
interface Props {
  title?: string;
  text: string | null;
  subtitle?: string;
  isMultiLine?: boolean;
}
export default function SmallCodeSnippetContainer(props: Props) {
  const {
    text,
    subtitle,
    isMultiLine = true,
    title = "Your Access Token",
  } = props;
  const [isCopied, setIsCopied] = useState<boolean>(false);
  function handleCopy() {
    if (text !== null) {
      navigator.clipboard
        .writeText(text)
        .then(() => setIsCopied(true))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  }
  return (
    <>
      <div
        className={cn(
          text === null || text === undefined ? "hidden" : "flex flex-col max-w-sm",
        )}
      >
        <span>{title}</span>
        <span
          className={cn(subtitle ? "flex font-bold leading-loose" : "hidden")}
        >
          {subtitle}
        </span>

        <div className="w-full rounded-md border bg-stone-800 p-2 font-normal text-white">
          <Copy
            onClick={handleCopy}
            className={cn(
              "pointer-events-auto float-right size-8 rounded-md p-2 hover:bg-stone-500",
              isCopied && "hidden",
            )}
          />
          <CheckCheck
            onClick={handleCopy}
            className={cn(
              "pointer-events-auto float-right size-8 rounded-md p-2 hover:bg-stone-500",
              !isCopied && "hidden",
            )}
          />
          <p
            className={cn(
              "text-ellipsis whitespace-pre-line break-all",
              isMultiLine ? "line-clamp-3" : "line-clamp-1",
            )}
          >{`${text ?? ""}`}</p>
        </div>
      </div>
    </>
  );
}
