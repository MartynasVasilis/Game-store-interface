import { useState } from "react";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
  }

  function clearSearch() {
    setValue("");
    onSearch("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex grow">
      <div
        className="flex items-center w-full gap-2 px-3 h-12
                   border border-white"
      >
        <Search size={18} className="text-white/70" />
        <input
          type="text"
          placeholder="Search games..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 outline-none text-white placeholder-white/60"
        />
        {value && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
}
