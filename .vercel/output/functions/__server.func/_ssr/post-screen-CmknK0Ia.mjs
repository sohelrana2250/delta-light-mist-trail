import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useRooms, c as KIND_META, f as areaLabel, l as PHOTO_CHOICES, o as AREAS, s as AVAILABLE_LABEL } from "./router-h9ZDsfHi.mjs";
import { t as PageShell } from "./chrome-B7j_gPyU.mjs";
import { t as Modal } from "./confirm-dialog-C5dD2f00.mjs";
import { i as initialsFrom, t as cn } from "./utils-Bm30caxy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-screen-CmknK0Ia.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "mt-1 w-full rounded-2xl bg-chip px-3 py-3 text-sm font-semibold text-ink outline-none ring-1 ring-transparent focus:ring-primary";
function blankForm(profile) {
	return {
		hostName: profile.name,
		phone: profile.phone,
		area: "r27",
		addressLine: "",
		kind: "family-flat",
		tenant: "family",
		rent: "",
		unit: "month",
		available: "current",
		description: "",
		photos: [PHOTO_CHOICES[0] ?? ""]
	};
}
function fromListing(listing) {
	return {
		hostName: listing.hostName,
		phone: listing.phone,
		area: listing.area,
		addressLine: listing.addressLine,
		kind: listing.kind,
		tenant: listing.tenant === "anyone" ? "family" : listing.tenant,
		rent: String(listing.rent),
		unit: listing.unit,
		available: listing.available,
		description: listing.description,
		photos: listing.photos
	};
}
function PostScreen({ id }) {
	const hydrated = useRooms((state) => state.hydrated);
	const existing = useRooms((state) => id ? state.listings.find((item) => item.id === id) : void 0);
	if (id && !existing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		fab: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl px-4 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-extrabold",
					children: hydrated ? "বিজ্ঞাপন পাওয়া যায়নি" : "লোড হচ্ছে"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: hydrated ? "এই লিস্টিং মুছে ফেলা হয়েছে বা লিংকটি ভুল।" : "সংরক্ষিত তথ্য আনা হচ্ছে।"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex min-h-11 items-center font-bold text-primary",
					children: "হোমে ফিরুন"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		fab: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingForm, { existing }, existing?.id ?? "new")
	});
}
function ListingForm({ existing }) {
	const profile = useRooms((state) => state.profile);
	const addListing = useRooms((state) => state.addListing);
	const updateListing = useRooms((state) => state.updateListing);
	const deleteListing = useRooms((state) => state.deleteListing);
	const setProfile = useRooms((state) => state.setProfile);
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(() => existing ? fromListing(existing) : blankForm(profile));
	const [errors, setErrors] = (0, import_react.useState)({});
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	function patch(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function togglePhoto(src) {
		setForm((current) => {
			const photos = current.photos.includes(src) ? current.photos.filter((photo) => photo !== src) : [...current.photos, src].slice(0, 6);
			return {
				...current,
				photos
			};
		});
	}
	function onFile(file) {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("শুধু ছবি আপলোড করা যাবে");
			return;
		}
		if (file.size > 15e5) {
			toast.error("ছবি ১.৫ এমবির মধ্যে রাখুন");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const url = String(reader.result ?? "");
			setForm((current) => ({
				...current,
				photos: [...current.photos, url].slice(0, 6)
			}));
		};
		reader.readAsDataURL(file);
	}
	function submit() {
		const nextErrors = {};
		const phone = form.phone.replace(/\D/g, "");
		if (form.hostName.trim().length < 2) nextErrors.hostName = "হোস্টের নাম লিখুন";
		if (!/^01\d{9}$/.test(phone)) nextErrors.phone = "১১ সংখ্যার মোবাইল নম্বর দিন, যেমন ০১৭XXXXXXXX";
		if (form.addressLine.trim().length < 4) nextErrors.addressLine = "ঠিকানা লিখুন";
		if (form.description.trim().length < 20) nextErrors.description = "অন্তত ২০ অক্ষরের বিবরণ দিন";
		const rent = Number(form.rent);
		if (!Number.isFinite(rent) || rent < 1e3) nextErrors.rent = "ভাড়া কমপক্ষে ১,০০০ টাকা";
		if (form.photos.length < 1) nextErrors.photos = "অন্তত একটি ছবি বেছে নিন";
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length) return;
		const meta = KIND_META[form.kind];
		const tenant = form.kind === "office" ? "anyone" : form.tenant;
		const listing = {
			id: existing?.id ?? `l-${crypto.randomUUID().slice(0, 8)}`,
			hostName: form.hostName.trim(),
			initials: existing?.initials && existing.hostName === form.hostName.trim() ? existing.initials : initialsFrom(form.hostName),
			verified: existing?.verified ?? false,
			active: existing?.active ?? true,
			kind: form.kind,
			tenant,
			area: form.area,
			addressLine: form.addressLine.trim(),
			locationBn: `ঢাকা , ধানমন্ডি , ${areaLabel(form.area)}`,
			description: form.description.trim(),
			rent,
			unit: form.unit,
			available: form.available,
			postedLabel: existing?.postedLabel ?? "Posted just now",
			postedAt: existing?.postedAt ?? Date.now(),
			photos: form.photos,
			phone,
			propertyTypeBn: meta.detailBn,
			propertyTypeEn: meta.detailEn,
			mine: existing?.mine ?? true
		};
		if (existing) updateListing(existing.id, listing);
		else addListing(listing);
		setProfile({
			name: listing.hostName,
			phone: listing.phone
		});
		toast.success(existing ? "বিজ্ঞাপন আপডেট হয়েছে" : "বিজ্ঞাপন প্রকাশ হয়েছে");
		navigate({
			to: "/listing/$id",
			params: { id: listing.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-primary",
				children: existing ? "সম্পাদনা" : "নতুন বিজ্ঞাপন"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-extrabold",
				children: existing ? "বিজ্ঞাপন আপডেট করুন" : "ধানমন্ডিতে বাসা লিস্ট করুন"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "ব্রোকারেজ নেই। নম্বর শুধু এই ব্রাউজারে সেভ থাকে, সরাসরি কল ও হোয়াটসঅ্যাপে যায়।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5 rounded-3xl bg-surface p-5 shadow-md ring-1 ring-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: [
									"হোস্টের নাম",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputClass,
										value: form.hostName,
										onChange: (event) => patch("hostName", event.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors.hostName })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: [
									"মোবাইল নম্বর",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputClass,
										inputMode: "numeric",
										value: form.phone,
										onChange: (event) => patch("phone", event.target.value),
										placeholder: "017XXXXXXXX"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors.phone })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: ["এলাকা", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: inputClass,
									value: form.area,
									onChange: (event) => patch("area", event.target.value),
									children: AREAS.filter((area) => area.id !== "all").map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: area.id,
										children: area.label
									}, area.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: [
									"ঠিকানা",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputClass,
										value: form.addressLine,
										onChange: (event) => patch("addressLine", event.target.value),
										placeholder: "Dhaka · Dhanmondi · Road 27"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors.addressLine })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: ["ভাড়ার ধরন", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: inputClass,
									value: form.kind,
									onChange: (event) => patch("kind", event.target.value),
									children: Object.keys(KIND_META).map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: kind,
										children: KIND_META[kind].searchLabel
									}, kind))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: ["ভাড়াটিয়া", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: inputClass,
									value: form.tenant,
									onChange: (event) => patch("tenant", event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "family",
											children: "ফ্যামিলি"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "male",
											children: "পুরুষ"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "female",
											children: "মহিলা"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: [
									"মাসিক ভাড়া (টাকা)",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputClass,
										inputMode: "numeric",
										value: form.rent,
										onChange: (event) => patch("rent", event.target.value),
										placeholder: "22000"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors.rent })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold",
								children: ["ভাড়ার একক", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: inputClass,
									value: form.unit,
									onChange: (event) => patch("unit", event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "month",
											children: "প্রতি মাস"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "seat",
											children: "প্রতি সিট"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "flat",
											children: "ফ্ল্যাট / স্পেস"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-bold sm:col-span-2",
								children: ["কবে থেকে উঠতে পারবেন", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: inputClass,
									value: form.available,
									onChange: (event) => patch("available", event.target.value),
									children: Object.keys(AVAILABLE_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: key,
										children: AVAILABLE_LABEL[key]
									}, key))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-bold",
						children: [
							"সংক্ষিপ্ত বিবরণ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: cn(inputClass, "min-h-32 resize-y"),
								value: form.description,
								onChange: (event) => patch("description", event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors.description })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold",
							children: "ছবি বাছুন"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "সর্বোচ্চ ৬টি। নিজের ছবিও যোগ করতে পারেন।"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5",
							children: PHOTO_CHOICES.map((src) => {
								const selected = form.photos.includes(src);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => togglePhoto(src),
									className: cn("overflow-hidden rounded-xl ring-2", selected ? "ring-primary" : "ring-transparent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src,
										alt: "",
										className: "aspect-video w-full object-cover"
									})
								}, src);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-chip px-4 text-sm font-bold",
							children: ["নিজের ছবি আপলোড", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "sr-only",
								onChange: (event) => {
									onFile(event.target.files?.[0]);
									event.target.value = "";
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: errors.photos })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: submit,
							className: "inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-ink hover:bg-primary-strong",
							children: existing ? "আপডেট সেভ করুন" : "বিজ্ঞাপন প্রকাশ করুন"
						}), existing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setConfirmDelete(true),
							className: "inline-flex min-h-12 items-center justify-center rounded-xl bg-danger-soft px-4 text-sm font-bold text-danger",
							children: "মুছে ফেলুন"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: confirmDelete,
				title: "এই বিজ্ঞাপন মুছে ফেলবেন?",
				description: existing ? `${existing.hostName} — ${existing.addressLine}` : "",
				onClose: () => setConfirmDelete(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-xl bg-chip font-bold",
						onClick: () => setConfirmDelete(false),
						children: "না, থাক"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 flex-1 rounded-xl bg-danger font-bold text-primary-ink",
						onClick: () => {
							if (!existing) return;
							deleteListing(existing.id);
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
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mt-1 block text-xs font-semibold text-danger",
		children: message
	});
}
//#endregion
export { PostScreen as t };
