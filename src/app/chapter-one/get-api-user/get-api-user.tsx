"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import { SubtitleOnly } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUserQuery } from "../query";
import ButtonGetApiUser from "./button-get-api-user";
interface Props {
  user: UserData;
}
export default function GetApiUser({ user }: Props) {
  const isUserPresent = !!user?.isUserPresent;
  const query = useUserQuery(user);
  const { data, status } = query;
  return (
    <>
      <ProductSubtitleContainer isChecked={isUserPresent}>
        <span
          className={cn(
            isUserPresent
              ? 'before:content-["Got_User:"]'
              : 'before:content-["Get_User:"]',
          )}
        >
          /v1_0/apiuser/
          <strong className="italic">{`{X-Reference-Id} `}</strong>-{" "}
          <Badge variant={"api"}>GET</Badge>
        </span>
      </ProductSubtitleContainer>
      <SubtitleOnly>
        This url is used to get API user information. The user must use the
        UUIDv4 reference id used to create the sandbox user and pass it as a
        parameter.
      </SubtitleOnly>
      <ButtonGetApiUser user={data}>
        {isUserPresent ? "Repeat Getting Api User" : "Get Api User"}
      </ButtonGetApiUser>
    </>
  );
}
