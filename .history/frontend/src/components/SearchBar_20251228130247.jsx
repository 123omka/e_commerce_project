import React from "react";
import { Search } from "lucide-react";


export default function SearchBar() {
  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search for products..."
        className="
          w-full 
          pl-12 pr-4 py-3  
          rounded-full 
          bg-gray-100 
          shadow-sm
          focus:shadow-md
          focus:bg-white 
          border border-gray-300 
          focus:border-black 
          text-lg 
          transition-all
        "
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
    </div>
  );
}
