"use client";

import { cn } from "@/lib/utils";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
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
  const [isPending, startTransition] = useTransition();
  async function handleCopy() {
    if (text !== null) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.info("code snippet copied to clipboard Successfully");
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          toast.error("Failed to copy code snippet to clipboard");
        });
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  if (!text) return null;
  return (
    <div className={cn("flex max-w-sm flex-col font-bold")}>
      <div className="space-y-0.5">
        <h3>{title}</h3>
        {!!subtitle && (
          <h5
            className={cn("text-muted-foreground flex text-xs leading-loose")}
          >
            {subtitle}
          </h5>
        )}
      </div>

      <div className="w-full rounded-md border bg-stone-800 p-2 font-normal text-white">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => startTransition(handleCopy)}
          disabled={isPending}
          title="copy code snippet"
          className="float-right"
        >
          {isPending ? <CheckCheckIcon /> : <CopyIcon />}
          <span className="sr-only">Copy code snippet</span>
        </Button>
        <p
          className={cn(
            "leading-relaxed tracking-wider break-all text-ellipsis whitespace-pre-line oldstyle-nums slashed-zero",
            isMultiLine ? "line-clamp-3" : "line-clamp-1",
          )}
        >{`${text}`}</p>
      </div>
    </div>
  );
}
