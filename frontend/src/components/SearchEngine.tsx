import { useEffect, useRef, useState } from "react";
import { useDebounce, useRedirectToProduct } from "../lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/queries";
import {
  type ProductsFetchedData,
  type FilteredProduct,
  type SelectedProduct,
} from "../lib/types";

const SearchEngine = () => {
  //
  ////DATA
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<FilteredProduct[]>(
    [],
  );

  const { debouncedValue } = useDebounce(searchValue, 300); // debounce custom hook
  const { handleProductClick } = useRedirectToProduct(); // redirect to product details custom hook

  const ref = useRef<HTMLDivElement>(null);

  //fetch products date
  const { data } = useQuery<ProductsFetchedData>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  //creating products list for search engine
  const searchData =
    data?.products.map((product) => ({
      id: product.id,
      title: product.title,
      category: product.category,
    })) || [];

  ////LOGIC
  //set array of filtered products included debounced Value
  useEffect(() => {
    // protection against empty value
    if (debouncedValue.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    if (searchData.length > 0) {
      const filtered = searchData.filter((product) =>
        product.title.toLowerCase().includes(debouncedValue.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [debouncedValue]);

  //handle click outside search engine
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFilteredProducts([]); // clear filtered products array
        setSearchValue(""); // clear search value
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRedirectToProductDetails = (product: SelectedProduct) => {
    setSearchValue("");
    handleProductClick(product);
  };

  ////UI
  return (
    <>
      <div ref={ref} className="relative w-full max-w-[450px]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder=" Search for products..."
          className="mt-1 h-[48px] w-full max-w-[577px] rounded-full bg-grayBG bg-lupe-icon bg-[center_left_1.5rem] bg-no-repeat pl-[57px] focus:outline-none focus:ring-1 focus:ring-black dark:bg-zinc-600 dark:focus:ring-2 dark:focus:ring-orange-700"
        />

        {filteredProducts.length > 0 ? (
          <div className="scrollbar-hide absolute inset-0 left-0 top-[53px] z-20 h-[100px] overflow-auto rounded-xl bg-grayBG opacity-80 ring-1 ring-black dark:bg-zinc-600">
            <ul className="font-satoshi">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleRedirectToProductDetails(product)}
                  className="cursor-pointer px-9 py-2 hover:bg-grayBG hover:brightness-110 dark:hover:bg-zinc-600"
                >
                  {product.title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SearchEngine;
