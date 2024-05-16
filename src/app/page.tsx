import ChapterLinks from "@/components/chapter-links";
import Header from "@/components/header";
import Title from "@/components/title";
import BreadCrumb from "@/components/bread-crumb";

export default function Home() {
  return (
    <>
      <BreadCrumb breadCrumbs={[{ title: "Home", href: "/" }]} />
      <span>Please choose a chapter to navigate to </span>
      <Title title="Sand box Environment" />
      <div className="flex flex-col gap-2 *:flex *:max-w-prose *:gap-2 *:rounded-full *:p-2">
        <ChapterLinks />
      </div>
    </>
  );
}
