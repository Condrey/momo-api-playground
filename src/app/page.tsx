import BreadCrumb from "@/components/bread-crumb";
import ChapterLinks from "@/components/chapter-links";
import Title from "@/components/title";

export default function Home() {
  return (
    <>
      <BreadCrumb breadCrumbs={[{ title: "Home", href: "/" }]} />
      <p className="max-w-prose text-justify text-lg">
        This is a practice zone for Open Api by Momo where devs can learn how to
        use the APIs and apply it in their applications.
      </p>
      <Title
        title="Sand box Environment"
        description="Please choose a chapter (product) to navigate to "
      />

      <div className="flex flex-col gap-2 *:flex *:max-w-prose *:gap-2 *:rounded-full *:p-2">
        <ChapterLinks />
      </div>
    </>
  );
}
