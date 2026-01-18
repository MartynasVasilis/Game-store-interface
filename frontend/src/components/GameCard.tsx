import type { Game } from "../api/game";
import { Heart, History } from "lucide-react";

type Props = {
  game: Game;
  isLiked: boolean;
  onToggleLike: (game: Game) => void;
};

export default function GameCard({ game, isLiked, onToggleLike }: Props) {
  const platformIcons: Record<string, string> = {
    PC: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    "Xbox Series X":
      "https://i.pinimg.com/736x/69/af/1b/69af1b021e6fe4d37383f80cdaf0cc26.jpg",
    "Nintendo Switch":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Nintendo_switch_logo.png/800px-Nintendo_switch_logo.png",
    "PlayStation 5":
      "https://i.etsystatic.com/22852620/r/il/e93ec6/2663930898/il_1080xN.2663930898_g90m.jpg",
  };
  return (
    <div className="relative group bg-[#2a155f] overflow-hidden text-white hover:bg-[#3a257f] outline outline-cyan-500/50">
      <div className="relative">
        <img src={game.cover_url} className="w-full h-72 object-cover" />
        <div className="absolute bottom-5 bg-[#5FE3C1] text-black text-xs font-semibold px-2 py-1 flex items-center gap-1">
          <History size={13} />
          <p>CASHBACK</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md flex items-center justify-center gap-1.5 text-white font-medium">
          {platformIcons[game.platform] && (
            <img
              src={platformIcons[game.platform]}
              className="w-3 h-3 rounded"
            />
          )}
          <span className="text-[10px]">{game.platform}</span>
        </div>
      </div>
      <div className="p-3 flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-24 bg-inherit">
        <h3 className="text-[13px] font-bold h-10 line-clamp-2">
          {game.title}
        </h3>
        <div className="text-[13px] text-[#26AC8F] uppercase font-bold tracking-tight">
          {game.region}
        </div>
        <div className="text-[11px] text-gray-400 font-medium">From</div>
        <div className="flex items-center gap-1">
          <div className="text-[19px] font-extrabold">
            €{(game.price / 100).toFixed(2)}
          </div>
          <div className="w-3.5 h-3.5 border border-gray-500 rounded-full flex items-center justify-center text-[8px] text-gray-400">
            i
          </div>
        </div>
        {game.cashback_cents && (
          <div className="text-[11px] text-[#72C62F] font-bold">
            Cashback: €{(game.cashback_cents / 100).toFixed(2)}
          </div>
        )}
        <button className="flex items-center gap-1.5 text-gray-400 mt-2">
          <Heart
            size={14}
            className="cursor-pointer transition-transform active:scale-125"
            fill={isLiked ? "white" : "transparent"}
            stroke={isLiked ? "white" : "currentColor"}
            onClick={() => onToggleLike(game)}
          />
          <span className="text-[11px]">{game.likes + (isLiked ? 1 : 0)}</span>
        </button>
        <div className="max-h-0 mt-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 duration-300">
          <button className="w-full cursor-pointer bg-[#ffcc00] hover:bg-[#e6b800] text-black font-bold py-2 rounded-sm text-sm">
            Add to cart
          </button>
          <button className="w-full cursor-pointer border border-white hover:bg-white/10 text-white font-bold py-2 rounded-sm text-sm">
            View other offers
          </button>
        </div>
      </div>
    </div>
  );
}
