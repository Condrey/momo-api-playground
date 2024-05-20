import { fetchUserById } from "@/lib/db/data/user-data";
import AccessTokenContainer from "./(components)/access-token-container";

export default async function LayoutSideBar() {
  const user = await fetchUserById();

  return (
    <div className=" w-full space-y-4 *:w-full *:gap-2 *:font-bold lg:w-5/12">
      <AccessTokenContainer accessToken={user?.accessToken!} />
        </div>
  );
}
