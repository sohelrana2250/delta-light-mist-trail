import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { O as BadgeCheck, S as ChevronRight, _ as Image, b as Eye, c as RefreshCw, f as MapPin, s as Search, t as X, w as ChevronDown, x as Clock } from "../_libs/lucide-react.mjs";
import { a as useRooms, c as KIND_META, m as rentSuffix, o as AREAS, p as filterListings, s as AVAILABLE_LABEL, u as SHOWCASE_DRAFT } from "./router-h9ZDsfHi.mjs";
import { t as PageShell } from "./chrome-B7j_gPyU.mjs";
import { n as formatBdt, o as toBnDigits, t as cn } from "./utils-Bm30caxy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DuF_5kKU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ListingCard({ listing }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const photo = listing.photos[index] ?? listing.photos[0];
	const kind = KIND_META[listing.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-lift flex h-full flex-col rounded-3xl bg-surface p-4 shadow-md ring-1 ring-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-primary-ink",
						children: listing.initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate text-base font-extrabold",
								children: listing.hostName
							}), listing.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
								className: "size-4 shrink-0 text-primary",
								"aria-label": "যাচাইকৃত"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 flex items-center gap-1 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), listing.postedLabel]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", kind.badge),
						children: kind.label
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-center gap-1 text-sm font-medium text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: listing.addressLine
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-3 text-sm leading-relaxed text-muted",
				children: listing.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-3 overflow-hidden rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/listing/$id",
						params: { id: listing.id },
						tabIndex: -1,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo,
							alt: "",
							className: "aspect-video w-full object-cover"
						})
					}),
					listing.photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "পরের ছবি",
						className: "absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-md",
						onClick: () => setIndex((current) => (current + 1) % listing.photos.length),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-primary-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5" }),
							index + 1,
							"/",
							listing.photos.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-faint",
					children: "RENT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xl font-extrabold text-ink",
					children: [formatBdt(listing.rent), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold text-muted",
						children: [" ", rentSuffix(listing.unit)]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wide text-faint",
						children: "AVAILABLE FROM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary",
						children: AVAILABLE_LABEL[listing.available]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/listing/$id",
				params: { id: listing.id },
				className: "mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-ink hover:bg-primary-strong",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), "বিস্তারিত বিবরণ ও যোগাযোগ"]
			})
		]
	});
}
var KINDS = [
	{
		value: "family-flat",
		label: KIND_META["family-flat"].searchLabel
	},
	{
		value: "all",
		label: "সব ধরন"
	},
	{
		value: "bachelor-mess",
		label: KIND_META["bachelor-mess"].searchLabel
	},
	{
		value: "sublet",
		label: KIND_META.sublet.searchLabel
	},
	{
		value: "female-hostel",
		label: KIND_META["female-hostel"].searchLabel
	},
	{
		value: "office",
		label: KIND_META.office.searchLabel
	}
];
var TENANTS = [
	{
		value: "all",
		label: "যে কেউ (All)"
	},
	{
		value: "male",
		label: "পুরুষ (Male)"
	},
	{
		value: "female",
		label: "মহিলা (Female)"
	},
	{
		value: "family",
		label: "ফ্যামিলি"
	}
];
var BUDGETS = [
	{
		value: "8-35",
		label: `${bdt(8e3)} - ${bdt(35e3)}`
	},
	{
		value: "all",
		label: "সব বাজেট"
	},
	{
		value: "8-15",
		label: `${bdt(8e3)} - ${bdt(15e3)}`
	},
	{
		value: "15-25",
		label: `${bdt(15e3)} - ${bdt(25e3)}`
	},
	{
		value: "25-35",
		label: `${bdt(25e3)} - ${bdt(35e3)}`
	},
	{
		value: "35+",
		label: `${bdt(35e3)}+`
	}
];
var DATES = [
	{
		value: "from-now",
		label: "চলতি মাস হতে"
	},
	{
		value: "current",
		label: "শুধু চলতি মাস"
	},
	{
		value: "nov",
		label: "১ নভেম্বর হতে"
	},
	{
		value: "dec",
		label: "১ ডিসেম্বর হতে"
	},
	{
		value: "jan",
		label: "১ জানুয়ারি হতে"
	}
];
function bdt(amount) {
	return `৳${toBnDigits(amount.toLocaleString("en-US"))}`;
}
function SearchPanel({ draft, onChange, onSubmit }) {
	function submit(event) {
		event.preventDefault();
		onSubmit();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "rounded-3xl bg-surface p-2 shadow-md ring-1 ring-line lg:flex lg:items-stretch",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative flex min-w-0 flex-1 flex-col justify-center border-b border-line px-3 py-2 lg:border-b-0 lg:border-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium text-muted",
					children: "এলাকা বা রোড নং"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.query,
							onChange: (event) => onChange({
								...draft,
								query: event.target.value
							}),
							placeholder: "রোড, এলাকা বা নাম লিখুন",
							className: "w-full min-w-0 bg-transparent text-sm font-semibold text-ink outline-none"
						}),
						draft.query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "এলাকা মুছুন",
							className: "grid size-7 shrink-0 place-items-center rounded-full text-faint hover:bg-chip hover:text-ink",
							onClick: () => onChange({
								...draft,
								query: ""
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "ভাড়ার ধরন",
				value: draft.kind,
				options: KINDS,
				onChange: (kind) => onChange({
					...draft,
					kind
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "ভাড়াটিয়া",
				value: draft.tenant,
				options: TENANTS,
				onChange: (tenant) => onChange({
					...draft,
					tenant
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "বাজেট (মাসিক)",
				value: draft.budget,
				options: BUDGETS,
				onChange: (budget) => onChange({
					...draft,
					budget
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "কবে থেকে",
				value: draft.available,
				options: DATES.map((item) => ({
					value: item.value,
					label: item.label
				})),
				onChange: (available) => onChange({
					...draft,
					available
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "m-1 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-ink hover:bg-primary-strong lg:self-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sm:hidden",
						children: "Search Rooms / "
					}),
					"বাসা খুঁজুন"
				]
			})
		]
	});
}
function Field({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative flex min-w-0 flex-1 flex-col justify-center border-b border-line px-3 py-2 lg:border-b-0 lg:border-r lg:border-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "mt-1 w-full appearance-none truncate bg-transparent pr-6 text-sm font-semibold text-ink outline-none",
				children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: option.value,
					children: option.label
				}, option.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint" })
		]
	});
}
function Home() {
	const listings = useRooms((state) => state.listings);
	const area = useRooms((state) => state.area);
	const sort = useRooms((state) => state.sort);
	const applied = useRooms((state) => state.applied);
	const visibleCount = useRooms((state) => state.visibleCount);
	const setArea = useRooms((state) => state.setArea);
	const setSort = useRooms((state) => state.setSort);
	const applySearch = useRooms((state) => state.applySearch);
	const resetBrowse = useRooms((state) => state.resetBrowse);
	const loadMore = useRooms((state) => state.loadMore);
	const [draft, setDraft] = (0, import_react.useState)(SHOWCASE_DRAFT);
	const filtered = (0, import_react.useMemo)(() => filterListings(listings, {
		area,
		sort,
		applied
	}), [
		listings,
		area,
		sort,
		applied
	]);
	const shown = filtered.slice(0, visibleCount);
	const filtering = applied !== null || area !== "all" || sort !== "featured";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-4 pt-8 pb-2 sm:pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mx-auto max-w-4xl text-center text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl",
				children: "ধানমন্ডিতে বাসা, মেস ও সাবলেট খুঁজুন"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 sm:mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, {
					draft,
					onChange: setDraft,
					onSubmit: () => {
						applySearch(draft);
						document.getElementById("listings")?.scrollIntoView({
							behavior: "smooth",
							block: "start"
						});
					}
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-4 w-full max-w-6xl px-4 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-primary px-5 py-5 text-primary-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-extrabold leading-snug",
					children: "ধানমন্ডির এলাকায় খুঁজুন আপনার নতুন বাসা ও রুম"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2 text-xs font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary-ink/15 px-3 py-1",
						children: "যাচাইকৃত মালিকের সাথে সরাসরি"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary-ink/15 px-3 py-1",
						children: "ফ্রি বিজ্ঞাপন"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "listings",
			className: "mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold sm:text-2xl",
						children: "ধানমন্ডি এলাকার টু-লেট লিস্টিং"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-surface px-3 text-sm ring-1 ring-line sm:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-muted",
								children: "সর্ট করুন:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (event) => setSort(event.target.value),
								className: "min-w-0 flex-1 bg-transparent font-bold text-ink outline-none sm:max-w-56",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "featured",
										children: "নতুন লিস্টিং আগে (Newest first)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "rent-asc",
										children: "ভাড়া: কম থেকে বেশি"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "rent-desc",
										children: "ভাড়া: বেশি থেকে কম"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "ফিল্টার রিসেট",
							className: "grid size-11 place-items-center rounded-full bg-surface text-muted ring-1 ring-line hover:text-primary",
							onClick: () => {
								setDraft(SHOWCASE_DRAFT);
								resetBrowse();
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chip-row mt-4 flex gap-2 overflow-x-auto pb-1",
					children: AREAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": area === item.id,
						onClick: () => setArea(item.id),
						className: cn("shrink-0 min-h-11 rounded-full px-4 text-sm font-bold", area === item.id ? "bg-primary text-primary-ink" : "bg-surface text-ink ring-1 ring-line"),
						children: item.label
					}, item.id))
				}),
				filtering && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm font-semibold text-muted",
					children: [toBnDigits(filtered.length), "টি বাসা এই ফিল্টারে"]
				}),
				shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-3xl bg-surface px-6 py-16 text-center ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-extrabold",
							children: "এই ফিল্টারে কোনো বাসা পাওয়া যায়নি"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "এলাকা, বাজেট বা ভাড়ার ধরন বদলে আবার খুঁজুন।"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-ink",
							onClick: () => {
								setDraft({
									...SHOWCASE_DRAFT,
									query: "",
									kind: "all",
									budget: "all"
								});
								resetBrowse();
							},
							children: "সব লিস্টিং দেখুন"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3",
					children: shown.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
				}),
				shown.length < filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: loadMore,
						className: "inline-flex min-h-12 items-center gap-2 rounded-full bg-surface px-6 text-sm font-bold text-primary ring-1 ring-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sm:hidden",
								children: "আরও লিস্টিং দেখুন (Show More Listings)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "আরও বাসা ও রুম দেখুন (Load More Rooms)"
							})
						]
					})
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
