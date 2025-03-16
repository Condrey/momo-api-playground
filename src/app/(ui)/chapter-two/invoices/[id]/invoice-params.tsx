import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { Invoice } from "@prisma/client";

interface Props {
  invoice: Invoice | null;
}
export default function InvoiceParams({ invoice }: Props) {
  return (
    <>
      <div className="flex w-full max-w-md flex-col items-center gap-4 *:w-full *:space-y-2 md:flex-row">
        <div className="flex flex-col gap-4 *:space-y-2 ">
          {/* Amount  */}
          <SmallCodeSnippetContainer
            title={`Amount`}
            text={invoice?.amount!}
            isMultiLine={false}
          />
          {/*Currency  */}
          <SmallCodeSnippetContainer
            title={`Currency`}
            text={invoice?.currency!}
            isMultiLine={false}
          />

          {/* reference id */}
          <SmallCodeSnippetContainer
            title={`Reference id`}
            text={invoice?.referenceId!}
            isMultiLine={false}
          />
          {/* Authorization  */}
          <SmallCodeSnippetContainer
            title={`Authorization`}
            text={invoice?.authorization!}
            isMultiLine={false}
          />
          {/* Callback url  */}
          <SmallCodeSnippetContainer
            title={`Callback Url`}
            text={invoice?.callbackUrl!}
            isMultiLine={false}
          />
          {/* External Id  */}
          <SmallCodeSnippetContainer
            title={`External Id `}
            text={
              invoice?.externalId === null ? null : `${invoice?.externalId}`
            }
            isMultiLine={false}
          />
          {/* Validity duration  */}
          <SmallCodeSnippetContainer
            title={`Validity duration `}
            text={
              invoice?.validityDuration === null
                ? null
                : `${invoice?.validityDuration}`
            }
            isMultiLine={false}
          />
          {/* Intended Payer Party Id  */}
          <SmallCodeSnippetContainer
            title={`Intended Payer Party Id`}
            text={invoice?.intendedPayerPartyId!}
            isMultiLine={true}
          />
          {/* Payee Party Id */}
          <SmallCodeSnippetContainer
            title={`Payee Party Id`}
            text={invoice?.payeePartyId!}
            isMultiLine={true}
          />
          {/* Description */}
          <SmallCodeSnippetContainer
            title={`Description`}
            text={invoice?.description!}
            isMultiLine={true}
          />
        </div>
      </div>
    </>
  );
}
