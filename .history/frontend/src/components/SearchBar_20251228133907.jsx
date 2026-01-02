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