import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
interface Props {
  children: React.ReactNode;
  isChecked: boolean;
}
export default function ProductSubtitleContainer({
  children,
  isChecked = false,
}: Props) {
  return (
    <div className="flex gap-2 *:before:pr-2 *:before:text-2xl *:before:font-bold ">
      <CheckCheck className={cn("text-green-700", !isChecked && "hidden")} />
      {children}
    </div>
  );
}
