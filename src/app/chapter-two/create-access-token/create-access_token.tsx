"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import { SubtitleOnly } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import ButtonCreateAccessToken from "./button-create-access-token";

interface Props {
  user: UserData | null;
}
export default function CreateAccessToken({ user }: Props) {
  const isAccessTokenGot = !!user?.momoVariable?.accessToken;

  return (
    <>
      <ProductSubtitleContainer isChecked={isAccessTokenGot}>
        <span
          className={cn(
            isAccessTokenGot
              ? 'before:content-["Created_Access_Token:"]'
              : 'before:content-["Create_Access_Token:"]',
          )}
        >
          /collection/token/ - <Badge variant={"api"}>POST</Badge>
        </span>
      </ProductSubtitleContainer>
      <SubtitleOnly>
        This operation is used to create an access token which can then be used
        to authorize and authenticate towards the other end-points of the API.
        Access token has an expiry time of 3600 from the time it was created.
      </SubtitleOnly>
      <ButtonCreateAccessToken user={user}>
        {isAccessTokenGot ? "Re-create Access Token" : "Create Access Token"}
      </ButtonCreateAccessToken>
    </>
  );
}
