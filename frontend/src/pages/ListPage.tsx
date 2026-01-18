import { fetchGames, type Game } from "../api/game";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ListPageProps = {
  search: string;
  page: number;
  onPageChange: (page: number) => void;
  wishlist: Game[];
  onToggleWishlist: (game: Game) => void;
};

export default function ListPage({
  search,
  page,
  onPageChange,
  wishlist,
  onToggleWishlist,
}: ListPageProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  useEffect(() => {
    fetchGames(search, page).then((response) => {
      setGames(response.data);
      setTotalGames(response.meta.total);
    });
  }, [search, page]);
  const totalPages = Math.ceil(totalGames / 12);
  return (
    <div>
      <div className="inline-flex gap-1 text-white">
        <h1>Results found: </h1>
        <div className="font-bold">{totalGames}</div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4 h-235">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isLiked={wishlist.some((g) => g.id === game.id)}
            onToggleLike={onToggleWishlist}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-6 text-white">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="w-12 h-12 flex items-center justify-center border border-white/30 rounded
               transition-colors
               hover:border-yellow-400 hover:text-yellow-400
               disabled:opacity-30 disabled:hover:border-white/30 disabled:hover:text-white/40"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex gap-4 text-lg font-semibold">
          <span className={page === 1 ? "text-yellow-400" : "text-white/60"}>
            1
          </span>
          <span className={page === 2 ? "text-yellow-400" : "text-white/60"}>
            2
          </span>
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="w-12 h-12 flex items-center justify-center border border-white/30 rounded
               transition-colors
               hover:border-yellow-400 hover:text-yellow-400
               disabled:opacity-30 disabled:hover:border-white/30 disabled:hover:text-white/40"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
