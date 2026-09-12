export interface CategoryMeta {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export const CATEGORIES_LIST: CategoryMeta[] = [
  {
    id: 1,
    name: "Audio & Sound",
    slug: "audio",
    description: "High-fidelity headphones, studio monitors, wireless earbuds, and precision DACs.",
  },
  {
    id: 2,
    name: "Computing & Workspace",
    slug: "computing",
    description: "Mechanical keyboards, ergonomic mice, 4K displays, and workstation docks.",
  },
  {
    id: 3,
    name: "Smart Gear & Wearables",
    slug: "wearables",
    description: "Aerospace titanium smartwatches, MagSafe charging stations, and smart light bars.",
  },
  {
    id: 4,
    name: "Gaming & Controllers",
    slug: "gaming",
    description: "Pro gaming peripherals, controllers, gaming chairs, capture cards, and high-refresh displays.",
  },
  {
    id: 5,
    name: "Networking & Smart Home",
    slug: "networking",
    description: "Wi-Fi 7 mesh routers, smart home hubs, IP cameras, NAS storage, and connected home automation.",
  },
  {
    id: 6,
    name: "Power & Mobile Gear",
    slug: "power",
    description: "Ultra-fast GaN chargers, high-capacity laptop power banks, solar generators, and rugged cables.",
  },
  {
    id: 7,
    name: "Cameras & Creator Studio",
    slug: "cameras",
    description: "4K action cameras, studio broadcast mics, AI tracking webcams, motorized gimbals, and ring lights.",
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  if (!slug) return undefined;
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return CATEGORIES_LIST.find(
    (c) =>
      c.slug === normalized ||
      c.name.toLowerCase() === normalized ||
      (normalized === "clothing" && c.id === 1) ||
      (normalized === "accessories" && c.id === 2) ||
      (normalized === "electronics" && c.id === 3)
  );
}

export function getCategorySlug(categoryNameOrId: string | number): string {
  if (typeof categoryNameOrId === "number") {
    const found = CATEGORIES_LIST.find((c) => c.id === categoryNameOrId);
    return found?.slug || "all";
  }
  const found = getCategoryBySlug(categoryNameOrId);
  return found?.slug || "all";
}
