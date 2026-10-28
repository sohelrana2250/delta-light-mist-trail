import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Bookmark, a as Trash2, d as Pencil } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useRooms, c as KIND_META, m as rentSuffix } from "./router-h9ZDsfHi.mjs";
import { t as PageShell } from "./chrome-B7j_gPyU.mjs";
import { t as Modal } from "./confirm-dialog-C5dD2f00.mjs";
import { n as formatBdt, t as cn } from "./utils-Bm30caxy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DIDVqrDj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const profile = useRooms((state) => state.profile);
	const hydrated = useRooms((state) => state.hydrated);
	const setProfile = useRooms((state) => state.setProfile);
	const listings = useRooms((state) => state.listings);
	const savedIds = useRooms((state) => state.savedIds);
	const deleteListing = useRooms((state) => state.deleteListing);
	const resetDemo = useRooms((state) => state.resetDemo);
	const [name, setName] = (0, import_react.useState)(profile.name);
	const [phone, setPhone] = (0, import_react.useState)(profile.phone);
	const [tab, setTab] = (0, import_react.useState)("manage");
	const [pending, setPending] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		setName(profile.name);
		setPhone(profile.phone);
	}, [
		hydrated,
		profile.name,
		profile.phone
	]);
	const saved = listings.filter((listing) => savedIds.includes(listing.id));
	const rows = tab === "saved" ? saved : listings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-primary",
				children: "MY ACCOUNT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-extrabold",
				children: "আমার অ্যাকাউন্ট"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "এটি এই ব্রাউজারের লোকাল প্রোফাইল। পাসওয়ার্ড লাগে না — নাম ও নম্বর সেভ থাকবে, বিজ্ঞাপন যোগ, এডিট বা ডিলিট করা যাবে।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 rounded-3xl bg-surface p-5 shadow-md ring-1 ring-line",
				onSubmit: (event) => {
					event.preventDefault();
					setProfile({
						name: name.trim(),
						phone: phone.replace(/\D/g, "")
					});
					toast.success("প্রোফাইল সেভ হয়েছে");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-bold",
						children: ["নাম", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "আপনার নাম",
							className: "mt-1 w-full rounded-2xl bg-chip px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm font-bold",
						children: ["মোবাইল", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: phone,
							onChange: (event) => setPhone(event.target.value),
							placeholder: "017XXXXXXXX",
							className: "mt-1 w-full rounded-2xl bg-chip px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-ink",
					children: "প্রোফাইল সেভ"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
					active: tab === "manage",
					onClick: () => setTab("manage"),
					children: [
						"সব বিজ্ঞাপন (",
						listings.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
					active: tab === "saved",
					onClick: () => setTab("saved"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }),
						" সেভ (",
						saved.length,
						")"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 space-y-3",
				children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-3xl bg-surface px-5 py-10 text-center text-sm text-muted ring-1 ring-line",
					children: tab === "saved" ? "এখনো কিছু সেভ করা হয়নি। ডিটেইলস পেজে বুকমার্ক চাপুন।" : "কোনো বিজ্ঞাপন নেই।"
				}), rows.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-2xl bg-surface p-3 ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: listing.photos[0],
							alt: "",
							className: "size-16 shrink-0 rounded-xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate font-extrabold",
									children: [listing.hostName, listing.mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 text-xs font-bold text-primary",
										children: "আপনার"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: listing.addressLine
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-bold text-primary",
									children: [
										formatBdt(listing.rent),
										" ",
										rentSuffix(listing.unit),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 font-semibold text-muted",
											children: KIND_META[listing.kind].label
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/post/$id",
							params: { id: listing.id },
							"aria-label": "সম্পাদনা",
							className: "grid size-11 place-items-center rounded-full bg-chip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "মুছুন",
							className: "grid size-11 place-items-center rounded-full bg-danger-soft text-danger",
							onClick: () => setPending(listing),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}, listing.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/post",
					className: "inline-flex min-h-11 items-center rounded-xl bg-ink px-4 text-sm font-bold text-primary-ink",
					children: "নতুন বিজ্ঞাপন"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center rounded-xl bg-surface px-4 text-sm font-bold ring-1 ring-line",
					onClick: () => {
						resetDemo();
						toast.success("নমুনা লিস্টিং ফিরিয়ে আনা হয়েছে");
					},
					children: "নমুনা লিস্টিং রিসেট"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: Boolean(pending),
		title: "এই বিজ্ঞাপন মুছে ফেলবেন?",
		description: pending ? `${pending.hostName} — ${pending.addressLine}` : "",
		onClose: () => setPending(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 flex-1 rounded-xl bg-chip font-bold",
				onClick: () => setPending(null),
				children: "না, থাক"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 flex-1 rounded-xl bg-danger font-bold text-primary-ink",
				onClick: () => {
					if (!pending) return;
					deleteListing(pending.id);
					setPending(null);
					toast.success("বিজ্ঞাপন মুছে ফেলা হয়েছে");
					navigate({ to: "/account" });
				},
				children: "হ্যাঁ, মুছুন"
			})]
		})
	})] });
}
function TabButton({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold", active ? "bg-primary text-primary-ink" : "bg-surface text-ink ring-1 ring-line"),
		children
	});
}
//#endregion
export { AccountPage as component };
