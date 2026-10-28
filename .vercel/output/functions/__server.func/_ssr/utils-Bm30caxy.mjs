import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-Bm30caxy.js
var BN = "০১২৩৪৫৬৭৮৯";
function toBnDigits(value) {
	return String(value).replace(/\d/g, (digit) => BN[Number(digit)] ?? digit);
}
function formatBdt(amount) {
	return `৳${toBnDigits(amount.toLocaleString("en-US"))}`;
}
function formatPhone(phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 11) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
	return phone;
}
function waLink(phone, text) {
	const digits = phone.replace(/\D/g, "");
	return `https://wa.me/${digits.startsWith("880") ? digits : `880${digits.replace(/^0/, "")}`}?text=${encodeURIComponent(text)}`;
}
function telLink(phone) {
	const digits = phone.replace(/\D/g, "");
	return `tel:+${digits.startsWith("880") ? digits : `880${digits.replace(/^0/, "")}`}`;
}
function initialsFrom(name) {
	const first = [...name.trim()][0] ?? "•";
	return /[a-z]/i.test(first) ? first.toUpperCase() : first;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { telLink as a, initialsFrom as i, formatBdt as n, toBnDigits as o, formatPhone as r, waLink as s, cn as t };
