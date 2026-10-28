import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlignLeft,
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MapPin,
  Pencil,
  Phone,
  Share2,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Modal } from "@/components/confirm-dialog";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { AVAILABLE_LABEL, TENANT_CARDS, rentSuffix, type Listing } from "@/lib/catalog";
import { formatBdt, formatPhone, telLink, toBnDigits, waLink } from "@/lib/format";
import { useRooms } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/listing/$id")({
  component: ListingDetail,
});

function ListingDetail() {
  const { id } = Route.useParams();
  const listing = useRooms((state) => state.listings.find((item) => item.id === id));
  const hydrated = useRooms((state) => state.hydrated);
  const saved = useRooms((state) => state.savedIds.includes(id));
  const toggleSaved = useRooms((state) => state.toggleSaved);
  const deleteListing = useRooms((state) => state.deleteListing);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(0);
  const [callOpen, setCallOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setPhoto(0);
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-extrabold">{hydrated ? "এই বিজ্ঞাপনটি নেই" : "লোড হচ্ছে"}</h1>
          <p className="mt-2 text-sm text-muted">
            {hydrated ? "লিস্টিং সরানো হয়েছে অথবা লিংকটি ঠিক নয়।" : "এক মুহূর্ত অপেক্ষা করুন।"}
          </p>
          <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-bold text-primary">
            সব বাসা দেখুন
          </Link>
        </main>
      </div>
    );
  }

  const total = listing.photos.length;
  const current = listing.photos[photo] ?? listing.photos[0];
  const message = `আসসালামু আলাইকুম, আমি Dhanmondi Rooms-এ আপনার বিজ্ঞাপন দেখেছি (${listing.addressLine})। ভাড়ার শর্ত জানতে চাই।`;

  async function share() {
    const url = window.location.href;
    const payload = { title: listing?.hostName ?? "Dhanmondi Rooms", text: listing?.addressLine ?? "", url };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("লিংক কপি হয়েছে");
  }

  return (
    <div className="min-h-screen min-w-0 bg-canvas pb-24 lg:pb-0">
      <div className="hidden lg:block">
        <SiteHeader />
      </div>
      <header className="sticky top-0 z-40 flex items-center gap-2 bg-canvas/95 px-3 py-3 backdrop-blur lg:hidden">
        <Link to="/" aria-label="পেছনে" className="grid size-11 place-items-center rounded-full">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="flex-1 text-lg font-extrabold">Property Details</h1>
        <IconButton label="শেয়ার" onClick={() => void share()}>
          <Share2 className="size-5" />
        </IconButton>
        <IconButton
          label={saved ? "সেভ সরান" : "সেভ করুন"}
          onClick={() => {
            toggleSaved(listing.id);
            toast.success(saved ? "সেভ থেকে সরানো হয়েছে" : "সেভ করা হয়েছে");
          }}
        >
          <Bookmark className={cn("size-5", saved && "fill-primary text-primary")} />
        </IconButton>
        <Link to="/account" aria-label="অ্যাকাউন্ট" className="grid size-11 place-items-center rounded-full bg-primary text-primary-ink">
          <UserRound className="size-5" />
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-4 lg:grid-cols-2 lg:py-8">
        <div>
          <div className="relative overflow-hidden rounded-3xl bg-chip">
            <img src={current} alt={`${listing.hostName} — ছবি ${photo + 1}`} className="aspect-video w-full object-cover" />
            {total > 1 && (
              <>
                <button
                  type="button"
                  aria-label="আগের ছবি"
                  className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-md"
                  onClick={() => setPhoto((index) => (index - 1 + total) % total)}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="পরের ছবি"
                  className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-md"
                  onClick={() => setPhoto((index) => (index + 1) % total)}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-primary-ink">
              <Camera className="size-3.5" />
              {toBnDigits(photo + 1)}/{toBnDigits(total)} ছবি
            </span>
          </div>
          {total > 1 && (
            <div className="chip-row mt-3 hidden gap-2 overflow-x-auto lg:flex">
              {listing.photos.map((src, index) => (
                <button
                  key={src + index}
                  type="button"
                  aria-label={`ছবি ${index + 1}`}
                  onClick={() => setPhoto(index)}
                  className={cn("overflow-hidden rounded-xl ring-2", photo === index ? "ring-primary" : "ring-transparent")}
                >
                  <img src={src} alt="" className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="hidden items-center justify-between lg:flex">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
              <ArrowLeft className="size-4" /> সব লিস্টিং
            </Link>
            <div className="flex gap-2">
              <IconButton label="শেয়ার" onClick={() => void share()}>
                <Share2 className="size-5" />
              </IconButton>
              <IconButton
                label={saved ? "সেভ সরান" : "সেভ করুন"}
                onClick={() => {
                  toggleSaved(listing.id);
                  toast.success(saved ? "সেভ থেকে সরানো হয়েছে" : "সেভ করা হয়েছে");
                }}
              >
                <Bookmark className={cn("size-5", saved && "fill-primary text-primary")} />
              </IconButton>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-sm ring-1 ring-line">
            <MapPin className="size-5 shrink-0 text-primary" />
            <p className="font-bold">{listing.locationBn}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <article className="rounded-2xl bg-surface p-4 ring-1 ring-line">
              <p className="text-sm font-semibold text-muted">মাসিক ভাড়া</p>
              <p className="mt-2 text-2xl font-extrabold text-primary">
                {formatBdt(listing.rent)}
                <span className="text-sm font-semibold text-muted"> {rentSuffix(listing.unit)}</span>
              </p>
            </article>
            <article className="rounded-2xl bg-surface p-4 ring-1 ring-line">
              <p className="text-sm font-semibold text-muted">কবে থেকে উঠতে পারবেন</p>
              <p className="mt-3 inline-flex rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-primary">
                {AVAILABLE_LABEL[listing.available]}
              </p>
            </article>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 ring-1 ring-line">
            <span className="relative grid size-12 place-items-center rounded-full bg-primary text-base font-extrabold text-primary-ink">
              {listing.initials}
              {listing.active && <span className="absolute right-0 bottom-0 size-3.5 rounded-full bg-whatsapp ring-2 ring-surface" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 truncate font-extrabold">
                {listing.hostName}
                {listing.verified && <BadgeCheck className="size-4 text-primary" aria-label="যাচাইকৃত" />}
              </p>
              <p className="text-xs text-muted">{listing.postedLabel}</p>
            </div>
            <button
              type="button"
              aria-label="কল করুন"
              onClick={() => setCallOpen(true)}
              className="grid size-11 place-items-center rounded-full bg-chip text-primary"
            >
              <Phone className="size-5" />
            </button>
          </div>

          <section>
            <h2 className="flex items-center gap-2 border-b border-line pb-2 text-lg font-extrabold text-primary">
              <AlignLeft className="size-5" /> সংক্ষিপ্ত বিবরণ
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink">{listing.description}</p>
          </section>

          <section>
            <h2 className="flex items-center gap-2 border-b border-line pb-2 text-lg font-extrabold text-primary">
              <LayoutGrid className="size-5" /> বাসার ধরন ও ভাড়াটিয়া
            </h2>
            <p className="mt-4 text-sm font-bold">বাসার ধরন (Property Type)</p>
            <div className="mt-2 flex items-center gap-3 rounded-2xl bg-chip px-4 py-3">
              <Building2 className="size-5 shrink-0 text-primary" />
              <p className="text-sm font-bold">
                {listing.propertyTypeBn}
                <span className="mt-0.5 block font-semibold text-muted">({listing.propertyTypeEn})</span>
              </p>
            </div>
            <p className="mt-4 text-sm font-bold">ভাড়াটিয়ার ধরন (কারা উঠতে পারবেন)</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {TENANT_CARDS.map((card) => {
                const selected =
                  card.id === "family"
                    ? listing.tenant === "family" || listing.tenant === "anyone"
                    : listing.tenant === card.id;
                const Icon = card.id === "family" ? Users : UserRound;
                return (
                  <div
                    key={card.id}
                    className={cn(
                      "flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl px-2 py-3 text-center text-xs font-bold",
                      selected ? "bg-primary text-primary-ink" : "bg-chip text-muted",
                    )}
                  >
                    <Icon className="size-5" />
                    {card.label}
                  </div>
                );
              })}
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/post/$id"
              params={{ id: listing.id }}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-chip px-4 text-sm font-bold"
            >
              <Pencil className="size-4" /> সম্পাদনা
            </Link>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-danger-soft px-4 text-sm font-bold text-danger"
            >
              <Trash2 className="size-4" /> মুছে ফেলুন
            </button>
          </div>

          <div className="hidden gap-3 lg:flex">
            <ContactButtons listing={listing} message={message} onCall={() => setCallOpen(true)} />
          </div>
        </div>
      </main>

      <div className="hidden lg:block">
        <SiteFooter pad={false} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-surface p-3 lg:hidden">
        <ContactButtons listing={listing} message={message} onCall={() => setCallOpen(true)} />
      </div>

      <Modal
        open={callOpen}
        title="সরাসরি কল"
        description={`${listing.hostName} — ${listing.addressLine}`}
        onClose={() => setCallOpen(false)}
      >
        <p className="text-center text-2xl font-extrabold tracking-wide">{toBnDigits(formatPhone(listing.phone))}</p>
        <a
          href={telLink(listing.phone)}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-ink"
        >
          <Phone className="size-4" /> কল করুন
        </a>
      </Modal>
      <Modal
        open={deleteOpen}
        title="এই বিজ্ঞাপন মুছে ফেলবেন?"
        description="মুছে ফেললে এই ব্রাউজারের তালিকা থেকে সরে যাবে। আবার নমুনা ডেটা অ্যাকাউন্ট পেজ থেকে ফেরানো যায়।"
        onClose={() => setDeleteOpen(false)}
      >
        <div className="flex gap-3">
          <button type="button" className="min-h-11 flex-1 rounded-xl bg-chip font-bold" onClick={() => setDeleteOpen(false)}>
            না, থাক
          </button>
          <button
            type="button"
            className="min-h-11 flex-1 rounded-xl bg-danger font-bold text-primary-ink"
            onClick={() => {
              deleteListing(listing.id);
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

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid size-11 place-items-center rounded-full">
      {children}
    </button>
  );
}

function ContactButtons({
  listing,
  message,
  onCall,
}: {
  listing: Listing;
  message: string;
  onCall: () => void;
}) {
  return (
    <>
      <a
        href={waLink(listing.phone, message)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp font-bold text-primary-ink hover:bg-whatsapp-strong"
      >
        <WhatsAppIcon className="size-5" /> হোয়াটসঅ্যাপ
      </a>
      <button
        type="button"
        onClick={onCall}
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-ink hover:bg-primary-strong"
      >
        <Phone className="size-5" /> সরাসরি কল
      </button>
    </>
  );
}
