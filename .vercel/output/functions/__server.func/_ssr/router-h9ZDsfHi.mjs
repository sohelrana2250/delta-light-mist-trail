import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-h9ZDsfHi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var SHOWCASE_DRAFT = {
	query: "ধানমন্ডি রোড ২৭, ৯/এ, ১৫, শংকর",
	kind: "family-flat",
	tenant: "all",
	budget: "8-35",
	available: "from-now"
};
var AREAS = [
	{
		id: "all",
		label: "সব ধানমন্ডি"
	},
	{
		id: "r27",
		label: "ধানমন্ডি ২৭"
	},
	{
		id: "r15",
		label: "ধানমন্ডি ১৫"
	},
	{
		id: "r9a",
		label: "ধানমন্ডি ৯/এ"
	},
	{
		id: "r8a",
		label: "ধানমন্ডি ৮/এ"
	},
	{
		id: "r1",
		label: "ধানমন্ডি ১/এ ও জিগাতলা"
	},
	{
		id: "shankar",
		label: "শংকর ও পশ্চিম ধানমন্ডি"
	},
	{
		id: "satmasjid",
		label: "সাতমসজিদ রোড"
	},
	{
		id: "gohar",
		label: "গোহরনগর ও ৩২"
	}
];
var KIND_META = {
	"family-flat": {
		label: "ফ্যামিলি বাসা",
		searchLabel: "ফ্যামিলি ফ্ল্যাট",
		badge: "bg-family text-family-ink",
		detailBn: "ফ্যামিলি ফ্ল্যাট",
		detailEn: "Family Flat"
	},
	"bachelor-mess": {
		label: "ব্যাচেলর মেস",
		searchLabel: "ব্যাচেলর মেস",
		badge: "bg-mess text-mess-ink",
		detailBn: "ব্যাচেলর মেস / সিট",
		detailEn: "Bachelor Mess"
	},
	sublet: {
		label: "সাবলেট / রুমমেট",
		searchLabel: "সাবলেট / রুম",
		badge: "bg-sublet text-sublet-ink",
		detailBn: "সাবলেট / ১ রুম ভাড়া",
		detailEn: "Sublet - 1 Room"
	},
	"female-hostel": {
		label: "মহিলা হোস্টেল",
		searchLabel: "মহিলা হোস্টেল",
		badge: "bg-hostel text-hostel-ink",
		detailBn: "মহিলা হোস্টেল / সিট",
		detailEn: "Female Hostel"
	},
	office: {
		label: "অফিস স্পেস",
		searchLabel: "অফিস স্পেস",
		badge: "bg-office text-office-ink",
		detailBn: "অফিস স্পেস",
		detailEn: "Office Space"
	}
};
var AVAILABLE_LABEL = {
	current: "চলতি মাস হতে",
	nov: "১ নভেম্বর হতে",
	dec: "১ ডিসেম্বর হতে",
	jan: "১ জানুয়ারি হতে"
};
var TENANT_CARDS = [
	{
		id: "male",
		label: "পুরুষ (Male)"
	},
	{
		id: "female",
		label: "মহিলা (Female)"
	},
	{
		id: "family",
		label: "ফ্যামিলি / যে কেউ"
	}
];
var PHOTOS = {
	living: "/photos/living-bright.jpg",
	glass: "/photos/living-glass.jpg",
	street: "/photos/street-shops.jpg",
	bed: "/photos/bedroom.jpg",
	building: "/photos/building.jpg",
	avenue: "/photos/avenue.jpg",
	shared: "/photos/shared.jpg",
	office: "/photos/office.jpg",
	balcony: "/photos/balcony.jpg",
	kitchen: "/photos/kitchen.jpg"
};
var PHOTO_CHOICES = Object.values(PHOTOS);
var H = 36e5;
var BASE = 17615e8;
var SEED = [
	{
		id: "ariful",
		hostName: "আরিফুল ইসলাম",
		initials: "আ",
		verified: false,
		active: true,
		kind: "family-flat",
		tenant: "family",
		area: "r27",
		addressLine: "Dhaka · Dhanmondi · Road 27",
		locationBn: "ঢাকা , ধানমন্ডি , ধানমন্ডি ২৭",
		description: "ধানমন্ডি ২৭ নম্বরে ডিসেন্ট বাসা — ৩ বেড, ৩ বাথ, ২ বারান্দা। নতুন টাইলসযুক্ত পরিচ্ছন্ন ফ্ল্যাট ভাড়া হবে। লিফট, সাবমার্সিবল, জেনারেটর ও গ্যাস সুবিধা রয়েছে। ধানমন্ডি লেক ও স্কুলের কাছে।",
		rent: 22e3,
		unit: "month",
		available: "dec",
		postedLabel: "Posted 3h ago",
		postedAt: BASE - 3 * H,
		photos: [
			PHOTOS.living,
			PHOTOS.kitchen,
			PHOTOS.balcony,
			PHOTOS.bed,
			PHOTOS.building,
			PHOTOS.glass,
			PHOTOS.avenue,
			PHOTOS.shared
		],
		phone: "01713220027",
		propertyTypeBn: "ফ্যামিলি ফ্ল্যাট",
		propertyTypeEn: "Family Flat"
	},
	{
		id: "saiful",
		hostName: "সাইফুল ইসলাম চৌধুরী",
		initials: "স",
		verified: false,
		active: false,
		kind: "family-flat",
		tenant: "family",
		area: "r9a",
		addressLine: "Dhaka · Dhanmondi · Road 9A",
		locationBn: "ঢাকা , ধানমন্ডি , ধানমন্ডি ৯/এ",
		description: "ধানমন্ডি ৯/এ রোডে ১৬৫০ স্কয়ার ফিটের ৩ বেড, ৩ বাথ ও ২ বারান্দাবিশিষ্ট লাক্সারি ফ্যামিলি ফ্ল্যাট। ২৪ ঘণ্টা লিফট, জেনারেটর ব্যাকআপ, গাড়ি পার্কিং এবং সাউথ-ফেসিং নিরিবিলি বারান্দা।",
		rent: 28500,
		unit: "flat",
		available: "jan",
		postedLabel: "Posted 5h ago",
		postedAt: BASE - 5 * H,
		photos: [
			PHOTOS.glass,
			PHOTOS.balcony,
			PHOTOS.kitchen,
			PHOTOS.bed,
			PHOTOS.building,
			PHOTOS.avenue,
			PHOTOS.living
		],
		phone: "01715285009",
		propertyTypeBn: "ফ্যামিলি ফ্ল্যাট",
		propertyTypeEn: "Family Flat"
	},
	{
		id: "fahim",
		hostName: "ফাহিম আহমেদ",
		initials: "ফ",
		verified: false,
		active: true,
		kind: "bachelor-mess",
		tenant: "male",
		area: "shankar",
		addressLine: "Dhaka · Dhanmondi · Shankar / Road 15",
		locationBn: "ঢাকা , ধানমন্ডি , শংকর",
		description: "ধানমন্ডি শংকর সংলগ্ন ছাত্র বা চাকরিজীবী ব্যাচেলরদের জন্য ২–৩ সিটের খোলামেলা রুম। ৬টি সিটের মধ্যে সিট খালি রয়েছে। ৩ বেলা খাবার, ওয়াইফাই এবং ইউআইইউ/ডিআইইউ শিক্ষার্থীদের জন্য সুবিধাজনক।",
		rent: 4500,
		unit: "seat",
		available: "current",
		postedLabel: "Posted 5h ago",
		postedAt: BASE - 5 * H - 1e3,
		photos: [
			PHOTOS.street,
			PHOTOS.shared,
			PHOTOS.building,
			PHOTOS.bed,
			PHOTOS.kitchen
		],
		phone: "01819450015",
		propertyTypeBn: "ব্যাচেলর মেস / সিট",
		propertyTypeEn: "Bachelor Mess"
	},
	{
		id: "tajbir",
		hostName: "Tajbir Islam",
		initials: "T",
		verified: true,
		active: true,
		kind: "sublet",
		tenant: "female",
		area: "r15",
		addressLine: "Dhaka · Dhanmondi · Road 15",
		locationBn: "ঢাকা , ধানমন্ডি , ধানমন্ডি ১৫",
		description: "নভেম্বর থেকে টাইলস করা ফ্ল্যাটে ৫ম তলায় (লিফট-৪) ৬টি বড় মাস্টার বেডরুম, খোলামেলা বারান্দা এবং অ্যাটাচড বাথরুমসহ সাবলেট ভাড়া হবে। আলো-বাতাসপূর্ণ শান্ত ও নিরিবিলি পরিবেশ। লাইনের গ্যাস, পানি এবং জেনারেটরের ব্যাকআপ সুবিধা রয়েছে।",
		rent: 9e3,
		unit: "month",
		available: "nov",
		postedLabel: "Posted 2h ago",
		postedAt: BASE - 2 * H,
		photos: [
			PHOTOS.bed,
			PHOTOS.balcony,
			PHOTOS.kitchen,
			PHOTOS.living,
			PHOTOS.building,
			PHOTOS.shared
		],
		phone: "01618900015",
		propertyTypeBn: "সাবলেট / ১ রুম ভাড়া",
		propertyTypeEn: "Sublet - 1 Room"
	},
	{
		id: "farhana",
		hostName: "ফারহানা ইয়াসমিন",
		initials: "ফ",
		verified: false,
		active: false,
		kind: "female-hostel",
		tenant: "female",
		area: "r8a",
		addressLine: "Dhaka · Dhanmondi · Road 8A",
		locationBn: "ঢাকা , ধানমন্ডি , ধানমন্ডি ৮/এ",
		description: "ধানমন্ডি ৮/এ ৪র্থ ও ৫ম তলায় নারীদের জন্য সম্পূর্ণ নিরাপদ ও মানসম্মত পরিবেশ। সিঙ্গেল ও ডাবল সিট খালি আছে। সার্বক্ষণিক মহিলা সিকিউরিটি গার্ড, নিয়মিত ও উন্নত খাবারের ব্যবস্থা।",
		rent: 6200,
		unit: "seat",
		available: "current",
		postedLabel: "Posted 1d ago",
		postedAt: BASE - 24 * H,
		photos: [
			PHOTOS.building,
			PHOTOS.bed,
			PHOTOS.shared,
			PHOTOS.kitchen
		],
		phone: "01911620088",
		propertyTypeBn: "মহিলা হোস্টেল / সিট",
		propertyTypeEn: "Female Hostel"
	},
	{
		id: "rezaul",
		hostName: "রেজাউল করিম",
		initials: "রে",
		verified: false,
		active: false,
		kind: "office",
		tenant: "anyone",
		area: "satmasjid",
		addressLine: "Dhaka · Dhanmondi · Satmasjid Road",
		locationBn: "ঢাকা , ধানমন্ডি , সাতমসজিদ রোড",
		description: "সাতমসজিদ রোড সংলগ্ন প্রাইম লোকেশনে ১২০০ স্কয়ার ফিটের আধুনিক ডেকোরেশন অফিস স্পেস। কনফারেন্স রুম, কেবিন, লিফট ও কার পার্কিং সুবিধা সহ।",
		rent: 55e3,
		unit: "flat",
		available: "dec",
		postedLabel: "Posted 2d ago",
		postedAt: BASE - 48 * H,
		photos: [
			PHOTOS.avenue,
			PHOTOS.office,
			PHOTOS.building,
			PHOTOS.glass,
			PHOTOS.street,
			PHOTOS.balcony
		],
		phone: "01777550066",
		propertyTypeBn: "অফিস স্পেস",
		propertyTypeEn: "Office Space"
	},
	{
		id: "nusrat",
		hostName: "নুসরাত জাহান",
		initials: "ন",
		verified: true,
		active: true,
		kind: "family-flat",
		tenant: "family",
		area: "r27",
		addressLine: "Dhaka · Dhanmondi · Road 27",
		locationBn: "ঢাকা , ধানমন্ডি , ধানমন্ডি ২৭",
		description: "ধানমন্ডি ২৭-এ ২ বেডের পরিবারের জন্য ছোট কিন্তু আলো-বাতাসযুক্ত ফ্ল্যাট। ৩য় তলা, লিফট, গ্যাস ও জেনারেটর সুবিধা আছে। স্কুল ও লেকের কাছে।",
		rent: 18e3,
		unit: "month",
		available: "dec",
		postedLabel: "Posted 6h ago",
		postedAt: BASE - 6 * H,
		photos: [
			PHOTOS.kitchen,
			PHOTOS.living,
			PHOTOS.bed,
			PHOTOS.balcony
		],
		phone: "01813445566",
		propertyTypeBn: "ফ্যামিলি ফ্ল্যাট",
		propertyTypeEn: "Family Flat"
	},
	{
		id: "mahmud",
		hostName: "মাহমুদ হাসান",
		initials: "ম",
		verified: false,
		active: false,
		kind: "bachelor-mess",
		tenant: "male",
		area: "gohar",
		addressLine: "Dhaka · Dhanmondi · Goharnagar 32",
		locationBn: "ঢাকা , ধানমন্ডি , গোহরনগর",
		description: "ধানমন্ডি ৩২ ও গোহরনগরের কাছে ব্যাচেলরদের জন্য সিট। খাবার ও ওয়াইফাইসহ, চলতি মাসেই উঠা যাবে। শংকর বাসস্ট্যান্ড থেকে হেঁটে কয়েক মিনিট।",
		rent: 5500,
		unit: "seat",
		available: "current",
		postedLabel: "Posted 8h ago",
		postedAt: BASE - 8 * H,
		photos: [
			PHOTOS.shared,
			PHOTOS.street,
			PHOTOS.bed,
			PHOTOS.kitchen
		],
		phone: "01622334455",
		propertyTypeBn: "ব্যাচেলর মেস / সিট",
		propertyTypeEn: "Bachelor Mess"
	},
	{
		id: "tanvir",
		hostName: "তানভীর আহমেদ",
		initials: "ত",
		verified: false,
		active: true,
		kind: "sublet",
		tenant: "male",
		area: "r1",
		addressLine: "Dhaka · Dhanmondi · Road 1/A, Zigatola",
		locationBn: "ঢাকা , ধানমন্ডি , জিগাতলা",
		description: "জিগাতলা ও ধানমন্ডি ১/এ-তে একটি সিঙ্গেল রুম সাবলেট। পুরুষ ভাড়াটিয়ার জন্য। শান্ত এলাকা, গ্যাস ও পানি লাইনে। জেনারেটর ব্যাকআপ আছে।",
		rent: 7500,
		unit: "month",
		available: "jan",
		postedLabel: "Posted 1d ago",
		postedAt: BASE - 30 * H,
		photos: [
			PHOTOS.bed,
			PHOTOS.living,
			PHOTOS.balcony,
			PHOTOS.kitchen,
			PHOTOS.building
		],
		phone: "01744556677",
		propertyTypeBn: "সাবলেট / ১ রুম ভাড়া",
		propertyTypeEn: "Sublet - 1 Room"
	},
	{
		id: "sharmin",
		hostName: "শারমিন আক্তার",
		initials: "শ",
		verified: true,
		active: false,
		kind: "female-hostel",
		tenant: "female",
		area: "r8a",
		addressLine: "Dhaka · Dhanmondi · Road 8A",
		locationBn: "ঢাকা , ধানমন্ডি , ধানমন্ডি ৮/এ",
		description: "ধানমন্ডি ৮/এ মহিলা হোস্টেলে ডাবল সিট খালি। ওয়ার্ডেন ও সিকিউরিটি আছে, খাবারের ব্যবস্থা সহ। বিশ্ববিদ্যালয়গামী শিক্ষার্থীদের জন্য সুবিধাজনক।",
		rent: 7e3,
		unit: "seat",
		available: "current",
		postedLabel: "Posted 12h ago",
		postedAt: BASE - 12 * H,
		photos: [
			PHOTOS.shared,
			PHOTOS.building,
			PHOTOS.bed,
			PHOTOS.kitchen,
			PHOTOS.balcony
		],
		phone: "01988776655",
		propertyTypeBn: "মহিলা হোস্টেল / সিট",
		propertyTypeEn: "Female Hostel"
	}
];
function areaLabel(id) {
	return AREAS.find((area) => area.id === id)?.label ?? id;
}
function rentSuffix(unit) {
	if (unit === "month") return "/ মাস";
	if (unit === "seat") return "/ সিট";
	return "/";
}
function cloneSeed() {
	return SEED.map((listing) => ({
		...listing,
		photos: [...listing.photos]
	}));
}
function inBudget(rent, budget) {
	if (budget === "all") return true;
	if (budget === "8-15") return rent >= 8e3 && rent <= 15e3;
	if (budget === "15-25") return rent >= 15e3 && rent <= 25e3;
	if (budget === "25-35") return rent >= 25e3 && rent <= 35e3;
	if (budget === "35+") return rent >= 35e3;
	return rent >= 8e3 && rent <= 35e3;
}
function queryMatches(listing, query) {
	const q = query.trim();
	if (!q || q === "ধানমন্ডি রোড ২৭, ৯/এ, ১৫, শংকর") return true;
	return [
		listing.hostName,
		listing.addressLine,
		listing.locationBn,
		listing.description,
		listing.propertyTypeBn,
		listing.propertyTypeEn,
		areaLabel(listing.area),
		KIND_META[listing.kind].label
	].join(" ").toLowerCase().includes(q.toLowerCase());
}
function filterListings(listings, browse) {
	let rows = listings.filter((listing) => browse.area === "all" || listing.area === browse.area);
	const applied = browse.applied;
	if (applied) rows = rows.filter((listing) => {
		if (!queryMatches(listing, applied.query)) return false;
		if (applied.kind !== "all" && listing.kind !== applied.kind) return false;
		if (applied.tenant !== "all" && listing.tenant !== "anyone" && listing.tenant !== applied.tenant) return false;
		if (!inBudget(listing.rent, applied.budget)) return false;
		if (applied.available !== "from-now" && listing.available !== applied.available) return false;
		return true;
	});
	if (browse.sort === "rent-asc") return [...rows].sort((a, b) => a.rent - b.rent);
	if (browse.sort === "rent-desc") return [...rows].sort((a, b) => b.rent - a.rent);
	return rows;
}
var STORAGE_KEY = "dhanmondi-rooms-v1";
function isListing(value) {
	if (!value || typeof value !== "object") return false;
	const listing = value;
	return typeof listing.id === "string" && typeof listing.hostName === "string" && Array.isArray(listing.photos) && typeof listing.rent === "number" && typeof listing.kind === "string";
}
var useRooms = create((set) => ({
	listings: cloneSeed(),
	savedIds: [],
	profile: {
		name: "",
		phone: ""
	},
	hydrated: false,
	area: "all",
	sort: "featured",
	applied: null,
	visibleCount: 6,
	setArea: (area) => set({
		area,
		visibleCount: 6
	}),
	setSort: (sort) => set({
		sort,
		visibleCount: 6
	}),
	applySearch: (applied) => set({
		applied,
		visibleCount: 6
	}),
	resetBrowse: () => set({
		area: "all",
		sort: "featured",
		applied: null,
		visibleCount: 6
	}),
	loadMore: () => set((state) => ({ visibleCount: state.visibleCount + 6 })),
	addListing: (listing) => set((state) => ({ listings: [listing, ...state.listings] })),
	updateListing: (id, listing) => set((state) => ({ listings: state.listings.map((item) => item.id === id ? listing : item) })),
	deleteListing: (id) => set((state) => ({
		listings: state.listings.filter((item) => item.id !== id),
		savedIds: state.savedIds.filter((saved) => saved !== id)
	})),
	toggleSaved: (id) => set((state) => ({ savedIds: state.savedIds.includes(id) ? state.savedIds.filter((saved) => saved !== id) : [...state.savedIds, id] })),
	setProfile: (profile) => set({ profile }),
	resetDemo: () => set((state) => {
		const seedIds = new Set(cloneSeed().map((listing) => listing.id));
		return { listings: [...state.listings.filter((listing) => listing.mine && !seedIds.has(listing.id)), ...cloneSeed()] };
	})
}));
var started = false;
function startPersistence() {
	if (started || typeof window === "undefined") return;
	started = true;
	useRooms.subscribe((state, prev) => {
		if (!state.hydrated) return;
		if (state.listings === prev.listings && state.savedIds === prev.savedIds && state.profile === prev.profile) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			v: 1,
			listings: state.listings,
			savedIds: state.savedIds,
			profile: state.profile
		}));
	});
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const data = JSON.parse(raw);
			if (data.v === 1 && Array.isArray(data.listings)) {
				const listings = data.listings.filter(isListing);
				useRooms.setState({
					listings,
					savedIds: Array.isArray(data.savedIds) ? data.savedIds.filter((id) => typeof id === "string") : [],
					profile: {
						name: typeof data.profile?.name === "string" ? data.profile.name : "",
						phone: typeof data.profile?.phone === "string" ? data.profile.phone : ""
					},
					hydrated: true
				});
				return;
			}
		}
	} catch {}
	useRooms.setState({ hydrated: true });
}
var styles_default = "/assets/styles-CAs4FtDg.css";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Dhanmondi Rooms — ধানমন্ডিতে বাসা, মেস ও সাবলেট" },
			{
				name: "description",
				content: "ধানমন্ডিতে বাসা, মেস, সাবলেট ও রুমমেট খুঁজুন। যাচাইকৃত লিস্টিং, সরাসরি হোস্টের সাথে যোগাযোগ, ব্রোকারেজ ছাড়াই বিজ্ঞাপন।"
			},
			{
				name: "theme-color",
				content: "#1f5bff"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	(0, import_react.useEffect)(() => {
		startPersistence();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "bn",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "top-center" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$5 = () => import("./routes-DuF_5kKU.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./account-DIDVqrDj.mjs");
var Route$4 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./post-C4_1KJjq.mjs");
var Route$3 = createFileRoute("/post")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./info._slug-CoYNr8uI.mjs");
var Route$2 = createFileRoute("/info/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./listing._id-CUqZ5v1b.mjs");
var Route$1 = createFileRoute("/listing/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./post._id-DrqHvfTO.mjs");
var Route = createFileRoute("/post/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AccountRoute = Route$4.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$6
});
var PostRoute = Route$3.update({
	id: "/post",
	path: "/post",
	getParentRoute: () => Route$6
});
var InfoSlugRoute = Route$2.update({
	id: "/info/$slug",
	path: "/info/$slug",
	getParentRoute: () => Route$6
});
var ListingIdRoute = Route$1.update({
	id: "/listing/$id",
	path: "/listing/$id",
	getParentRoute: () => Route$6
});
var PostRouteChildren = { PostIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => PostRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	PostRoute: PostRoute._addFileChildren(PostRouteChildren),
	InfoSlugRoute,
	ListingIdRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useRooms as a, KIND_META as c, TENANT_CARDS as d, areaLabel as f, Route$2 as i, PHOTO_CHOICES as l, rentSuffix as m, Route as n, AREAS as o, filterListings as p, Route$1 as r, AVAILABLE_LABEL as s, router_exports as t, SHOWCASE_DRAFT as u };
