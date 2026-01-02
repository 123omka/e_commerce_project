import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-full-xs">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-3 py-2 rounded-full bg-gray-100 focus:bg-white border border-gray-300 focus:border-black focus:outline-none transition-all"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
  );
}
