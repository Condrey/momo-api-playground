import { fetchUserById } from "@/lib/db/data/user-data";
import ApiKeyContainer from "./(components)/api-key-container";
import AuthorizationContainer from "./(components)/authorization-container";
import CallbackUrlContainer from "./(components)/callback-url-container";
import ReferenceIdContainer from "./(components)/reference-id-container";

export default async function LayoutSideBar() {
  const user = await fetchUserById();

  return (
    <div className=" w-full space-y-4 *:w-full *:gap-2 *:font-bold lg:w-5/12">
      <CallbackUrlContainer callbackUrl={user?.callbackUrl!} />
      <ReferenceIdContainer referenceId={user?.referenceId!} />
      <ApiKeyContainer apiKey={user?.apiKey!} />
      <AuthorizationContainer authorization={user?.authorization!} />
    </div>
  );
}
