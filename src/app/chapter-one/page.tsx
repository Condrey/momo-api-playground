import EmptyContainer from "@/components/query-containers/empty-container";
import Title from "@/components/title";
import { fetchUserById } from "./actions";
import ChapterOneSidebar from "./chapter-one-side-bar";
import CreateApiKey from "./create-api-key/create-api-key";
import CreateApiUser from "./create-api-user/create-api-user";
import GetApiUser from "./get-api-user/get-api-user";
import WhatIsNext from "./what-is-next";

export default async function Page() {
  const user = await fetchUserById();
  if (!user)
    return (
      <EmptyContainer message={"Please sign in to continue"}></EmptyContainer>
    );

  return (
    <>
      <Title
        title="Product: Sandbox User Provisioning"
        description="This is for creating, getting an API user as well as creating an API key for that user in the sandbox environment."
      />
      {/* sidebar components  */}
      <div className="flex max-w-prose lg:hidden">
        <ChapterOneSidebar user={user} />
      </div>

      {/* Main components  */}
      <CreateApiUser user={user} />
      <GetApiUser user={user} />
      <CreateApiKey user={user} />
      <WhatIsNext user={user} />
    </>
  );
}
