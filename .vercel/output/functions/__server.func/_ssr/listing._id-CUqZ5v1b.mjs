import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as AlignLeft, C as ChevronLeft, D as Bookmark, E as Building2, O as BadgeCheck, S as ChevronRight, T as Camera, a as Trash2, d as Pencil, f as MapPin, h as LayoutGrid, k as ArrowLeft, n as Users, o as Share2, r as UserRound, u as Phone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useRooms, d as TENANT_CARDS, m as rentSuffix, r as Route$1, s as AVAILABLE_LABEL } from "./router-h9ZDsfHi.mjs";
import { n as SiteFooter, r as SiteHeader } from "./chrome-B7j_gPyU.mjs";
import { t as Modal } from "./confirm-dialog-C5dD2f00.mjs";
import { a as telLink, n as formatBdt, o as toBnDigits, r as formatPhone, s as waLink, t as cn } from "./utils-Bm30caxy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing._id-CUqZ5v1b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WhatsAppIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className,
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.6 4.1c.6.3 1.1.4 1.5.6a3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" })
	});
}
function ListingDetail() {
	const { id } = Route$1.useParams();
	const listing = useRooms((state) => state.listings.find((item) => item.id === id));
	const hydrated = useRooms((state) => state.hydrated);
	const saved = useRooms((state) => state.savedIds.includes(id));
	const toggleSaved = useRooms((state) => state.toggleSaved);
	const deleteListing = useRooms((state) => state.deleteListing);
	const navigate = useNavigate();
	const [photo, setPhoto] = (0, import_react.useState)(0);
	const [callOpen, setCallOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setPhoto(0);
	}, [id]);
	if (!listing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-extrabold",
					children: hydrated ? "এই বিজ্ঞাপনটি নেই" : "লোড হচ্ছে"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: hydrated ? "লিস্টিং সরানো হয়েছে অথবা লিংকটি ঠিক নয়।" : "এক মুহূর্ত অপেক্ষা করুন।"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex min-h-11 items-center font-bold text-primary",
					children: "সব বাসা দেখুন"
				})
			]
		})]
	});
	const total = listing.photos.length;
	const current = listing.photos[photo] ?? listing.photos[0];
	const message = `আসসালামু আলাইকুম, আমি Dhanmondi Rooms-এ আপনার বিজ্ঞাপন দেখেছি (${listing.addressLine})। ভাড়ার শর্ত জানতে চাই।`;
	async function share() {
		const url = window.location.href;
		const payload = {
			title: listing?.hostName ?? "Dhanmondi Rooms",
			text: listing?.addressLine ?? "",
			url
		};
		if (navigator.share) try {
			await navigator.share(payload);
			return;
		} catch {
			return;
		}
		await navigator.clipboard.writeText(url);
		toast.success("লিংক কপি হয়েছে");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas pb-24 lg:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 flex items-center gap-2 bg-canvas/95 px-3 py-3 backdrop-blur lg:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "পেছনে",
						className: "grid size-11 place-items-center rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "flex-1 text-lg font-extrabold",
						children: "Property Details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "শেয়ার",
						onClick: () => void share(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: saved ? "সেভ সরান" : "সেভ করুন",
						onClick: () => {
							toggleSaved(listing.id);
							toast.success(saved ? "সেভ থেকে সরানো হয়েছে" : "সেভ করা হয়েছে");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-5", saved && "fill-primary text-primary") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						"aria-label": "অ্যাকাউন্ট",
						className: "grid size-11 place-items-center rounded-full bg-primary text-primary-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid w-full max-w-6xl gap-6 px-4 py-4 lg:grid-cols-2 lg:py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl bg-chip",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: current,
							alt: `${listing.hostName} — ছবি ${photo + 1}`,
							className: "aspect-video w-full object-cover"
						}),
						total > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "আগের ছবি",
							className: "absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-md",
							onClick: () => setPhoto((index) => (index - 1 + total) % total),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "পরের ছবি",
							className: "absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-md",
							onClick: () => setPhoto((index) => (index + 1) % total),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-primary-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5" }),
								toBnDigits(photo + 1),
								"/",
								toBnDigits(total),
								" ছবি"
							]
						})
					]
				}), total > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chip-row mt-3 hidden gap-2 overflow-x-auto lg:flex",
					children: listing.photos.map((src, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `ছবি ${index + 1}`,
						onClick: () => setPhoto(index),
						className: cn("overflow-hidden rounded-xl ring-2", photo === index ? "ring-primary" : "ring-transparent"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "h-16 w-24 object-cover"
						})
					}, src + index))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center justify-between lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "inline-flex items-center gap-2 text-sm font-bold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " সব লিস্টিং"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: "শেয়ার",
									onClick: () => void share(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: saved ? "সেভ সরান" : "সেভ করুন",
									onClick: () => {
										toggleSaved(listing.id);
										toast.success(saved ? "সেভ থেকে সরানো হয়েছে" : "সেভ করা হয়েছে");
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-5", saved && "fill-primary text-primary") })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-sm ring-1 ring-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: listing.locationBn
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-2xl bg-surface p-4 ring-1 ring-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-muted",
									children: "মাসিক ভাড়া"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-2xl font-extrabold text-primary",
									children: [formatBdt(listing.rent), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-semibold text-muted",
										children: [" ", rentSuffix(listing.unit)]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-2xl bg-surface p-4 ring-1 ring-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-muted",
									children: "কবে থেকে উঠতে পারবেন"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 inline-flex rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-primary",
									children: AVAILABLE_LABEL[listing.available]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 ring-1 ring-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative grid size-12 place-items-center rounded-full bg-primary text-base font-extrabold text-primary-ink",
									children: [listing.initials, listing.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-0 bottom-0 size-3.5 rounded-full bg-whatsapp ring-2 ring-surface" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1 truncate font-extrabold",
										children: [listing.hostName, listing.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
											className: "size-4 text-primary",
											"aria-label": "যাচাইকৃত"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: listing.postedLabel
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "কল করুন",
									onClick: () => setCallOpen(true),
									className: "grid size-11 place-items-center rounded-full bg-chip text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 border-b border-line pb-2 text-lg font-extrabold text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlignLeft, { className: "size-5" }), " সংক্ষিপ্ত বিবরণ"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-ink",
							children: listing.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 border-b border-line pb-2 text-lg font-extrabold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-5" }), " বাসার ধরন ও ভাড়াটিয়া"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-bold",
								children: "বাসার ধরন (Property Type)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-3 rounded-2xl bg-chip px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-bold",
									children: [listing.propertyTypeBn, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-0.5 block font-semibold text-muted",
										children: [
											"(",
											listing.propertyTypeEn,
											")"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-bold",
								children: "ভাড়াটিয়ার ধরন (কারা উঠতে পারবেন)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-3 gap-2",
								children: TENANT_CARDS.map((card) => {
									const selected = card.id === "family" ? listing.tenant === "family" || listing.tenant === "anyone" : listing.tenant === card.id;
									const Icon = card.id === "family" ? Users : UserRound;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl px-2 py-3 text-center text-xs font-bold", selected ? "bg-primary text-primary-ink" : "bg-chip text-muted"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), card.label]
									}, card.id);
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/post/$id",
								params: { id: listing.id },
								className: "inline-flex min-h-11 items-center gap-2 rounded-xl bg-chip px-4 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " সম্পাদনা"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setDeleteOpen(true),
								className: "inline-flex min-h-11 items-center gap-2 rounded-xl bg-danger-soft px-4 text-sm font-bold text-danger",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " মুছে ফেলুন"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden gap-3 lg:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactButtons, {
								listing,
								message,
								onCall: () => setCallOpen(true)
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { pad: false })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-surface p-3 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactButtons, {
					listing,
					message,
					onCall: () => setCallOpen(true)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				open: callOpen,
				title: "সরাসরি কল",
				description: `${listing.hostName} — ${listing.addressLine}`,
				onClose: () => setCallOpen(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-2xl font-extrabold tracking-wide",
					children: toBnDigits(formatPhone(listing.phone))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: telLink(listing.phone),
					className: "mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " কল করুন"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: deleteOpen,
				title: "এই বিজ্ঞাপন মুছে ফেলবেন?",
				description: "মুছে ফেললে এই ব্রাউজারের তালিকা থেকে সরে যাবে। আবার নমুনা ডেটা অ্যাকাউন্ট পেজ থেকে ফেরানো যায়।",
				onClose: () => setDeleteOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-xl bg-chip font-bold",
						onClick: () => setDeleteOpen(false),
						children: "না, থাক"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-xl bg-danger font-bold text-primary-ink",
						onClick: () => {
							deleteListing(listing.id);
							toast.success("বিজ্ঞাপন মুছে ফেলা হয়েছে");
							navigate({ to: "/" });
						},
						children: "হ্যাঁ, মুছুন"
					})]
				})
			})
		]
	});
}
function IconButton({ children, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		className: "grid size-11 place-items-center rounded-full",
		children
	});
}
function ContactButtons({ listing, message, onCall }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: waLink(listing.phone, message),
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp font-bold text-primary-ink hover:bg-whatsapp-strong",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-5" }), " হোয়াটসঅ্যাপ"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onCall,
		className: "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-ink hover:bg-primary-strong",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-5" }), " সরাসরি কল"]
	})] });
}
//#endregion
export { ListingDetail as component };
