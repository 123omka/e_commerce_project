import React from "react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const debounced = useDebounce(query, 500);

  useEffect(() => {
    dispatch(fetchProducts({ search: debounced }));
  }, [debounced, dispatch]);


  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={()=>setQuery(e.target.value)}
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
