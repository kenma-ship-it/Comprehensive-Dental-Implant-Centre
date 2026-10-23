/** Form validation shared by the appointment form and the contact form. */

export type FieldResult = { ok: true; value: string } | { ok: false; message: string };

export function validateName(input: string): FieldResult {
  const value = input.trim().replace(/\s+/g, " ");
  if (value.length < 2) return { ok: false, message: "Enter your name (at least 2 letters)." };
  if (value.length > 80) return { ok: false, message: "Name is too long. Use 80 characters or fewer." };
  return { ok: true, value };
}

/**
 * International phone numbers: 8 to 15 digits, with an optional leading +.
 * Accepts spaces, dashes and brackets. Returns the number as + and digits.
 */
export function validatePhone(input: string): FieldResult {
  const plus = input.trim().startsWith("+");
  const digits = input.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    return { ok: false, message: "Enter your mobile number with country code, for example +971 50 123 4567." };
  }
  return { ok: true, value: `${plus ? "+" : ""}${digits}` };
}

export function validateMessage(input: string, required = true): FieldResult {
  const value = input.trim();
  if (required && value.length < 5) return { ok: false, message: "Write a short message (at least 5 characters)." };
  if (value.length > 600) return { ok: false, message: "Message is too long. Use 600 characters or fewer." };
  return { ok: true, value };
}

export const formatPhone = (phone: string) => phone;
