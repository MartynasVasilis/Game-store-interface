export type Game = {
  id: number;
  title: string;
  platform: string;
  region: string;
  price: number;
  cover_url: string;
  cashback_cents?: number;
  likes: number;
};

export type ListResponse = {
  data: Game[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
};

export async function fetchGames(search: string, page = 1) {
  const params = new URLSearchParams({ page: page.toString(), limit: "8" });
  if (search) params.append("search", search);
  const res = await fetch(
    `https://game-store-interface-production.up.railway.app/list?${params}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }
  return res.json() as Promise<ListResponse>;
}
