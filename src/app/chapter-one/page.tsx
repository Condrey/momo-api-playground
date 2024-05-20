import ProductTitleContainer from "@/components/product-title-container";
import { fetchUserById } from "@/lib/db/data/user-data";
import CreateApiKey from "./(buttons)/create-api-key";
import CreateApiUser from "./(buttons)/create-api-user";
import GetApiUser from "./(buttons)/get-api-user";
import WhatIsNext from "./what-is-next";

export default async function Page() {
  const user = await fetchUserById();
  return (
    <>
      <ProductTitleContainer productTitle="Sandbox User Provisioning" />
      <CreateApiUser user={user} />
      <GetApiUser user={user} />
      <CreateApiKey user={user} />
      <WhatIsNext user={user} />
    </>
  );
}
