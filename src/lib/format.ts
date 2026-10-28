const BN = "০১২৩৪৫৬৭৮৯";

export function toBnDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => BN[Number(digit)] ?? digit);
}

export function formatBdt(amount: number) {
  return `৳${toBnDigits(amount.toLocaleString("en-US"))}`;
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return phone;
}

export function waLink(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("880") ? digits : `880${digits.replace(/^0/, "")}`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("880") ? digits : `880${digits.replace(/^0/, "")}`;
  return `tel:+${intl}`;
}

export function initialsFrom(name: string) {
  const first = [...name.trim()][0] ?? "•";
  return /[a-z]/i.test(first) ? first.toUpperCase() : first;
}
