import type { Game } from "../api/game";

type Props = {
  items: Game[];
};

export default function WishlistDropdown({ items }: Props) {
  return (
    <div className="absolute top-10 w-64 bg-[#2a155f] rounded p-3 z-50">
      <h3 className="text-white font-bold mb-2">Wishlist</h3>

      {items.length === 0 && (
        <p className="text-gray-400 text-sm">No items yet</p>
      )}

      <ul className="space-y-2">
        {items.map((game) => (
          <li key={game.id} className="text-white text-sm">
            • {game.title}{" "}
            <div className="text-yellow-400">{`€${(game.price / 100).toFixed(2)}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
