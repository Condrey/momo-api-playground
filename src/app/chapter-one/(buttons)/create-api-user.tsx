"use client";

import ProductSubtitleContainer from "@/components/product-subtitle-container";
import ResponseContainer from "@/components/response-container";
import LoadingButton from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AddEditCAllbackUrl from "../(components)/add-edit-callback-url";

interface Props {
  user: User | null;
}
export default function CreateApiUser({ user }: Props) {
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hideAddCallbackUrl: boolean =
    user?.callbackUrl !== null && user?.callbackUrl !== undefined;

  const [open, setOpen] = useState<boolean>(false);
  const isReferenceIdSaved = user?.referenceId !== null;
  const router = useRouter();
  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/provisioning/create-api-user", {
        method: "POST",
        body: JSON.stringify({
          referenceId: user?.referenceId ?? "",
          primaryKey: user?.primaryKey ?? "",
          secondaryKey: user?.secondaryKey ?? "",
        }),
      });
      const data = await response.json();
      setResponseMsg(
        `{\n"Status": "${response.status}",\n"StatusText": "${response.statusText}"\n}`,
      );
      toast(response.ok
          ? "Creating Sandbox user"
          : "Failed to create sandBox user",{
        
        description: JSON.stringify(
          `Status: ${response.status},StatusText: ${response.statusText}`,
        ),
      });
    } catch (error) {
      console.error("error: ", error);
      toast.error("Server Error",{
        description: "Server Error",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  function addCallBackUrlClicked() {
    setOpen(true);
  }
  return (
    <>
      <ProductSubtitleContainer isChecked={isReferenceIdSaved}>
        <span
          className={cn(
            isReferenceIdSaved
              ? ' before:content-["Created_User:"]'
              : ' before:content-["Create_User:"]',
          )}
        >
          /v1_0/apiuser - POST
        </span>
      </ProductSubtitleContainer>
      <LoadingButton
        onClick={addCallBackUrlClicked}
        loading={false}
        className={cn(hideAddCallbackUrl && "hidden")}
      >
        Provide callBack Url
      </LoadingButton>
      <LoadingButton
        disabled={isReferenceIdSaved || !hideAddCallbackUrl}
        onClick={handleClick}
        loading={isLoading}
      >
        Create Api User
      </LoadingButton>
      <ResponseContainer message={responseMsg} />
      <AddEditCAllbackUrl open={open} setOpen={setOpen} user={user} />
    </>
  );
}
