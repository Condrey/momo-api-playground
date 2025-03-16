import {
  Box,
  CircleDashed,
  CircleSlash2,
  ListStartIcon,
  Star,
  Triangle,
} from "lucide-react";

export default function Page() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="flex size-[150px] items-center justify-center ">
        <ListStartIcon className=" peer absolute z-50  size-[50px] animate-spin text-amber-500 hover:text-foreground dark:text-amber-300" />
        <CircleDashed className="absolute size-[90px] peer-hover:animate-spin peer-hover:text-amber-500 dark:peer-hover:text-amber-300" />
        <Star className="relative inset-12 animate-spin" />
        <Triangle className="relative -inset-12 animate-spin" />
        <CircleSlash2 className="relative inset-x-12 animate-spin" />
        <Box className="relative  -inset-y-12 animate-spin" />
      </div>{" "}
    </div>
  );
}
