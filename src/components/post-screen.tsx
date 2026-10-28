import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/chrome";
import { Modal } from "@/components/confirm-dialog";
import {
  AREAS,
  AVAILABLE_LABEL,
  KIND_META,
  PHOTO_CHOICES,
  areaLabel,
  type AreaId,
  type AvailableKey,
  type Kind,
  type Listing,
  type RentUnit,
  type Tenant,
} from "@/lib/catalog";
import { initialsFrom } from "@/lib/format";
import { useRooms } from "@/lib/store";
import { cn } from "@/lib/utils";

const inputClass =
  "mt-1 w-full rounded-2xl bg-chip px-3 py-3 text-sm font-semibold text-ink outline-none ring-1 ring-transparent focus:ring-primary";

interface FormState {
  hostName: string;
  phone: string;
  area: AreaId;
  addressLine: string;
  kind: Kind;
  tenant: Tenant;
  rent: string;
  unit: RentUnit;
  available: AvailableKey;
  description: string;
  photos: string[];
}

function blankForm(profile: { name: string; phone: string }): FormState {
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
    photos: [PHOTO_CHOICES[0] ?? ""],
  };
}

function fromListing(listing: Listing): FormState {
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
    photos: listing.photos,
  };
}

export function PostScreen({ id }: { id?: string }) {
  const hydrated = useRooms((state) => state.hydrated);
  const existing = useRooms((state) => (id ? state.listings.find((item) => item.id === id) : undefined));

  if (id && !existing) {
    return (
      <PageShell fab={false}>
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-extrabold">{hydrated ? "বিজ্ঞাপন পাওয়া যায়নি" : "লোড হচ্ছে"}</h1>
          <p className="mt-2 text-sm text-muted">
            {hydrated ? "এই লিস্টিং মুছে ফেলা হয়েছে বা লিংকটি ভুল।" : "সংরক্ষিত তথ্য আনা হচ্ছে।"}
          </p>
          <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-bold text-primary">
            হোমে ফিরুন
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell fab={false}>
      <ListingForm key={existing?.id ?? "new"} existing={existing} />
    </PageShell>
  );
}

function ListingForm({ existing }: { existing?: Listing }) {
  const profile = useRooms((state) => state.profile);
  const addListing = useRooms((state) => state.addListing);
  const updateListing = useRooms((state) => state.updateListing);
  const deleteListing = useRooms((state) => state.deleteListing);
  const setProfile = useRooms((state) => state.setProfile);
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(() => (existing ? fromListing(existing) : blankForm(profile)));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function togglePhoto(src: string) {
    setForm((current) => {
      const has = current.photos.includes(src);
      const photos = has ? current.photos.filter((photo) => photo !== src) : [...current.photos, src].slice(0, 6);
      return { ...current, photos };
    });
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ছবি আপলোড করা যাবে");
      return;
    }
    if (file.size > 1_500_000) {
      toast.error("ছবি ১.৫ এমবির মধ্যে রাখুন");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result ?? "");
      setForm((current) => ({ ...current, photos: [...current.photos, url].slice(0, 6) }));
    };
    reader.readAsDataURL(file);
  }

  function submit() {
    const nextErrors: Record<string, string> = {};
    const phone = form.phone.replace(/\D/g, "");
    if (form.hostName.trim().length < 2) nextErrors.hostName = "হোস্টের নাম লিখুন";
    if (!/^01\d{9}$/.test(phone)) nextErrors.phone = "১১ সংখ্যার মোবাইল নম্বর দিন, যেমন ০১৭XXXXXXXX";
    if (form.addressLine.trim().length < 4) nextErrors.addressLine = "ঠিকানা লিখুন";
    if (form.description.trim().length < 20) nextErrors.description = "অন্তত ২০ অক্ষরের বিবরণ দিন";
    const rent = Number(form.rent);
    if (!Number.isFinite(rent) || rent < 1000) nextErrors.rent = "ভাড়া কমপক্ষে ১,০০০ টাকা";
    if (form.photos.length < 1) nextErrors.photos = "অন্তত একটি ছবি বেছে নিন";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const meta = KIND_META[form.kind];
    const tenant = form.kind === "office" ? "anyone" : form.tenant;
    const listing: Listing = {
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
      mine: existing?.mine ?? true,
    };
    if (existing) updateListing(existing.id, listing);
    else addListing(listing);
    setProfile({ name: listing.hostName, phone: listing.phone });
    toast.success(existing ? "বিজ্ঞাপন আপডেট হয়েছে" : "বিজ্ঞাপন প্রকাশ হয়েছে");
    void navigate({ to: "/listing/$id", params: { id: listing.id } });
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <p className="text-sm font-bold text-primary">{existing ? "সম্পাদনা" : "নতুন বিজ্ঞাপন"}</p>
      <h1 className="mt-1 text-3xl font-extrabold">{existing ? "বিজ্ঞাপন আপডেট করুন" : "ধানমন্ডিতে বাসা লিস্ট করুন"}</h1>
      <p className="mt-2 text-sm text-muted">ব্রোকারেজ নেই। নম্বর শুধু এই ব্রাউজারে সেভ থাকে, সরাসরি কল ও হোয়াটসঅ্যাপে যায়।</p>

      <div className="mt-6 space-y-5 rounded-3xl bg-surface p-5 shadow-md ring-1 ring-line">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold">
            হোস্টের নাম
            <input className={inputClass} value={form.hostName} onChange={(event) => patch("hostName", event.target.value)} />
            <FieldError message={errors.hostName} />
          </label>
          <label className="block text-sm font-bold">
            মোবাইল নম্বর
            <input className={inputClass} inputMode="numeric" value={form.phone} onChange={(event) => patch("phone", event.target.value)} placeholder="017XXXXXXXX" />
            <FieldError message={errors.phone} />
          </label>
          <label className="block text-sm font-bold">
            এলাকা
            <select className={inputClass} value={form.area} onChange={(event) => patch("area", event.target.value as AreaId)}>
              {AREAS.filter((area) => area.id !== "all").map((area) => (
                <option key={area.id} value={area.id}>
                  {area.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-bold">
            ঠিকানা
            <input className={inputClass} value={form.addressLine} onChange={(event) => patch("addressLine", event.target.value)} placeholder="Dhaka · Dhanmondi · Road 27" />
            <FieldError message={errors.addressLine} />
          </label>
          <label className="block text-sm font-bold">
            ভাড়ার ধরন
            <select className={inputClass} value={form.kind} onChange={(event) => patch("kind", event.target.value as Kind)}>
              {(Object.keys(KIND_META) as Kind[]).map((kind) => (
                <option key={kind} value={kind}>
                  {KIND_META[kind].searchLabel}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-bold">
            ভাড়াটিয়া
            <select className={inputClass} value={form.tenant} onChange={(event) => patch("tenant", event.target.value as Tenant)}>
              <option value="family">ফ্যামিলি</option>
              <option value="male">পুরুষ</option>
              <option value="female">মহিলা</option>
            </select>
          </label>
          <label className="block text-sm font-bold">
            মাসিক ভাড়া (টাকা)
            <input className={inputClass} inputMode="numeric" value={form.rent} onChange={(event) => patch("rent", event.target.value)} placeholder="22000" />
            <FieldError message={errors.rent} />
          </label>
          <label className="block text-sm font-bold">
            ভাড়ার একক
            <select className={inputClass} value={form.unit} onChange={(event) => patch("unit", event.target.value as RentUnit)}>
              <option value="month">প্রতি মাস</option>
              <option value="seat">প্রতি সিট</option>
              <option value="flat">ফ্ল্যাট / স্পেস</option>
            </select>
          </label>
          <label className="block text-sm font-bold sm:col-span-2">
            কবে থেকে উঠতে পারবেন
            <select className={inputClass} value={form.available} onChange={(event) => patch("available", event.target.value as AvailableKey)}>
              {(Object.keys(AVAILABLE_LABEL) as AvailableKey[]).map((key) => (
                <option key={key} value={key}>
                  {AVAILABLE_LABEL[key]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-bold">
          সংক্ষিপ্ত বিবরণ
          <textarea className={cn(inputClass, "min-h-32 resize-y")} value={form.description} onChange={(event) => patch("description", event.target.value)} />
          <FieldError message={errors.description} />
        </label>
        <div>
          <p className="text-sm font-bold">ছবি বাছুন</p>
          <p className="mt-1 text-xs text-muted">সর্বোচ্চ ৬টি। নিজের ছবিও যোগ করতে পারেন।</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {PHOTO_CHOICES.map((src) => {
              const selected = form.photos.includes(src);
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => togglePhoto(src)}
                  className={cn("overflow-hidden rounded-xl ring-2", selected ? "ring-primary" : "ring-transparent")}
                >
                  <img src={src} alt="" className="aspect-video w-full object-cover" />
                </button>
              );
            })}
          </div>
          <label className="mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-chip px-4 text-sm font-bold">
            নিজের ছবি আপলোড
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                onFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
          <FieldError message={errors.photos} />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={submit} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-ink hover:bg-primary-strong">
            {existing ? "আপডেট সেভ করুন" : "বিজ্ঞাপন প্রকাশ করুন"}
          </button>
          {existing && (
            <button type="button" onClick={() => setConfirmDelete(true)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-danger-soft px-4 text-sm font-bold text-danger">
              মুছে ফেলুন
            </button>
          )}
        </div>
      </div>
      <Modal
        open={confirmDelete}
        title="এই বিজ্ঞাপন মুছে ফেলবেন?"
        description={existing ? `${existing.hostName} — ${existing.addressLine}` : ""}
        onClose={() => setConfirmDelete(false)}
      >
        <div className="flex gap-3">
          <button type="button" className="min-h-11 flex-1 rounded-xl bg-chip font-bold" onClick={() => setConfirmDelete(false)}>
            না, থাক
          </button>
          <button
            type="button"
            className="min-h-11 flex-1 rounded-xl bg-danger font-bold text-primary-ink"
            onClick={() => {
              if (!existing) return;
              deleteListing(existing.id);
              toast.success("বিজ্ঞাপন মুছে ফেলা হয়েছে");
              void navigate({ to: "/" });
            }}
          >
            হ্যাঁ, মুছুন
          </button>
        </div>
      </Modal>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="mt-1 block text-xs font-semibold text-danger">{message}</span>;
}
