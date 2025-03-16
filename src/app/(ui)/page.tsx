import ChapterLinks from "@/components/chapter-links";
import Title from "@/components/title";
import BodyContainer from "./(side-bar)/body-container";
import HeaderContainer from "./(side-bar)/header-container";

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <BodyContainer>
        <span>Please choose a chapter to navigate to </span>
        <Title title="Sand box Environment" />
        <div className="flex flex-col gap-2 *:flex *:max-w-prose *:gap-2 *:rounded-full *:p-2">
          <ChapterLinks />
        </div>
      </BodyContainer>
    </>
  );
}
