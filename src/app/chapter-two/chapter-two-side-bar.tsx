"use client";

import { UserData } from "@/lib/types";
import SmallCodeSnippetContainer from "../../components/small-code-snippet-container";
import { useUserQuery } from "../chapter-one/query";

interface ChapterTwoSidebarProps {
  user: UserData | null;
}

export default function ChapterTwoSidebar({ user }: ChapterTwoSidebarProps) {
  const { data } = useUserQuery(user!);

  return (
    <div className="w-full space-y-4 *:w-full *:gap-2 *:font-bold">
      <SmallCodeSnippetContainer
        text={data?.momoVariable?.accessToken!}
        title="Access token"
      />{" "}
    </div>
  );
}
