import { Link } from "@tanstack/react-router";
import { BadgeCheck, ChevronRight, Clock, Eye, Image as ImageIcon, MapPin } from "lucide-react";
import { useState } from "react";
import {
  AVAILABLE_LABEL,
  KIND_META,
  rentSuffix,
  type Listing,
} from "@/lib/catalog";
import { formatBdt } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ListingCard({ listing }: { listing: Listing }) {
  const [index, setIndex] = useState(0);
  const photo = listing.photos[index] ?? listing.photos[0];
  const kind = KIND_META[listing.kind];

  return (
    <article className="card-lift flex h-full flex-col rounded-3xl bg-surface p-4 shadow-md ring-1 ring-line">
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-primary-ink">
          {listing.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-base font-extrabold">{listing.hostName}</h3>
            {listing.verified && <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="যাচাইকৃত" />}
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <Clock className="size-3.5" />
            {listing.postedLabel}
          </p>
        </div>
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", kind.badge)}>{kind.label}</span>
      </header>

      <p className="mt-3 flex items-center gap-1 text-sm font-medium text-muted">
        <MapPin className="size-4 shrink-0 text-primary" />
        <span className="truncate">{listing.addressLine}</span>
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{listing.description}</p>

      <div className="relative mt-3 overflow-hidden rounded-2xl">
        <Link to="/listing/$id" params={{ id: listing.id }} tabIndex={-1} aria-hidden="true">
          <img src={photo} alt="" className="aspect-video w-full object-cover" />
        </Link>
        {listing.photos.length > 1 && (
          <button
            type="button"
            aria-label="পরের ছবি"
            className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-md"
            onClick={() => setIndex((current) => (current + 1) % listing.photos.length)}
          >
            <ChevronRight className="size-5" />
          </button>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-primary-ink">
          <ImageIcon className="size-3.5" />
          {index + 1}/{listing.photos.length}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-faint">RENT</p>
          <p className="text-xl font-extrabold text-ink">
            {formatBdt(listing.rent)}
            <span className="text-sm font-semibold text-muted"> {rentSuffix(listing.unit)}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold tracking-wide text-faint">AVAILABLE FROM</p>
          <p className="mt-1 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
            {AVAILABLE_LABEL[listing.available]}
          </p>
        </div>
      </div>

      <Link
        to="/listing/$id"
        params={{ id: listing.id }}
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-ink hover:bg-primary-strong"
      >
        <Eye className="size-4" />
        বিস্তারিত বিবরণ ও যোগাযোগ
      </Link>
    </article>
  );
}
