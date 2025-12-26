"use client";

import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { UserData } from "@/lib/types";
import { useUserQuery } from "./query";

interface ChapterOneSidebarProps {
  user: UserData|null;
}

export default function ChapterOneSidebar({ user }: ChapterOneSidebarProps) {

const { data } = useUserQuery(user!);
  return (
    <div className="w-full space-y-4 *:w-full *:gap-2 *:font-bold">
      <SmallCodeSnippetContainer
        text={data?.momoVariable?.callbackHost!}
        title="Your callbackHost"
      />
      <SmallCodeSnippetContainer
        text={data?.momoVariable?.callbackUrl!}
        title="Your callbackUrl"
      />
      <SmallCodeSnippetContainer
        text={data?.momoVariable?.referenceId!}
        title="Your X-Reference-Id"
      />
      <SmallCodeSnippetContainer
        text={data?.momoVariable?.apiKey!}
        title="Your apiKey"
      />
      <SmallCodeSnippetContainer
        text={data?.momoVariable?.authorization!}
        title="Your Authorization"
      />
    </div>
  );
}
