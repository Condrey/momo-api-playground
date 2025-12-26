import { PayerSchema } from "@/lib/validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const parties: PayerSchema[] = [
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "AccountHolderActiveMsisdnNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "AccountHolderActiveMsisdnNotActive",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "AccountHolderActiveMsisdnNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "AccountHolderActiveMsisdnNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "AccountHolderActiveMsisdnInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "AccountHolderActiveMsisdnServiceUnavailable",
  },

  {
    partyIdType: "EMAIL",
    partyId: "notfound@email.com",
    response: "AccountHolderActiveEmailNotFound",
  },
  {
    partyIdType: "EMAIL",
    partyId: "notactive@email.com",
    response: "AccountHolderActiveEmailNotActive",
  },
  {
    partyIdType: "EMAIL",
    partyId: "notallowed@email.com",
    response: "AccountHolderActiveEmailNotAllowed",
  },
  {
    partyIdType: "EMAIL",
    partyId: "notallowedtargetenvironment@email.com",
    response: "AccountHolderActiveEmailNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "EMAIL",
    partyId: "internalprocessingerror@email.com",
    response: "AccountHolderActiveEmailInternalProcessingError",
  },
  {
    partyIdType: "EMAIL",
    partyId: "serviceunavailable@email.com",
    response: "AccountHolderActiveEmailServiceUnavailable",
  },
  {
    partyIdType: "PARTY_CODE",
    partyId: "5cecb5a7-8bd0-4f49-87b1-8eb9ecc7b7bc",
    response: "AccountHolderActivePartyCodeNotFound",
  },
  {
    partyIdType: "PARTY_CODE",
    partyId: "b0040b3c-b426-4a90-af6e-673e65861cd7",
    response: "AccountHolderActivePartyCodeNotActive",
  },
  {
    partyIdType: "PARTY_CODE",
    partyId: "4d5f500f-c385-4901-9be5-25b6d36ad220",
    response: "AccountHolderActivePartyCodeNotAllowed",
  },
  {
    partyIdType: "PARTY_CODE",
    partyId: "d2265f9b-0c22-496d-908f-79a65ad66266",
    response: "AccountHolderActivePartyCodeNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "PARTY_CODE",
    partyId: "8f548a78-ceb8-4d12-a243-5640b91e91a4",
    response: "AccountHolderActivePartyCodeInternalProcessingError",
  },
  {
    partyIdType: "PARTY_CODE",
    partyId: "5585c07a4-2c80-42f7-9e73-e586b36dee68",
    response: "AccountHolderActivePartyCodeServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "RequestToPayPayerFailed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123464",
    response: "RequestToPayPayerTransfertypeUnknown",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "RequestToPayPayerRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "RequestToPayPayerExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "RequestToPayPayerOngoing",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "RequestToPayPayerDelayed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "RequestToPayPayerNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123456",
    response: "RequestToPayPayerPayeeNotAllowedToReceive",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123457",
    response: "RequestToPayPayerNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123458",
    response: "RequestToPayPayerNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123459",
    response: "RequestToPayPayerInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123460",
    response: "RequestToPayPayerInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123461",
    response: "RequestToPayPayerInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123462",
    response: "RequestToPayPayerServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123463",
    response: "RequestToPayPayerCouldNotPerformTransaction",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "PreApprovalPayerFailed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "PreApprovalPayerRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "PreApprovalPayerExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "PreApprovalPayerOngoing",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "PreApprovalPayerDelayed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "PreApprovalPayerNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123456",
    response: "PreApprovalPayerNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123457",
    response: "PreApprovalPayerNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123458",
    response: "PreApprovalPayerInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123459",
    response: "PreApprovalPayerInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123460",
    response: "PreApprovalPayerInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123461",
    response: "PreApprovalPayerServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "RequestToWithdrawPayerFailed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "RequestToWithdrawPayerRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "RequestToWithdrawPayerExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "RequestToWithdrawPayerOngoing",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "RequestToWithdrawPayerDelayed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "RequestToWithdrawPayerNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123456",
    response: "RequestToWithdrawPayerPayeeNotAllowedToReceive",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123457",
    response: "RequestToWithdrawPayerNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123458",
    response: "RequestToWithdrawPayerNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123459",
    response: "RequestToWithdrawPayerInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123460",
    response: "RequestToWithdrawPayerInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123461",
    response: "RequestToWithdrawPayerInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123462",
    response: "RequestToWithdrawPayerServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123463",
    response: "RequestToWithdrawPayerCouldNotPerformTransaction",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "DepositPayerFailed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "DepositPayerRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "DepositPayerExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "DepositPayerOngoing",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "DepositPayerDelayed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "DepositPayerNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123456",
    response: "DepositPayerPayeeNotAllowedToReceive",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123457",
    response: "DepositPayerNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123458",
    response: "DepositPayerNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123459",
    response: "DepositPayerInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123460",
    response: "DepositPayerInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123461",
    response: "DepositPayerInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123462",
    response: "DepositPayerServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123463",
    response: "DepositPayerCouldNotPerformTransaction",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "TransferPayeeFailed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123464",
    response: "TransferPayeeServiceUnavailableTransfertypeUnknown",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "TransferPayeeRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "TransferPayeeExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "TransferPayeeOngoing",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "TransferPayeeDelayed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "TransferPayeeNotEnoughFunds",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123456",
    response: "TransferPayeePayerLimitReached",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123457",
    response: "TransferPayeeNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123458",
    response: "TransferPayeeNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123459",
    response: "TransferPayeeNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123460",
    response: "TransferPayeeInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123461",
    response: "TransferPayeeInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123462",
    response: "TransferPayeeInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123463",
    response: "TransferPayeeServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "1",
    response: "RefundTransactionNotFound",
  },
  { partyIdType: "MSISDN", partyId: "2", response: "RefundTransactionFailed" },
  {
    partyIdType: "MSISDN",
    partyId: "3",
    response: "RefundTransactionRejected",
  },
  { partyIdType: "MSISDN", partyId: "4", response: "RefundTransactionExpired" },
  { partyIdType: "MSISDN", partyId: "5", response: "RefundTransactionOngoing" },
  { partyIdType: "MSISDN", partyId: "6", response: "RefundTransactionDelayed" },
  {
    partyIdType: "MSISDN",
    partyId: "7",
    response: "RefundTransactionNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "8",
    response: "RefundTransactionNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "9",
    response: "RefundTransactionInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "10",
    response: "RefundTransactionInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "11",
    response: "RefundTransactionInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "12",
    response: "RefundTransactionServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "13",
    response: "RefundTransactionCouldNotPerformTransaction",
  },
  {
    partyIdType: "MSISDN",
    partyId: "1",
    response: "CashTransferTransactionNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "2",
    response: "CashTransferTransactionFailed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "3",
    response: "CashTransferTransactionRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "4",
    response: "CashTransferTransactionExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "5",
    response: "CashTransferTransactionPayeeNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "6",
    response: "CashTransferTransactionPayeeNotAllowedToReceive",
  },
  {
    partyIdType: "MSISDN",
    partyId: "7",
    response: "CashTransferTransactionNotAllowed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "8",
    response: "CashTransferTransactionNotAllowedTargetEnvironment",
  },
  {
    partyIdType: "MSISDN",
    partyId: "9",
    response: "CashTransferTransactionInvalidCallbackUrlHost",
  },
  {
    partyIdType: "MSISDN",
    partyId: "10",
    response: "CashTransferTransactionInvalidCurrency",
  },
  {
    partyIdType: "MSISDN",
    partyId: "11",
    response: "CashTransferTransactionInternalProcessingError",
  },
  {
    partyIdType: "MSISDN",
    partyId: "12",
    response: "CashTransferTransactionServiceUnavailable",
  },
  {
    partyIdType: "MSISDN",
    partyId: "13",
    response: "CashTransferTransactionCouldNotPerformTransaction",
  },
  {
    partyIdType: "MSISDN",
    partyId: "all_info",
    response: "Oauth2CustomScopes",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123450",
    response: "Oauth2AccountHolderNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123451",
    response: "Oauth2ConsentRejected",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123452",
    response: "Oauth2ConsentPending",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123453",
    response: "Oauth2ConsentExpired",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123454",
    response: "Oauth2ConsentExpiredRefreshToken",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123455",
    response: "Oauth2ConsentRevoked",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123456",
    response: "Oauth2ConsentDeletedScope",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123457",
    response: "Oauth2ConsentAlreadyUsed",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123458",
    response: "Oauth2FinancialNoFunds",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123459",
    response: "Oauth2FinancialPayeeNotFound",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123460",
    response: "Oauth2FinancialConsentMismatch",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123461",
    response: "Oauth2FinancialPayerLimitReached",
  },
  {
    partyIdType: "MSISDN",
    partyId: "46733123462",
    response: "Oauth2FinancialPayeeNotAllowedToReceive",
  },
];

async function main() {
  console.log(
    "Seeding payers... (this may create duplicates if run multiple times)",
  );

  try {
    await prisma.payer.createMany({
      data: parties,
      skipDuplicates: true,
    });
  } catch (e) {
    console.error("Error creating payers", e);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
