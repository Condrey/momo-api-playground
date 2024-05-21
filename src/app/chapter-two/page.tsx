import ProductTitleContainer from "@/components/product-title-container";
import {
  fetchUserById,
  fetchUserByIdWithRequestToPay,
} from "@/lib/db/data/user-data";
import CreateAccessToken from "./(buttons)/create-access_token";
import RequestToPay from "./(buttons)/request-to-pay";
import { User } from "@prisma/client";

export default async function Page() {
  const user = await fetchUserByIdWithRequestToPay();

  return (
    <>
      <ProductTitleContainer productTitle="Collection" />
      <CreateAccessToken user={user} />
      <RequestToPay user={user} />

      <span className="text-2xl ">Coming soon...!</span>
      {/* <ProductTitleContainer productTitle="Collections" />
      <span className=' before:content-["Create_User:"]'>/apiuser - POST</span> */}
    </>
  );
}
