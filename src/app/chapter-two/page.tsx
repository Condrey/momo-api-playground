import BreadCrumb from "@/components/bread-crumb";
import ProductTitleContainer from "@/components/product-title-container";
import CreateAccessToken from "./(buttons)/create-access_token";
import { fetchUserById } from "@/lib/db/data/user-data";

export default async function Page() {
  const user = await fetchUserById();

  return (
    <>
      <BreadCrumb
        breadCrumbs={[
          { title: "Home", href: "/" },
          { title: "Collection", href: "/chapter-two" },
        ]}
      />
            <ProductTitleContainer productTitle="Collection" />
            <CreateAccessToken user={user}/>

      <span className="text-2xl ">Coming soon...!</span>
      {/* <ProductTitleContainer productTitle="Collections" />
      <span className=' before:content-["Create_User:"]'>/apiuser - POST</span> */}
    </>
  );
}
