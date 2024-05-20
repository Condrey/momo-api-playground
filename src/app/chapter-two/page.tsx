import ProductTitleContainer from "@/components/product-title-container";
import { fetchUserById } from "@/lib/db/data/user-data";
import CreateAccessToken from "./(buttons)/create-access_token";

export default async function Page() {
  const user = await fetchUserById();

  return (
    <>
      <ProductTitleContainer productTitle="Collection" />
      <CreateAccessToken user={user} />

      <span className="text-2xl ">Coming soon...!</span>
      {/* <ProductTitleContainer productTitle="Collections" />
      <span className=' before:content-["Create_User:"]'>/apiuser - POST</span> */}
    </>
  );
}
