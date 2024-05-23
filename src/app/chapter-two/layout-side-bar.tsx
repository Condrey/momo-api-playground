import { fetchUserById } from "@/lib/db/data/user-data";
import AccessTokenContainer from "../../components/small-code-snippet-container";

export default async function LayoutSideBar() {
  const user = await fetchUserById();

  return (
    <div className=" w-full space-y-4  *:w-full *:gap-2 *:font-bold ">
      <AccessTokenContainer text={user?.accessToken!} />
    </div>
  );
}
