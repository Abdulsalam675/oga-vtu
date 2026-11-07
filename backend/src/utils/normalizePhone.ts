import { parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizePhoneNumber(
  phone: string | null | undefined,
): string | null {
  if (!phone) return null;

  const phoneNumber = parsePhoneNumberFromString(phone, "NG");

  if (!phoneNumber || !phoneNumber.isValid()) {
    return null;
  }

  return phoneNumber.format("E.164");
}
