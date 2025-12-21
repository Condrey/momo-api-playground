import NewComer from "../new-comer";

export default function Page() {
  return (
    <div className="flex size-full h-dvh flex-col items-center justify-center gap-4 p-4 *:before:pr-2 *:before:text-2xl *:before:font-bold md:h-auto">
      <NewComer />
    </div>
  );
}
