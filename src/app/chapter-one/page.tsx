import Title from "@/components/title";
import { fetchUserById } from "@/lib/db/data/user-data";
import CreateApiKey from "./(buttons)/create-api-key";
import CreateApiUser from "./(buttons)/create-api-user";
import GetApiUser from "./(buttons)/get-api-user";
import LayoutSideBar from "./layout-side-bar";
import WhatIsNext from "./what-is-next";

export default async function Page() {
  const user = await fetchUserById();
  return (
    <>
      <Title
        title="Product: Sandbox User Provisioning"
        description="This is for creating, getting an API user as well as creating an API key for that user in the sandbox environment."
      />

      {/* sidebar components  */}
      <div className="flex max-w-prose lg:hidden">
        <LayoutSideBar />
      </div>
      {/* Main components  */}
      <CreateApiUser user={user} />
      <GetApiUser user={user} />
      <CreateApiKey user={user} />
      <WhatIsNext user={user} />
    </>
  );
}
