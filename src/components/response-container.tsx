import { cn } from "@/lib/utils";

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
            : " flex min-h-[150] max-w-prose flex-col items-center justify-center rounded-md bg-gradient-to-br from-red-400  to-fuchsia-400 p-4",
        )}
      >
        <span className="font-bold">{message}</span>
      </div>
    </>
  );
}
