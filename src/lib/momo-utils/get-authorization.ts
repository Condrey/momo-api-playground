export default function getAuthorization(
  primaryKey: string,
  secondaryKey: string,
): string {
  const credentials = `${primaryKey}:${secondaryKey}`;
  const base64Credentials = Buffer.from(credentials).toString("base64");
  return `Basic ${base64Credentials}`;
}
