import SmallCodeSnippetContainer from "@/components/small-code-snippet-container";
import { Payment } from "@prisma/client";

interface Props {
  payment: Payment | null;
}
export default function PaymentParams({ payment }: Props) {
  return (
    <>
      <div className="flex w-full max-w-md flex-col items-center gap-4 *:w-full *:space-y-2 md:flex-row">
        <div className="flex flex-col gap-4 *:space-y-2 ">
          {/* Amount  */}
          <SmallCodeSnippetContainer
            title={`Amount`}
            text={payment?.amount!}
            isMultiLine={false}
          />
          {/*Currency  */}
          <SmallCodeSnippetContainer
            title={`Currency`}
            text={payment?.currency!}
            isMultiLine={false}
          />

          {/* reference id */}
          <SmallCodeSnippetContainer
            title={`Reference id`}
            text={payment?.referenceId!}
            isMultiLine={false}
          />
          {/* Authorization  */}
          <SmallCodeSnippetContainer
            title={`Authorization`}
            text={payment?.authorization!}
            isMultiLine={false}
          />
          {/* Callback url  */}
          <SmallCodeSnippetContainer
            title={`Callback Url`}
            text={payment?.callbackUrl!}
            isMultiLine={false}
          />
          {/* External transaction Id  */}
          <SmallCodeSnippetContainer
            title={`External transaction Id `}
            text={
              payment?.externalTransactionId === null
                ? null
                : `${payment?.externalTransactionId}`
            }
            isMultiLine={false}
          />
          {/* Customer reference  */}
          <SmallCodeSnippetContainer
            title={`Customer reference`}
            text={payment?.customerReference!}
            isMultiLine={true}
          />
          {/* Service provider username */}
          <SmallCodeSnippetContainer
            title={`Service provider username`}
            text={payment?.serviceProviderUserName!}
            isMultiLine={true}
          />
          {/* Coupon Id */}
          <SmallCodeSnippetContainer
            title={`Coupon Id`}
            text={payment?.couponId!}
            isMultiLine={true}
          />
          {/* Product Id */}
          <SmallCodeSnippetContainer
            title={`Product Id`}
            text={payment?.productId!}
            isMultiLine={true}
          />
          {/* Product Offering Id */}
          <SmallCodeSnippetContainer
            title={`Product Offering Id`}
            text={payment?.productOfferingId!}
            isMultiLine={true}
          />
          {/* Receiver message */}
          <SmallCodeSnippetContainer
            title={`Receiver message`}
            text={payment?.receiverMessage!}
            isMultiLine={true}
          />
          {/* Sender note */}
          <SmallCodeSnippetContainer
            title={`Sender note`}
            text={payment?.senderNote!}
            isMultiLine={true}
          />
          {/* Maximum number of retries */}
          <SmallCodeSnippetContainer
            title={`Maximum number of retries`}
            text={
              payment?.maxNumberOfRetries === null
                ? null
                : `${payment?.maxNumberOfRetries}`
            }
            isMultiLine={false}
          />

          {/* Include sender charges */}
          <SmallCodeSnippetContainer
            title={`Included sender charges`}
            text={`${payment?.includeSenderCharges}`}
            isMultiLine={false}
          />
        </div>
      </div>
    </>
  );
}
