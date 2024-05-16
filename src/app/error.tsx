"use client";
import { Box, CircleDashed, CircleSlash2, Home, Star, Triangle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <span>Ann error has occurred.!</span>
      <span>Please refresh to to proceed</span>
      <div className="flex size-[150px] items-center justify-center ">
        <span className=" text-red-500 absolute text-2xl font-bold hover:text-foreground z-50 peer" >ERR</span>
        <CircleDashed className="absolute size-[90px] peer-hover:text-red-500 peer-hover:animate-spin" />
        <Star className="relative inset-12 animate-spin"/>
        <Triangle className="relative -inset-12 animate-spin"/>
        <CircleSlash2 className="relative inset-x-12 animate-spin"/>
        <Box className="relative  -inset-y-12 animate-spin"/>
      </div> 
    </div>
  );
}
