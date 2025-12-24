import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
interface Props {
  children: React.ReactNode;
  isChecked?: boolean;
}
export default function ProductSubtitleContainer({
  children,
  isChecked = false,
}: Props) {
  return (
    <div className="mt-12 flex gap-2 *:before:pr-2 *:before:text-2xl *:before:font-bold">
      <CheckCircle2
        className={cn(
          "text-muted inline fill-green-700",
          !isChecked && "hidden",
        )}
      />
      {children}
    </div>
  );
}
