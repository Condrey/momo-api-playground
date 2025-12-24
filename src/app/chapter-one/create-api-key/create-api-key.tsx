"use client";
import ProductSubtitleContainer from "@/components/product-subtitle-container";
import { SubtitleOnly } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUserQuery } from "../query";
import ButtonCreateApiKey from "./button-create-api-key";
interface Props {
  user: UserData;
}
export default function CreateApiKey({ user }: Props) {
  const isApiKeyPresent = !!user.momoVariable?.apiKey;
  const query = useUserQuery(user);
  const { data, status } = query;

  return (
    <>
      <ProductSubtitleContainer isChecked={isApiKeyPresent}>
        <span
          className={cn(
            isApiKeyPresent
              ? 'before:content-["Created_API_key:"]'
              : 'before:content-["Create_API_key:"]',
          )}
        >
          /v1_0/apiuser/{" "}
          <strong className="italic">{`{X-Reference-Id}`}</strong> /apikey -{" "}
          <Badge variant={"api"}>POST</Badge>
        </span>
      </ProductSubtitleContainer>
      <SubtitleOnly>
        Used to create an API key for an API user in the sandbox target
        environment.
      </SubtitleOnly>
      <ButtonCreateApiKey user={data}>Create Api Key</ButtonCreateApiKey>
    </>
  );
}
