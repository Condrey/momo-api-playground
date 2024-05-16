import { CheckCheck } from "lucide-react";
import FetchUserPlans from "./(buttons)/fetch-customer-plans";
import GetOauthBtn from "./(buttons)/get-oauth-button";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-auto flex-col gap-4 p-4 *:max-w-prose">
      <span className="text-2xl font-bold underline">MTN MOMO SANDBOX</span>
      <span className="flex gap-2">
        1. Oauth Access Token <CheckCheck className=" text-green-700" />
      </span>
      <GetOauthBtn />
      <ul className=" list-inside list-disc">
        <li>{`Now that we know how to get access token, let's make a function for it`}</li>
        <li>{`We're gonna make the function in the API route dir.`}</li>
      </ul>
      <span>2. Plans V2</span>
      <FetchUserPlans />
    </main>
  );
}
