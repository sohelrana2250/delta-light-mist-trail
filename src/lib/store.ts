import { create } from "zustand";
import {
  cloneSeed,
  type AreaId,
  type Listing,
  type SearchDraft,
  type SortKey,
} from "@/lib/catalog";

export interface Profile {
  name: string;
  phone: string;
}

interface RoomsState {
  listings: Listing[];
  savedIds: string[];
  profile: Profile;
  hydrated: boolean;
  area: AreaId | "all";
  sort: SortKey;
  applied: SearchDraft | null;
  visibleCount: number;
  setArea: (area: AreaId | "all") => void;
  setSort: (sort: SortKey) => void;
  applySearch: (draft: SearchDraft) => void;
  resetBrowse: () => void;
  loadMore: () => void;
  addListing: (listing: Listing) => void;
  updateListing: (id: string, listing: Listing) => void;
  deleteListing: (id: string) => void;
  toggleSaved: (id: string) => void;
  setProfile: (profile: Profile) => void;
  resetDemo: () => void;
}

const STORAGE_KEY = "dhanmondi-rooms-v1";

function isListing(value: unknown): value is Listing {
  if (!value || typeof value !== "object") return false;
  const listing = value as Partial<Listing>;
  return (
    typeof listing.id === "string" &&
    typeof listing.hostName === "string" &&
    Array.isArray(listing.photos) &&
    typeof listing.rent === "number" &&
    typeof listing.kind === "string"
  );
}

export const useRooms = create<RoomsState>((set) => ({
  listings: cloneSeed(),
  savedIds: [],
  profile: { name: "", phone: "" },
  hydrated: false,
  area: "all",
  sort: "featured",
  applied: null,
  visibleCount: 6,
  setArea: (area) => set({ area, visibleCount: 6 }),
  setSort: (sort) => set({ sort, visibleCount: 6 }),
  applySearch: (applied) => set({ applied, visibleCount: 6 }),
  resetBrowse: () => set({ area: "all", sort: "featured", applied: null, visibleCount: 6 }),
  loadMore: () => set((state) => ({ visibleCount: state.visibleCount + 6 })),
  addListing: (listing) => set((state) => ({ listings: [listing, ...state.listings] })),
  updateListing: (id, listing) =>
    set((state) => ({
      listings: state.listings.map((item) => (item.id === id ? listing : item)),
    })),
  deleteListing: (id) =>
    set((state) => ({
      listings: state.listings.filter((item) => item.id !== id),
      savedIds: state.savedIds.filter((saved) => saved !== id),
    })),
  toggleSaved: (id) =>
    set((state) => ({
      savedIds: state.savedIds.includes(id)
        ? state.savedIds.filter((saved) => saved !== id)
        : [...state.savedIds, id],
    })),
  setProfile: (profile) => set({ profile }),
  resetDemo: () =>
    set((state) => {
      const seedIds = new Set(cloneSeed().map((listing) => listing.id));
      const custom = state.listings.filter((listing) => listing.mine && !seedIds.has(listing.id));
      return { listings: [...custom, ...cloneSeed()] };
    }),
}));

let started = false;

export function startPersistence() {
  if (started || typeof window === "undefined") return;
  started = true;

  useRooms.subscribe((state, prev) => {
    if (!state.hydrated) return;
    if (
      state.listings === prev.listings &&
      state.savedIds === prev.savedIds &&
      state.profile === prev.profile
    ) {
      return;
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        v: 1,
        listings: state.listings,
        savedIds: state.savedIds,
        profile: state.profile,
      }),
    );
  });

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as {
        v?: number;
        listings?: unknown;
        savedIds?: unknown;
        profile?: Partial<Profile>;
      };
      if (data.v === 1 && Array.isArray(data.listings)) {
        const listings = data.listings.filter(isListing);
        useRooms.setState({
          listings,
          savedIds: Array.isArray(data.savedIds)
            ? data.savedIds.filter((id): id is string => typeof id === "string")
            : [],
          profile: {
            name: typeof data.profile?.name === "string" ? data.profile.name : "",
            phone: typeof data.profile?.phone === "string" ? data.profile.phone : "",
          },
          hydrated: true,
        });
        return;
      }
    }
  } catch {
    // Ignore unreadable storage and keep the seeded catalogue.
  }
  useRooms.setState({ hydrated: true });
}
