import ListPage from "./pages/ListPage";
import EnebaLogo from "./assets/eneba-logo.png";
import EnebaLogoText from "./assets/eneba-logo-w_text.png";
import { LT } from "country-flag-icons/react/3x2";
import { Heart, ShoppingCart, User } from "lucide-react";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import type { Game } from "./api/game";
import WishlistDropdown from "./pages/Wishlist";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Game[]>(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  function toggleWishlist(game: Game) {
    setWishlist((prev) => {
      const exists = prev.some((g) => g.id === game.id);
      return exists ? prev.filter((g) => g.id !== game.id) : [...prev, game];
    });
  }

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="bg-[#4707B2] min-h-screen">
      <div className="bg-[#6A47B7] h-4 flex items-center justify-center">
        <img className="h-1/2" src={EnebaLogo} />
        <p className="text-white ml-1 text-[8px]">
          Games, Gift Cards, Top-Ups & More | Best Deals
        </p>
      </div>
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center gap-6 mb-4">
          <img
            className="h-14 cursor-pointer"
            src={EnebaLogoText}
            onClick={() => setSearch("")}
          />
          <SearchBar
            onSearch={(q) => {
              setSearch(q);
              setPage(1);
            }}
          />
          <div className="text-white text-sm flex items-center gap-1">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded">
              <div className="h-5 w-5 rounded-full overflow-hidden">
                <LT className="h-full shrink-0" />
              </div>
              <span>English EU | EUR</span>
            </div>
            <div className="flex items-center gap-5 ml-30">
              <div className="relative cursor-pointer">
                <button
                  onClick={() => setWishlistOpen((v) => !v)}
                  className="cursor-pointer hover:text-purple-200"
                >
                  <Heart
                    fill={wishlistOpen ? "white" : "transparent"}
                    stroke={wishlistOpen ? "white" : "currentColor"}
                  />
                </button>
                {wishlistOpen && <WishlistDropdown items={wishlist} />}
              </div>
              <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-purple-200" />
              <div className="p-0.5 border-2 border-white rounded-full cursor-pointer hover:bg-white/10">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ListPage
            search={search}
            page={page}
            onPageChange={setPage}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
