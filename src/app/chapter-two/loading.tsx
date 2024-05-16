import { Box, CircleDashed, CircleSlash2, ListStartIcon, Star, Triangle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
 <div className="flex size-[150px] items-center justify-center ">
        <ListStartIcon className=" text-amber-500 absolute size-[50px]  animate-spin hover:text-foreground z-50 peer" />
        <CircleDashed className="absolute size-[90px] peer-hover:text-amber-500 peer-hover:animate-spin" />
        <Star className="relative inset-12 animate-spin"/>
        <Triangle className="relative -inset-12 animate-spin"/>
        <CircleSlash2 className="relative inset-x-12 animate-spin"/>
        <Box className="relative  -inset-y-12 animate-spin"/>
      </div>    </div>
  );
}
