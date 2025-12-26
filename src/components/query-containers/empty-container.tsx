import { cn } from "@/lib/utils";

interface EmptyContainerProps {
  message: String;
  children?: React.ReactNode;
  className?: string;
}
export default function EmptyContainer({
  message,
  children,
  className,
}: EmptyContainerProps) {
  return (
    <div
      className={cn(
        "bg-muted flex min-h-80 flex-col items-center justify-center gap-4 p-3 sm:bg-transparent",
        className,
      )}
    >
      <p className="text-muted-foreground max-w-sm text-center">{message}</p>
      {children}
    </div>
  );
}
