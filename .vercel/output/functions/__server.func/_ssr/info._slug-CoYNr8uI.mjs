import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useRooms, i as Route$2, o as AREAS } from "./router-h9ZDsfHi.mjs";
import { t as PageShell } from "./chrome-B7j_gPyU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/info._slug-CoYNr8uI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGES = {
	guide: {
		title: "ভাড়াটিয়া নির্দেশিকা",
		body: [
			"ধানমন্ডিতে বাসা দেখার আগে ভাড়া, সার্ভিস চার্জ, গ্যাস-পানি এবং অগ্রিম কত মাস লাগবে তা হোস্টের কাছে লিখে নিন।",
			"ফ্ল্যাট দেখে নিন: লিফট, জেনারেটর, সিঁড়ি, টয়লেট ও বারান্দার আলো-বাতাস। সাবলেটে রুমমেট কারা থাকবেন সেটাও জিজ্ঞেস করুন।",
			"টাকা দেওয়ার আগে NID কপি বিনিময় করুন এবং সম্ভব হলে লিখিত শর্ত রাখুন। ব্রোকারকে আলাদা করে অগ্রিম দেবেন না।"
		]
	},
	safety: {
		title: "সেফটি টিপস",
		body: [
			"শুধু অ্যাপে দেওয়া নম্বরে সরাসরি কথা বলুন। কেউ লিংক পাঠিয়ে অগ্রিম চাইলে থামুন।",
			"একা অপরিচিত ফ্ল্যাটে ঢুকবেন না। দিনের বেলায় যান এবং একজনকে জানিয়ে রাখুন।",
			"মহিলা হোস্টেল বা সাবলেটে সিকিউরিটি, গেট লক এবং ওয়ার্ডেন আছে কি না যাচাই করুন।"
		]
	},
	terms: {
		title: "ব্যবহারের শর্তাবলী",
		body: [
			"Dhanmondi Rooms একটি তালিকা — আমরা বাড়িওয়ালা বা ভাড়াটিয়া নই। চুক্তি সরাসরি দুই পক্ষের।",
			"ভুল, পুরনো বা বিভ্রান্তিকর বিজ্ঞাপন মুছে ফেলা হতে পারে। আপনি যে তথ্য দেবেন তার দায় আপনার।",
			"এই ডেমোতে তথ্য আপনার ব্রাউজারে সেভ থাকে। সার্ভারে অ্যাকাউন্ট বা পেমেন্ট নেই।"
		]
	},
	privacy: {
		title: "গোপনীয়তা নীতি",
		body: [
			"নাম, ফোন ও বিজ্ঞাপন এই ব্রাউজারের লোকাল স্টোরেজে থাকে। আমরা সেটি অন্য ডিভাইসে পাঠাই না।",
			"কল ও হোয়াটসঅ্যাপ বাটন আপনার ফোনের অ্যাপ খোলে। সেই কথোপকথন আমাদের কাছে আসে না।",
			"ব্রাউজার ডেটা মুছলে প্রোফাইল ও নতুন বিজ্ঞাপন চলে যাবে। নমুনা লিস্টিং অ্যাকাউন্ট পেজ থেকে ফেরানো যায়।"
		]
	},
	ads: {
		title: "বিজ্ঞাপন ও বাড়িওয়ালা নীতি",
		body: [
			"বিজ্ঞাপন ফ্রি। একই রুমের একাধিক বিভ্রান্তিকর পোস্ট দেবেন না।",
			"ভাড়া, সিট সংখ্যা, কার জন্য (পুরুষ, মহিলা বা ফ্যামিলি) এবং কবে থেকে খালি — এগুলো স্পষ্ট লিখুন।",
			"ছবিতে বাসার আসল অবস্থা দেখান। অন্যের ছবি বা মিথ্যা ঠিকানা দেবেন না।"
		]
	},
	fraud: {
		title: "প্রতারণা প্রতিরোধ নীতি",
		body: [
			"ফ্ল্যাট না দেখে বিকাশ, নগদ বা ব্যাংকে অগ্রিম পাঠাবেন না।",
			"কেউ Dhanmondi Rooms-এর নামে অগ্রিম চাইলে সেটি প্রতারণা। আমাদের কোনো ফিল্ড এজেন্ট নেই।",
			"সন্দেহ হলে বিজ্ঞাপন মুছে দিন এবং সাপোর্ট ইমেইলে লিখুন।"
		]
	},
	community: {
		title: "কমিউনিটি গাইডলাইন",
		body: [
			"সম্মানের সাথে লিখুন। ভাড়াটিয়ার পরিচয় নিয়ে আপত্তিকর মন্তব্য করা যাবে না।",
			"মহিলাদের সিট বা হোস্টেলের বিজ্ঞাপনে নিরাপত্তার তথ্য স্পষ্ট রাখুন।",
			"রুমমেট খুঁজলে ঘরের নিয়ম — রান্না, গেস্ট, নামাজ বা পড়ার সময় — আগেই জানিয়ে দিন।"
		]
	}
};
function InfoPage() {
	const { slug } = Route$2.useParams();
	const page = PAGES[slug];
	const setArea = useRooms((state) => state.setArea);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		document.title = `${page?.title ?? "পেজ"} — Dhanmondi Rooms`;
	}, [page]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "text-sm font-bold text-primary",
			children: "← হোম"
		}), slug === "areas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-extrabold",
				children: "ধানমন্ডির রোড ও এলাকা"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "একটি এলাকা বেছে নিলে সেই ফিল্টার চালু হয়ে হোমে ফিরবেন।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: AREAS.filter((area) => area.id !== "all").map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-14 rounded-2xl bg-surface px-4 text-left font-bold ring-1 ring-line hover:ring-primary",
					onClick: () => {
						setArea(area.id);
						navigate({ to: "/" });
					},
					children: area.label
				}, area.id))
			})
		] }) : page ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 text-3xl font-extrabold",
			children: page.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-4",
			children: page.body.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl bg-surface p-4 text-sm leading-relaxed ring-1 ring-line",
				children: paragraph
			}, paragraph))
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 text-3xl font-extrabold",
			children: "পেজ পাওয়া যায়নি"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "এই লিংকটি আর নেই।"
		})] })]
	}) });
}
//#endregion
export { InfoPage as component };
