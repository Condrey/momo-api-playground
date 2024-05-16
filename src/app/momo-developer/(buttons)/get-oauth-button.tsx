"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getAccessToken } from "../../api/oauth/route";

export default function GetOauthBtn() {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  async function handleClick() {
    console.log("getting...");

    try {
      const accessToken = await getAccessToken();
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <Button onClick={handleClick}>Get OAuth</Button>
      <span
        className={cn(
          accessToken === undefined && "hidden",
          " select-all rounded-md p-4  text-center font-extrabold text-amber-500 ring-1",
        )}
      >
        {accessToken}
      </span>
    </>
  );
}
