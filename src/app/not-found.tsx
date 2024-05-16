import { Triangle ,CircleDashed,Star,CircleSlash2,Box} from "lucide-react";
export default function Page() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
       <div className="flex size-[150px] items-center justify-center ">
        <span className=" text-amber-500 absolute text-2xl font-bold hover:text-foreground z-50 peer" >404</span>
        <CircleDashed className="absolute size-[90px] peer-hover:text-amber-500 peer-hover:animate-spin" />
        <Star className="relative inset-12 animate-spin"/>
        <Triangle className="relative -inset-12 animate-spin"/>
        <CircleSlash2 className="relative inset-x-12 animate-spin"/>
        <Box className="relative  -inset-y-12 animate-spin"/>
      </div> 
      <span>Sorry this page does not exist</span>
    </div>
  );
}
