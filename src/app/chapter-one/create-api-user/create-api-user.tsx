"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import { SubtitleOnly } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import ButtonProvideCallbackHost from "../callbackhost/button-provide-callback-host";
import { useUserQuery } from "../query";
import ButtonCreateApiUser from "./button-create-api-user";

interface Props {
  user: UserData;
}
export default function CreateApiUser({ user }: Props) {
  const isReferenceIdSaved = !!user.momoVariable?.referenceId;
  const { data } = useUserQuery(user);

  return (
    <>
      <ProductSubtitleContainer isChecked={isReferenceIdSaved}>
        <span
          className={cn(
            isReferenceIdSaved
              ? 'before:content-["Created_User:"]'
              : 'before:content-["Create_User:"]',
          )}
        >
          /v1_0/apiuser - <Badge variant={"api"}>POST</Badge>
        </span>
      </ProductSubtitleContainer>
      <SubtitleOnly>
        To create an API user, you must first provide a callback host, and a
        UUIDV4 reference id. For example, if your website url is{" "}
        <Badge variant={"secondary"}>https://example.shop</Badge>, your provider
        callBackHost is <Badge variant={"secondary"}>example.com</Badge>. A
        reference id can be generated from{" "}
        <Link
          href={"https://uuidgenerator.net/version4"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mtn-blue underline"
        >
          uuid generator <ArrowUpRightIcon className="inline size-3" />
        </Link>
      </SubtitleOnly>
      {!data?.momoVariable?.callbackHost && (
        <ButtonProvideCallbackHost user={data}>
          Provide callBack host
        </ButtonProvideCallbackHost>
      )}
      <ButtonCreateApiUser user={data}>Create Api User</ButtonCreateApiUser>
    </>
  );
}
