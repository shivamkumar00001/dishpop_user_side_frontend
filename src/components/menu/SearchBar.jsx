import { Search } from "react-feather";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-5">
      <div
        className="relative bg-white border border-slate-200 
                   rounded-xl overflow-hidden
                   transition-all duration-200
                   focus-within:border-amber-400 focus-within:shadow-sm"
      >
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 
                     text-slate-400 pointer-events-none"
        />

        <input
          type="text"
          placeholder="Search dishes or cuisines"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 
                     bg-transparent outline-none
                     text-slate-800 placeholder:text-slate-400
                     text-sm font-medium"
        />
      </div>
    </div>
  );
}
