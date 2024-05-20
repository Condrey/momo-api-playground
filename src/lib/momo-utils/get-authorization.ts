export default function getAuthorization(
  userName: string,
  password: string,
): string {
  const credentials = `${userName}:${password}`;
  const base64Credentials = Buffer.from(credentials).toString("base64");
  return `Basic ${base64Credentials}`;
}
