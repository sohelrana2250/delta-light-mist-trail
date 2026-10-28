import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as ChevronRight, f as MapPin, g as Instagram, l as Plus, m as Linkedin, p as Mail, r as UserRound, u as Phone, v as House, y as Facebook } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useRooms } from "./router-h9ZDsfHi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chrome-B7j_gPyU.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-lg font-extrabold leading-none tracking-tight",
				children: "Dhanmondi Rooms"
			}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block truncate text-xs font-semibold uppercase tracking-wide text-muted",
				children: "Find your room, in Dhanmondi"
			})]
		})]
	});
}
function SiteHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/account",
						className: "hidden min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-primary-soft py-1 pl-1 pr-4 text-primary sm:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-full bg-primary text-primary-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-left leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-extrabold tracking-wide",
								children: "MY ACCOUNT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-semibold",
								children: "অ্যাকাউন্ট / লগইন"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/post",
						className: "hidden min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-primary-ink sm:inline-flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
							"বিজ্ঞাপন দিন",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-whatsapp px-2 py-0.5 text-xs font-extrabold",
								children: "FREE"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						"aria-label": "আমার অ্যাকাউন্ট",
						className: "grid size-11 place-items-center rounded-full bg-primary text-primary-ink sm:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" })
					})
				]
			})]
		})
	});
}
function PostFab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/post",
		className: "fixed bottom-4 right-4 z-30 flex max-w-xs items-center gap-2 rounded-full bg-primary py-2 pl-2 pr-3 text-primary-ink shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-full bg-primary-ink/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 text-left text-xs font-bold leading-tight sm:text-sm",
				children: ["বাকি বাসা খুঁজে না পেলে", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block",
					children: "আপনারও বাসা লিস্ট করুন"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 rounded-full bg-whatsapp px-2 py-0.5 text-xs font-extrabold",
				children: "FREE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0" })
		]
	});
}
function FooterLink({ children, to, area }) {
	const setArea = useRooms((state) => state.setArea);
	const navigate = useNavigate();
	if (area) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "block py-1 text-left text-sm font-medium text-muted hover:text-primary",
		onClick: () => {
			setArea(area);
			navigate({ to: "/" });
		},
		children
	});
	if (!to) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "block py-1 text-sm font-medium text-muted hover:text-primary",
		children
	});
}
function SiteFooter({ pad = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-16 border-t border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
					children: "Need a room, flat, sublet or roommate in Dhanmondi, Dhaka? Browse 100% verified listings, call the host directly, or post your own room with zero brokerage."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-extrabold",
						children: "জরুরি লিংক"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								to: "/",
								children: "হোম পেজ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "listings",
								className: "block py-1 text-sm font-medium text-muted hover:text-primary",
								children: "বাসা খুঁজুন"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								to: "/post",
								children: "বিজ্ঞাপন দিন (ফ্রি)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "guide",
								children: "ভাড়াটিয়া নির্দেশিকা"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "safety",
								children: "সেফটি টিপস"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-extrabold",
						children: "জনপ্রিয় এলাকা"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								area: "r27",
								children: "ধানমন্ডি ২৭ নম্বর"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								area: "r9a",
								children: "ধানমন্ডি ৯/এ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								area: "r15",
								children: "ধানমন্ডি ১৫ রোড"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								area: "r8a",
								children: "ধানমন্ডি ৮/এ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								area: "shankar",
								children: "শংকর ও পশ্চিম ধানমন্ডি"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/info/$slug",
								params: { slug: "areas" },
								className: "mt-1 block py-1 text-sm font-bold text-primary",
								children: "সকল রোড দেখুন →"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-extrabold",
						children: "আইন ও নীতিবলী"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "terms",
								children: "ব্যবহারের শর্তাবলী"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "privacy",
								children: "গোপনীয়তা নীতি"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "ads",
								children: "বিজ্ঞাপন ও বাড়িওয়ালা নীতি"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "fraud",
								children: "প্রতারণা প্রতিরোধ নীতি"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoLink, {
								slug: "community",
								children: "কমিউনিটি গাইডলাইন"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-extrabold",
							children: "যোগাযোগ ও সাপোর্ট"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 size-4 shrink-0 text-primary" }), "হেল্পলাইন: ০৯৬৯৬-XXXXXXX"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "font-medium hover:text-primary",
										href: "mailto:support@dhanmondirooms.bd",
										children: "support@dhanmondirooms.bd"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-primary" }), "ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-2",
							children: [
								{
									icon: Facebook,
									name: "Facebook"
								},
								{
									icon: Instagram,
									name: "Instagram"
								},
								{
									icon: Linkedin,
									name: "LinkedIn"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": item.name,
								className: "grid size-10 place-items-center rounded-full bg-chip text-ink hover:bg-primary-soft hover:text-primary",
								onClick: () => toast("সোশ্যাল পেজ শীঘ্রই যুক্ত হবে"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" })
							}, item.name))
						})
					] })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mx-auto w-full max-w-6xl px-4 py-4 text-xs text-faint ${pad ? "pb-24" : "pb-4"}`,
				children: "© ২০২৬ Dhanmondi Rooms. সর্বস্বত্ব সংরক্ষিত"
			})
		})]
	});
}
function InfoLink({ slug, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/info/$slug",
		params: { slug },
		className: "block py-1 text-sm font-medium text-muted hover:text-primary",
		children
	});
}
function PageShell({ children, fab = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			fab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostFab, {}) : null
		]
	});
}
//#endregion
export { SiteFooter as n, SiteHeader as r, PageShell as t };
