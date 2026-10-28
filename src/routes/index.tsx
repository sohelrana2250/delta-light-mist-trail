import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/chrome";
import { ListingCard } from "@/components/listing-card";
import { SearchPanel } from "@/components/search-panel";
import {
  AREAS,
  SHOWCASE_DRAFT,
  filterListings,
  type AreaId,
  type SearchDraft,
  type SortKey,
} from "@/lib/catalog";
import { toBnDigits } from "@/lib/format";
import { useRooms } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
});

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
  const [draft, setDraft] = useState<SearchDraft>(SHOWCASE_DRAFT);

  const filtered = useMemo(
    () => filterListings(listings, { area, sort, applied }),
    [listings, area, sort, applied],
  );
  const shown = filtered.slice(0, visibleCount);
  const filtering = applied !== null || area !== "all" || sort !== "featured";

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-2 sm:pt-12">
        <h1 className="mx-auto max-w-4xl text-center text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
          ধানমন্ডিতে বাসা, মেস ও সাবলেট খুঁজুন
        </h1>
        <div className="mt-6 sm:mt-8">
          <SearchPanel
            draft={draft}
            onChange={setDraft}
            onSubmit={() => {
              applySearch(draft);
              document.getElementById("listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-6xl px-4 md:hidden">
        <div className="rounded-3xl bg-primary px-5 py-5 text-primary-ink">
          <p className="text-lg font-extrabold leading-snug">ধানমন্ডির এলাকায় খুঁজুন আপনার নতুন বাসা ও রুম</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-primary-ink/15 px-3 py-1">যাচাইকৃত মালিকের সাথে সরাসরি</span>
            <span className="rounded-full bg-primary-ink/15 px-3 py-1">ফ্রি বিজ্ঞাপন</span>
          </div>
        </div>
      </section>

      <section id="listings" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-extrabold sm:text-2xl">ধানমন্ডি এলাকার টু-লেট লিস্টিং</h2>
          <div className="flex min-w-0 items-center gap-2">
            <label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-surface px-3 text-sm ring-1 ring-line sm:flex-none">
              <span className="shrink-0 text-muted">সর্ট করুন:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="min-w-0 flex-1 bg-transparent font-bold text-ink outline-none sm:max-w-56"
              >
                <option value="featured">নতুন লিস্টিং আগে (Newest first)</option>
                <option value="rent-asc">ভাড়া: কম থেকে বেশি</option>
                <option value="rent-desc">ভাড়া: বেশি থেকে কম</option>
              </select>
            </label>
            <button
              type="button"
              aria-label="ফিল্টার রিসেট"
              className="grid size-11 place-items-center rounded-full bg-surface text-muted ring-1 ring-line hover:text-primary"
              onClick={() => {
                setDraft(SHOWCASE_DRAFT);
                resetBrowse();
              }}
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>

        <div className="chip-row mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
          {AREAS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={area === item.id}
              onClick={() => setArea(item.id as AreaId | "all")}
              className={cn(
                "shrink-0 min-h-11 rounded-full px-4 text-sm font-bold",
                area === item.id ? "bg-primary text-primary-ink" : "bg-surface text-ink ring-1 ring-line",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {filtering && (
          <p className="mt-3 text-sm font-semibold text-muted">
            {toBnDigits(filtered.length)}টি বাসা এই ফিল্টারে
          </p>
        )}

        {shown.length === 0 ? (
          <div className="mt-6 rounded-3xl bg-surface px-6 py-16 text-center ring-1 ring-line">
            <p className="text-lg font-extrabold">এই ফিল্টারে কোনো বাসা পাওয়া যায়নি</p>
            <p className="mt-2 text-sm text-muted">এলাকা, বাজেট বা ভাড়ার ধরন বদলে আবার খুঁজুন।</p>
            <button
              type="button"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-ink"
              onClick={() => {
                setDraft({ ...SHOWCASE_DRAFT, query: "", kind: "all", budget: "all" });
                resetBrowse();
              }}
            >
              সব লিস্টিং দেখুন
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {shown.length < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-surface px-6 text-sm font-bold text-primary ring-1 ring-line"
            >
              <ChevronDown className="size-4" />
              <span className="sm:hidden">আরও লিস্টিং দেখুন (Show More Listings)</span>
              <span className="hidden sm:inline">আরও বাসা ও রুম দেখুন (Load More Rooms)</span>
            </button>
          </div>
        )}
      </section>
    </PageShell>
  );
}
