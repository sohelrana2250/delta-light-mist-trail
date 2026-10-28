import { ChevronDown, MapPin, Search, X } from "lucide-react";
import type { FormEvent } from "react";
import { KIND_META, type BudgetKey, type Kind, type SearchDraft, type Tenant } from "@/lib/catalog";
import { toBnDigits } from "@/lib/format";

const KINDS: { value: Kind | "all"; label: string }[] = [
  { value: "family-flat", label: KIND_META["family-flat"].searchLabel },
  { value: "all", label: "সব ধরন" },
  { value: "bachelor-mess", label: KIND_META["bachelor-mess"].searchLabel },
  { value: "sublet", label: KIND_META.sublet.searchLabel },
  { value: "female-hostel", label: KIND_META["female-hostel"].searchLabel },
  { value: "office", label: KIND_META.office.searchLabel },
];

const TENANTS: { value: Tenant | "all"; label: string }[] = [
  { value: "all", label: "যে কেউ (All)" },
  { value: "male", label: "পুরুষ (Male)" },
  { value: "female", label: "মহিলা (Female)" },
  { value: "family", label: "ফ্যামিলি" },
];

const BUDGETS: { value: BudgetKey; label: string }[] = [
  { value: "8-35", label: `${bdt(8000)} - ${bdt(35000)}` },
  { value: "all", label: "সব বাজেট" },
  { value: "8-15", label: `${bdt(8000)} - ${bdt(15000)}` },
  { value: "15-25", label: `${bdt(15000)} - ${bdt(25000)}` },
  { value: "25-35", label: `${bdt(25000)} - ${bdt(35000)}` },
  { value: "35+", label: `${bdt(35000)}+` },
];

const DATES = [
  { value: "from-now", label: "চলতি মাস হতে" },
  { value: "current", label: "শুধু চলতি মাস" },
  { value: "nov", label: "১ নভেম্বর হতে" },
  { value: "dec", label: "১ ডিসেম্বর হতে" },
  { value: "jan", label: "১ জানুয়ারি হতে" },
] as const;

function bdt(amount: number) {
  return `৳${toBnDigits(amount.toLocaleString("en-US"))}`;
}

export function SearchPanel({
  draft,
  onChange,
  onSubmit,
}: {
  draft: SearchDraft;
  onChange: (next: SearchDraft) => void;
  onSubmit: () => void;
}) {
  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl bg-surface p-2 shadow-md ring-1 ring-line lg:flex lg:items-stretch"
    >
      <label className="relative flex min-w-0 flex-1 basis-0 flex-col justify-center overflow-hidden border-b border-line px-3 py-2 lg:border-b-0 lg:border-r">
        <span className="text-xs font-medium text-muted">এলাকা বা রোড নং</span>
        <span className="mt-1 flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-primary" />
          <input
            value={draft.query}
            onChange={(event) => onChange({ ...draft, query: event.target.value })}
            placeholder="রোড, এলাকা বা নাম লিখুন"
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-ink outline-none"
          />
          {draft.query && (
            <button
              type="button"
              aria-label="এলাকা মুছুন"
              className="grid size-7 shrink-0 place-items-center rounded-full text-faint hover:bg-chip hover:text-ink"
              onClick={() => onChange({ ...draft, query: "" })}
            >
              <X className="size-4" />
            </button>
          )}
        </span>
      </label>
      <Field
        label="ভাড়ার ধরন"
        value={draft.kind}
        options={KINDS}
        onChange={(kind) => onChange({ ...draft, kind })}
      />
      <Field
        label="ভাড়াটিয়া"
        value={draft.tenant}
        options={TENANTS}
        onChange={(tenant) => onChange({ ...draft, tenant })}
      />
      <Field
        label="বাজেট (মাসিক)"
        value={draft.budget}
        options={BUDGETS}
        onChange={(budget) => onChange({ ...draft, budget })}
      />
      <Field
        label="কবে থেকে"
        value={draft.available}
        options={DATES.map((item) => ({ value: item.value, label: item.label }))}
        onChange={(available) => onChange({ ...draft, available })}
      />
      <button
        type="submit"
        className="m-1 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-ink hover:bg-primary-strong lg:self-center"
      >
        <Search className="size-4" />
        <span className="sm:hidden">Search Rooms / </span>
        বাসা খুঁজুন
      </button>
    </form>
  );
}

function Field<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="relative flex min-w-0 flex-1 basis-0 flex-col justify-center overflow-hidden border-b border-line px-3 py-2 lg:border-b-0 lg:border-r lg:border-line">
      <span className="text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="mt-1 w-full max-w-full appearance-none truncate bg-transparent pr-7 text-sm font-semibold text-ink outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
    </label>
  );
}
