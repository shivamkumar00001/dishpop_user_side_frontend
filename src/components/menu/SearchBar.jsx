import { Search } from "react-feather";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-4">
      <div className="relative backdrop-blur-xl bg-white/50 border border-white/40 shadow-md rounded-2xl">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          placeholder="Search dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-gray-800"
        />
      </div>
    </div>
  );
}
