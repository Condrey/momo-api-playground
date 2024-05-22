import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { fetchUserById } from "@/lib/db/data/user-data";

export default async function LayoutSideBar() {
  const user = await fetchUserById();

  return (
    <div className=" w-full space-y-4 *:w-full *:gap-2 *:font-bold lg:w-5/12">
      <SmallCodeSnippetContainer
        text={user?.callbackHost!}
        title="Your callbackHost"
      />
       <SmallCodeSnippetContainer
        text={user?.callbackUrl!}
        title="Your callbackUrl"
      />
      <SmallCodeSnippetContainer
        text={user?.referenceId!}
        title="Your X-Reference-Id"
      />
      <SmallCodeSnippetContainer text={user?.apiKey!} title="Your apiKey" />
      <SmallCodeSnippetContainer
        text={user?.authorization!}
        title="Your Authorization"
      />
    </div>
  );
}
