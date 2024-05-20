"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";
interface Props {
    callbackUrl: string | null;
}
export default function CallbackUrlContainer({  callbackUrl }: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  function handleCopy() {
    if (callbackUrl !== null) {
      navigator.clipboard
        .writeText(callbackUrl)
        .then(() => setIsCopied(true))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  }
  return (
    <>
      <div className={cn(callbackUrl === null ? "hidden" : "flex flex-col")}>
        <span>Your callbackUrl</span>
        <div className="w-full rounded-md border bg-stone-800 p-2 font-normal text-white">
          <Copy
            onClick={handleCopy}
            className={cn(
              "float-right size-8 rounded-md p-2 hover:bg-stone-500",
              isCopied && "hidden",
            )}
          />
          <CheckCheck
            onClick={handleCopy}
            className={cn(
              "float-right size-8 rounded-md p-2 hover:bg-stone-500",
              !isCopied && "hidden",
            )}
          />
          <p className=" select-all whitespace-pre-line break-all">{`${
            callbackUrl ?? ""
          }`}</p>
        </div>
      </div>
    </>
  );
}
