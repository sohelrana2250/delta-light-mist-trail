import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Facebook,
  House,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import type { AreaId } from "@/lib/catalog";
import { useRooms } from "@/lib/store";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-ink">
        <House className="size-6" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-lg font-extrabold leading-none tracking-tight">
          Dhanmondi Rooms
        </span>
        {!compact && (
          <span className="mt-1 block truncate text-xs font-semibold uppercase tracking-wide text-muted">
            Find your room, in Dhanmondi
          </span>
        )}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 min-w-0 border-b border-line/80 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <Link
            to="/account"
            className="hidden min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-primary-soft py-1 pl-1 pr-4 text-primary sm:inline-flex"
          >
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-ink">
              <UserRound className="size-4" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-xs font-extrabold tracking-wide">MY ACCOUNT</span>
              <span className="block text-xs font-semibold">অ্যাকাউন্ট / লগইন</span>
            </span>
          </Link>
          <Link
            to="/post"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-primary-ink sm:inline-flex"
          >
            <Plus className="size-4" />
            বিজ্ঞাপন দিন
            <span className="rounded-full bg-whatsapp px-2 py-0.5 text-xs font-extrabold">FREE</span>
          </Link>
          <Link
            to="/account"
            aria-label="আমার অ্যাকাউন্ট"
            className="grid size-11 place-items-center rounded-full bg-primary text-primary-ink sm:hidden"
          >
            <UserRound className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PostFab() {
  return (
    <Link
      to="/post"
      className="fixed bottom-4 right-4 z-30 flex max-w-xs items-center gap-2 rounded-full bg-primary py-2 pl-2 pr-3 text-primary-ink shadow-lg"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-ink/15">
        <House className="size-5" />
      </span>
      <span className="min-w-0 text-left text-xs font-bold leading-tight sm:text-sm">
        বাকি বাসা খুঁজে না পেলে
        <span className="block">আপনারও বাসা লিস্ট করুন</span>
      </span>
      <span className="shrink-0 rounded-full bg-whatsapp px-2 py-0.5 text-xs font-extrabold">FREE</span>
      <ChevronRight className="size-4 shrink-0" />
    </Link>
  );
}

function FooterLink({
  children,
  to,
  area,
}: {
  children: ReactNode;
  to?: "/" | "/post" | "/account";
  area?: AreaId;
}) {
  const setArea = useRooms((state) => state.setArea);
  const navigate = useNavigate();
  if (area) {
    return (
      <button
        type="button"
        className="block py-1 text-left text-sm font-medium text-muted hover:text-primary"
        onClick={() => {
          setArea(area);
          void navigate({ to: "/" });
        }}
      >
        {children}
      </button>
    );
  }
  if (!to) return null;
  return (
    <Link to={to} className="block py-1 text-sm font-medium text-muted hover:text-primary">
      {children}
    </Link>
  );
}

export function SiteFooter({ pad = true }: { pad?: boolean }) {
  return (
    <footer className="mt-16 min-w-0 border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo compact />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Need a room, flat, sublet or roommate in Dhanmondi, Dhaka? Browse 100% verified listings,
            call the host directly, or post your own room with zero brokerage.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
          <div>
            <h2 className="text-sm font-extrabold">জরুরি লিংক</h2>
            <div className="mt-3">
              <FooterLink to="/">হোম পেজ</FooterLink>
              <Link to="/" hash="listings" className="block py-1 text-sm font-medium text-muted hover:text-primary">
                বাসা খুঁজুন
              </Link>
              <FooterLink to="/post">বিজ্ঞাপন দিন (ফ্রি)</FooterLink>
              <InfoLink slug="guide">ভাড়াটিয়া নির্দেশিকা</InfoLink>
              <InfoLink slug="safety">সেফটি টিপস</InfoLink>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold">জনপ্রিয় এলাকা</h2>
            <div className="mt-3">
              <FooterLink area="r27">ধানমন্ডি ২৭ নম্বর</FooterLink>
              <FooterLink area="r9a">ধানমন্ডি ৯/এ</FooterLink>
              <FooterLink area="r15">ধানমন্ডি ১৫ রোড</FooterLink>
              <FooterLink area="r8a">ধানমন্ডি ৮/এ</FooterLink>
              <FooterLink area="shankar">শংকর ও পশ্চিম ধানমন্ডি</FooterLink>
              <Link to="/info/$slug" params={{ slug: "areas" }} className="mt-1 block py-1 text-sm font-bold text-primary">
                সকল রোড দেখুন →
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold">আইন ও নীতিবলী</h2>
            <div className="mt-3">
              <InfoLink slug="terms">ব্যবহারের শর্তাবলী</InfoLink>
              <InfoLink slug="privacy">গোপনীয়তা নীতি</InfoLink>
              <InfoLink slug="ads">বিজ্ঞাপন ও বাড়িওয়ালা নীতি</InfoLink>
              <InfoLink slug="fraud">প্রতারণা প্রতিরোধ নীতি</InfoLink>
              <InfoLink slug="community">কমিউনিটি গাইডলাইন</InfoLink>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold">যোগাযোগ ও সাপোর্ট</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                হেল্পলাইন: ০৯৬৯৬-XXXXXXX
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a className="font-medium break-all hover:text-primary" href="mailto:support@dhanmondirooms.bd">
                  support@dhanmondirooms.bd
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {[
                { icon: Facebook, name: "Facebook" },
                { icon: Instagram, name: "Instagram" },
                { icon: Linkedin, name: "LinkedIn" },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={item.name}
                  className="grid size-10 place-items-center rounded-full bg-chip text-ink hover:bg-primary-soft hover:text-primary"
                  onClick={() => toast("সোশ্যাল পেজ শীঘ্রই যুক্ত হবে")}
                >
                  <item.icon className="size-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className={`mx-auto w-full max-w-6xl px-4 py-4 text-xs text-faint ${pad ? "pb-24" : "pb-4"}`}>
          © ২০২৬ Dhanmondi Rooms. সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>
    </footer>
  );
}

function InfoLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link
      to="/info/$slug"
      params={{ slug }}
      className="block py-1 text-sm font-medium text-muted hover:text-primary"
    >
      {children}
    </Link>
  );
}

export function PageShell({ children, fab = true }: { children: ReactNode; fab?: boolean }) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader />
      <div className="min-w-0 flex-1">{children}</div>
      <SiteFooter />
      {fab ? <PostFab /> : null}
    </div>
  );
}
