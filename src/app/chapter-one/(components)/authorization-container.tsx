"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface Props {
  authorization: string | null;
}
export default function AuthorizationContainer({ authorization }: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  function handleCopy() {
    if (authorization !== null) {
      navigator.clipboard
        .writeText(authorization)
        .then(() => setIsCopied(true))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  }
  return (
    <>
      <div className={cn(authorization === null ? "hidden" : "flex flex-col")}>
        <span>Your Authorization</span>
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
            authorization ?? ""
          }`}</p>
        </div>
      </div>
    </>
  );
}
