export type Kind = "family-flat" | "bachelor-mess" | "sublet" | "female-hostel" | "office";
export type Tenant = "male" | "female" | "family" | "anyone";
export type AreaId = "r27" | "r15" | "r9a" | "r8a" | "r1" | "shankar" | "satmasjid" | "gohar";
export type AvailableKey = "current" | "nov" | "dec" | "jan";
export type RentUnit = "month" | "seat" | "flat";
export type SortKey = "featured" | "rent-asc" | "rent-desc";
export type BudgetKey = "all" | "8-15" | "15-25" | "25-35" | "35+" | "8-35";

export interface Listing {
  id: string;
  hostName: string;
  initials: string;
  verified: boolean;
  active: boolean;
  kind: Kind;
  tenant: Tenant;
  area: AreaId;
  addressLine: string;
  locationBn: string;
  description: string;
  rent: number;
  unit: RentUnit;
  available: AvailableKey;
  postedLabel: string;
  postedAt: number;
  photos: string[];
  phone: string;
  propertyTypeBn: string;
  propertyTypeEn: string;
  mine?: boolean;
}

export interface SearchDraft {
  query: string;
  kind: Kind | "all";
  tenant: Tenant | "all";
  budget: BudgetKey;
  available: AvailableKey | "from-now";
}

export const SHOWCASE_QUERY = "ধানমন্ডি রোড ২৭, ৯/এ, ১৫, শংকর";

export const SHOWCASE_DRAFT: SearchDraft = {
  query: SHOWCASE_QUERY,
  kind: "family-flat",
  tenant: "all",
  budget: "8-35",
  available: "from-now",
};

export const AREAS: { id: AreaId | "all"; label: string }[] = [
  { id: "all", label: "সব ধানমন্ডি" },
  { id: "r27", label: "ধানমন্ডি ২৭" },
  { id: "r15", label: "ধানমন্ডি ১৫" },
  { id: "r9a", label: "ধানমন্ডি ৯/এ" },
  { id: "r8a", label: "ধানমন্ডি ৮/এ" },
  { id: "r1", label: "ধানমন্ডি ১/এ ও জিগাতলা" },
  { id: "shankar", label: "শংকর ও পশ্চিম ধানমন্ডি" },
  { id: "satmasjid", label: "সাতমসজিদ রোড" },
  { id: "gohar", label: "গোহরনগর ও ৩২" },
];

export const KIND_META: Record<
  Kind,
  { label: string; searchLabel: string; badge: string; detailBn: string; detailEn: string }
> = {
  "family-flat": {
    label: "ফ্যামিলি বাসা",
    searchLabel: "ফ্যামিলি ফ্ল্যাট",
    badge: "bg-family text-family-ink",
    detailBn: "ফ্যামিলি ফ্ল্যাট",
    detailEn: "Family Flat",
  },
  "bachelor-mess": {
    label: "ব্যাচেলর মেস",
    searchLabel: "ব্যাচেলর মেস",
    badge: "bg-mess text-mess-ink",
    detailBn: "ব্যাচেলর মেস / সিট",
    detailEn: "Bachelor Mess",
  },
  sublet: {
    label: "সাবলেট / রুমমেট",
    searchLabel: "সাবলেট / রুম",
    badge: "bg-sublet text-sublet-ink",
    detailBn: "সাবলেট / ১ রুম ভাড়া",
    detailEn: "Sublet - 1 Room",
  },
  "female-hostel": {
    label: "মহিলা হোস্টেল",
    searchLabel: "মহিলা হোস্টেল",
    badge: "bg-hostel text-hostel-ink",
    detailBn: "মহিলা হোস্টেল / সিট",
    detailEn: "Female Hostel",
  },
  office: {
    label: "অফিস স্পেস",
    searchLabel: "অফিস স্পেস",
    badge: "bg-office text-office-ink",
    detailBn: "অফিস স্পেস",
    detailEn: "Office Space",
  },
};

export const AVAILABLE_LABEL: Record<AvailableKey, string> = {
  current: "চলতি মাস হতে",
  nov: "১ নভেম্বর হতে",
  dec: "১ ডিসেম্বর হতে",
  jan: "১ জানুয়ারি হতে",
};

export const TENANT_CARDS: { id: Tenant; label: string }[] = [
  { id: "male", label: "পুরুষ (Male)" },
  { id: "female", label: "মহিলা (Female)" },
  { id: "family", label: "ফ্যামিলি / যে কেউ" },
];

export const PHOTOS = {
  living: "/photos/living-bright.jpg",
  glass: "/photos/living-glass.jpg",
  street: "/photos/street-shops.jpg",
  bed: "/photos/bedroom.jpg",
  building: "/photos/building.jpg",
  avenue: "/photos/avenue.jpg",
  shared: "/photos/shared.jpg",
  office: "/photos/office.jpg",
  balcony: "/photos/balcony.jpg",
  kitchen: "/photos/kitchen.jpg",
} as const;

export const PHOTO_CHOICES = Object.values(PHOTOS);

const H = 3_600_000;
const BASE = 1_761_500_000_000;

export const SEED: Listing[] = [
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
    description:
      "ধানমন্ডি ২৭ নম্বরে ডিসেন্ট বাসা — ৩ বেড, ৩ বাথ, ২ বারান্দা। নতুন টাইলসযুক্ত পরিচ্ছন্ন ফ্ল্যাট ভাড়া হবে। লিফট, সাবমার্সিবল, জেনারেটর ও গ্যাস সুবিধা রয়েছে। ধানমন্ডি লেক ও স্কুলের কাছে।",
    rent: 22000,
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
      PHOTOS.shared,
    ],
    phone: "01713220027",
    propertyTypeBn: "ফ্যামিলি ফ্ল্যাট",
    propertyTypeEn: "Family Flat",
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
    description:
      "ধানমন্ডি ৯/এ রোডে ১৬৫০ স্কয়ার ফিটের ৩ বেড, ৩ বাথ ও ২ বারান্দাবিশিষ্ট লাক্সারি ফ্যামিলি ফ্ল্যাট। ২৪ ঘণ্টা লিফট, জেনারেটর ব্যাকআপ, গাড়ি পার্কিং এবং সাউথ-ফেসিং নিরিবিলি বারান্দা।",
    rent: 28500,
    unit: "flat",
    available: "jan",
    postedLabel: "Posted 5h ago",
    postedAt: BASE - 5 * H,
    photos: [PHOTOS.glass, PHOTOS.balcony, PHOTOS.kitchen, PHOTOS.bed, PHOTOS.building, PHOTOS.avenue, PHOTOS.living],
    phone: "01715285009",
    propertyTypeBn: "ফ্যামিলি ফ্ল্যাট",
    propertyTypeEn: "Family Flat",
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
    description:
      "ধানমন্ডি শংকর সংলগ্ন ছাত্র বা চাকরিজীবী ব্যাচেলরদের জন্য ২–৩ সিটের খোলামেলা রুম। ৬টি সিটের মধ্যে সিট খালি রয়েছে। ৩ বেলা খাবার, ওয়াইফাই এবং ইউআইইউ/ডিআইইউ শিক্ষার্থীদের জন্য সুবিধাজনক।",
    rent: 4500,
    unit: "seat",
    available: "current",
    postedLabel: "Posted 5h ago",
    postedAt: BASE - 5 * H - 1000,
    photos: [PHOTOS.street, PHOTOS.shared, PHOTOS.building, PHOTOS.bed, PHOTOS.kitchen],
    phone: "01819450015",
    propertyTypeBn: "ব্যাচেলর মেস / সিট",
    propertyTypeEn: "Bachelor Mess",
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
    description:
      "নভেম্বর থেকে টাইলস করা ফ্ল্যাটে ৫ম তলায় (লিফট-৪) ৬টি বড় মাস্টার বেডরুম, খোলামেলা বারান্দা এবং অ্যাটাচড বাথরুমসহ সাবলেট ভাড়া হবে। আলো-বাতাসপূর্ণ শান্ত ও নিরিবিলি পরিবেশ। লাইনের গ্যাস, পানি এবং জেনারেটরের ব্যাকআপ সুবিধা রয়েছে।",
    rent: 9000,
    unit: "month",
    available: "nov",
    postedLabel: "Posted 2h ago",
    postedAt: BASE - 2 * H,
    photos: [PHOTOS.bed, PHOTOS.balcony, PHOTOS.kitchen, PHOTOS.living, PHOTOS.building, PHOTOS.shared],
    phone: "01618900015",
    propertyTypeBn: "সাবলেট / ১ রুম ভাড়া",
    propertyTypeEn: "Sublet - 1 Room",
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
    description:
      "ধানমন্ডি ৮/এ ৪র্থ ও ৫ম তলায় নারীদের জন্য সম্পূর্ণ নিরাপদ ও মানসম্মত পরিবেশ। সিঙ্গেল ও ডাবল সিট খালি আছে। সার্বক্ষণিক মহিলা সিকিউরিটি গার্ড, নিয়মিত ও উন্নত খাবারের ব্যবস্থা।",
    rent: 6200,
    unit: "seat",
    available: "current",
    postedLabel: "Posted 1d ago",
    postedAt: BASE - 24 * H,
    photos: [PHOTOS.building, PHOTOS.bed, PHOTOS.shared, PHOTOS.kitchen],
    phone: "01911620088",
    propertyTypeBn: "মহিলা হোস্টেল / সিট",
    propertyTypeEn: "Female Hostel",
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
    description:
      "সাতমসজিদ রোড সংলগ্ন প্রাইম লোকেশনে ১২০০ স্কয়ার ফিটের আধুনিক ডেকোরেশন অফিস স্পেস। কনফারেন্স রুম, কেবিন, লিফট ও কার পার্কিং সুবিধা সহ।",
    rent: 55000,
    unit: "flat",
    available: "dec",
    postedLabel: "Posted 2d ago",
    postedAt: BASE - 48 * H,
    photos: [PHOTOS.avenue, PHOTOS.office, PHOTOS.building, PHOTOS.glass, PHOTOS.street, PHOTOS.balcony],
    phone: "01777550066",
    propertyTypeBn: "অফিস স্পেস",
    propertyTypeEn: "Office Space",
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
    description:
      "ধানমন্ডি ২৭-এ ২ বেডের পরিবারের জন্য ছোট কিন্তু আলো-বাতাসযুক্ত ফ্ল্যাট। ৩য় তলা, লিফট, গ্যাস ও জেনারেটর সুবিধা আছে। স্কুল ও লেকের কাছে।",
    rent: 18000,
    unit: "month",
    available: "dec",
    postedLabel: "Posted 6h ago",
    postedAt: BASE - 6 * H,
    photos: [PHOTOS.kitchen, PHOTOS.living, PHOTOS.bed, PHOTOS.balcony],
    phone: "01813445566",
    propertyTypeBn: "ফ্যামিলি ফ্ল্যাট",
    propertyTypeEn: "Family Flat",
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
    description:
      "ধানমন্ডি ৩২ ও গোহরনগরের কাছে ব্যাচেলরদের জন্য সিট। খাবার ও ওয়াইফাইসহ, চলতি মাসেই উঠা যাবে। শংকর বাসস্ট্যান্ড থেকে হেঁটে কয়েক মিনিট।",
    rent: 5500,
    unit: "seat",
    available: "current",
    postedLabel: "Posted 8h ago",
    postedAt: BASE - 8 * H,
    photos: [PHOTOS.shared, PHOTOS.street, PHOTOS.bed, PHOTOS.kitchen],
    phone: "01622334455",
    propertyTypeBn: "ব্যাচেলর মেস / সিট",
    propertyTypeEn: "Bachelor Mess",
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
    description:
      "জিগাতলা ও ধানমন্ডি ১/এ-তে একটি সিঙ্গেল রুম সাবলেট। পুরুষ ভাড়াটিয়ার জন্য। শান্ত এলাকা, গ্যাস ও পানি লাইনে। জেনারেটর ব্যাকআপ আছে।",
    rent: 7500,
    unit: "month",
    available: "jan",
    postedLabel: "Posted 1d ago",
    postedAt: BASE - 30 * H,
    photos: [PHOTOS.bed, PHOTOS.living, PHOTOS.balcony, PHOTOS.kitchen, PHOTOS.building],
    phone: "01744556677",
    propertyTypeBn: "সাবলেট / ১ রুম ভাড়া",
    propertyTypeEn: "Sublet - 1 Room",
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
    description:
      "ধানমন্ডি ৮/এ মহিলা হোস্টেলে ডাবল সিট খালি। ওয়ার্ডেন ও সিকিউরিটি আছে, খাবারের ব্যবস্থা সহ। বিশ্ববিদ্যালয়গামী শিক্ষার্থীদের জন্য সুবিধাজনক।",
    rent: 7000,
    unit: "seat",
    available: "current",
    postedLabel: "Posted 12h ago",
    postedAt: BASE - 12 * H,
    photos: [PHOTOS.shared, PHOTOS.building, PHOTOS.bed, PHOTOS.kitchen, PHOTOS.balcony],
    phone: "01988776655",
    propertyTypeBn: "মহিলা হোস্টেল / সিট",
    propertyTypeEn: "Female Hostel",
  },
];

export function areaLabel(id: AreaId | "all") {
  return AREAS.find((area) => area.id === id)?.label ?? id;
}

export function rentSuffix(unit: RentUnit) {
  if (unit === "month") return "/ মাস";
  if (unit === "seat") return "/ সিট";
  return "/";
}

export function cloneSeed(): Listing[] {
  return SEED.map((listing) => ({ ...listing, photos: [...listing.photos] }));
}

function inBudget(rent: number, budget: BudgetKey) {
  if (budget === "all") return true;
  if (budget === "8-15") return rent >= 8000 && rent <= 15000;
  if (budget === "15-25") return rent >= 15000 && rent <= 25000;
  if (budget === "25-35") return rent >= 25000 && rent <= 35000;
  if (budget === "35+") return rent >= 35000;
  return rent >= 8000 && rent <= 35000;
}

function queryMatches(listing: Listing, query: string) {
  const q = query.trim();
  if (!q || q === SHOWCASE_QUERY) return true;
  const blob = [
    listing.hostName,
    listing.addressLine,
    listing.locationBn,
    listing.description,
    listing.propertyTypeBn,
    listing.propertyTypeEn,
    areaLabel(listing.area),
    KIND_META[listing.kind].label,
  ]
    .join(" ")
    .toLowerCase();
  return blob.includes(q.toLowerCase());
}

export function filterListings(
  listings: Listing[],
  browse: { area: AreaId | "all"; sort: SortKey; applied: SearchDraft | null },
) {
  let rows = listings.filter((listing) => browse.area === "all" || listing.area === browse.area);
  const applied = browse.applied;
  if (applied) {
    rows = rows.filter((listing) => {
      if (!queryMatches(listing, applied.query)) return false;
      if (applied.kind !== "all" && listing.kind !== applied.kind) return false;
      if (applied.tenant !== "all" && listing.tenant !== "anyone" && listing.tenant !== applied.tenant) {
        return false;
      }
      if (!inBudget(listing.rent, applied.budget)) return false;
      if (applied.available !== "from-now" && listing.available !== applied.available) return false;
      return true;
    });
  }
  if (browse.sort === "rent-asc") return [...rows].sort((a, b) => a.rent - b.rent);
  if (browse.sort === "rent-desc") return [...rows].sort((a, b) => b.rent - a.rent);
  return rows;
}
