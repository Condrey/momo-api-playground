import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { RequestToPay } from "@prisma/client";

interface Props {
  request: RequestToPay | null;
}
export default function TransactionParams({ request }: Props) {
  return (
    <>
      <div className="flex w-full max-w-md flex-col items-center gap-4 *:w-full *:space-y-2 md:flex-row">
        <div className="flex flex-col gap-4 *:space-y-2 ">
          {/* reference id */}
          <SmallCodeSnippetContainer
            title={`Transaction Reference id`}
            text={request?.referenceId!}
            isMultiLine={false}
          />
          {/* Authorization  */}
          <SmallCodeSnippetContainer
            title={`Transaction Authorization`}
            text={request?.accessToken!}
            isMultiLine={false}
          />
          {/* PartId  */}
          <SmallCodeSnippetContainer
            title={`Transaction Party Id`}
            text={request?.partyId === null ? null : `${request?.partyId}`}
            isMultiLine={false}
          />
          {/* Financial Id  */}
          <SmallCodeSnippetContainer
            title={`Financial Transaction Id`}
            text={
              request?.financialTransactionId === null
                ? null
                : `${request?.financialTransactionId}`
            }
            isMultiLine={false}
          />
          {/* callback url  */}
             <SmallCodeSnippetContainer
            title={`Callback Url`}
            text={request?.callbackUrl!}
            isMultiLine={false}
          />
          {/* payer message   */}
           <SmallCodeSnippetContainer
            title={`Payer Message`}
            text={request?.payerMessage!}
            isMultiLine={false}
          />
        </div>
      </div>
    </>
  );
}
