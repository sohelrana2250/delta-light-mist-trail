import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bookmark, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/chrome";
import { Modal } from "@/components/confirm-dialog";
import { KIND_META, rentSuffix, type Listing } from "@/lib/catalog";
import { formatBdt } from "@/lib/format";
import { useRooms } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const profile = useRooms((state) => state.profile);
  const hydrated = useRooms((state) => state.hydrated);
  const setProfile = useRooms((state) => state.setProfile);
  const listings = useRooms((state) => state.listings);
  const savedIds = useRooms((state) => state.savedIds);
  const deleteListing = useRooms((state) => state.deleteListing);
  const resetDemo = useRooms((state) => state.resetDemo);
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [tab, setTab] = useState<"manage" | "saved">("manage");
  const [pending, setPending] = useState<Listing | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hydrated) return;
    setName(profile.name);
    setPhone(profile.phone);
  }, [hydrated, profile.name, profile.phone]);

  const saved = listings.filter((listing) => savedIds.includes(listing.id));
  const rows = tab === "saved" ? saved : listings;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <p className="text-sm font-bold text-primary">MY ACCOUNT</p>
        <h1 className="mt-1 text-3xl font-extrabold">আমার অ্যাকাউন্ট</h1>
        <p className="mt-2 text-sm text-muted">
          এটি এই ব্রাউজারের লোকাল প্রোফাইল। পাসওয়ার্ড লাগে না — নাম ও নম্বর সেভ থাকবে, বিজ্ঞাপন যোগ, এডিট বা ডিলিট করা যাবে।
        </p>

        <form
          className="mt-6 rounded-3xl bg-surface p-5 shadow-md ring-1 ring-line"
          onSubmit={(event) => {
            event.preventDefault();
            setProfile({ name: name.trim(), phone: phone.replace(/\D/g, "") });
            toast.success("প্রোফাইল সেভ হয়েছে");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">
              নাম
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম"
                className="mt-1 w-full rounded-2xl bg-chip px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="text-sm font-bold">
              মোবাইল
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="017XXXXXXXX"
                className="mt-1 w-full rounded-2xl bg-chip px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          </div>
          <button type="submit" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-ink">
            প্রোফাইল সেভ
          </button>
        </form>

        <div className="mt-6 flex gap-2">
          <TabButton active={tab === "manage"} onClick={() => setTab("manage")}>
            সব বিজ্ঞাপন ({listings.length})
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            <Bookmark className="size-4" /> সেভ ({saved.length})
          </TabButton>
        </div>

        <ul className="mt-4 space-y-3">
          {rows.length === 0 && (
            <li className="rounded-3xl bg-surface px-5 py-10 text-center text-sm text-muted ring-1 ring-line">
              {tab === "saved" ? "এখনো কিছু সেভ করা হয়নি। ডিটেইলস পেজে বুকমার্ক চাপুন।" : "কোনো বিজ্ঞাপন নেই।"}
            </li>
          )}
          {rows.map((listing) => (
            <li key={listing.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3 ring-1 ring-line">
              <img src={listing.photos[0]} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-extrabold">
                  {listing.hostName}
                  {listing.mine ? <span className="ml-2 text-xs font-bold text-primary">আপনার</span> : null}
                </p>
                <p className="truncate text-xs text-muted">{listing.addressLine}</p>
                <p className="text-sm font-bold text-primary">
                  {formatBdt(listing.rent)} {rentSuffix(listing.unit)}
                  <span className="ml-2 font-semibold text-muted">{KIND_META[listing.kind].label}</span>
                </p>
              </div>
              <Link
                to="/post/$id"
                params={{ id: listing.id }}
                aria-label="সম্পাদনা"
                className="grid size-11 place-items-center rounded-full bg-chip"
              >
                <Pencil className="size-4" />
              </Link>
              <button
                type="button"
                aria-label="মুছুন"
                className="grid size-11 place-items-center rounded-full bg-danger-soft text-danger"
                onClick={() => setPending(listing)}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/post" className="inline-flex min-h-11 items-center rounded-xl bg-ink px-4 text-sm font-bold text-primary-ink">
            নতুন বিজ্ঞাপন
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-xl bg-surface px-4 text-sm font-bold ring-1 ring-line"
            onClick={() => {
              resetDemo();
              toast.success("নমুনা লিস্টিং ফিরিয়ে আনা হয়েছে");
            }}
          >
            নমুনা লিস্টিং রিসেট
          </button>
        </div>
      </div>

      <Modal
        open={Boolean(pending)}
        title="এই বিজ্ঞাপন মুছে ফেলবেন?"
        description={pending ? `${pending.hostName} — ${pending.addressLine}` : ""}
        onClose={() => setPending(null)}
      >
        <div className="flex gap-3">
          <button type="button" className="min-h-11 flex-1 rounded-xl bg-chip font-bold" onClick={() => setPending(null)}>
            না, থাক
          </button>
          <button
            type="button"
            className="min-h-11 flex-1 rounded-xl bg-danger font-bold text-primary-ink"
            onClick={() => {
              if (!pending) return;
              deleteListing(pending.id);
              setPending(null);
              toast.success("বিজ্ঞাপন মুছে ফেলা হয়েছে");
              void navigate({ to: "/account" });
            }}
          >
            হ্যাঁ, মুছুন
          </button>
        </div>
      </Modal>
    </PageShell>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold",
        active ? "bg-primary text-primary-ink" : "bg-surface text-ink ring-1 ring-line",
      )}
    >
      {children}
    </button>
  );
}
