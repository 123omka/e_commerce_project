import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-lg"> {/* BIGGER WIDTH */}
      <input
        type="text"
        placeholder="Search for products..."
        className="
          w-full 
          pl-12 pr-4 py-3  
          rounded-full 
          bg-gray-100 
          focus:bg-white 
          border border-gray-300 
          focus:border-black 
          focus:outline-none 
          text-lg 
          transition-all
        "
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
    </div>
  );
}
