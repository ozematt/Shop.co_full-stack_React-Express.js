import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/queries";
import { Product } from ".";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { useLocation, matchPath } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { addCategorizedProducts, addProducts } from "../redux/productsSlice";
import { usePagedItems } from "../lib/hooks";
import { type ProductsFetchedData } from "../lib/types";

const ProductsList = () => {
  //
  ////DATA
  const { data: products } = useQuery<ProductsFetchedData>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { pathname } = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const { firstIndex, secondIndex } = usePagedItems(); // custom hook

  //global state
  const { filteredProductsByCategory, fetchedProducts, sortOptions } =
    useSelector((state: RootState) => state.products);

  //check if category is selected, if not display all products form state
  const [productsData, setProductsData] = useState(
    filteredProductsByCategory || fetchedProducts,
  );

  ////LOGIC
  //add products to global state
  useEffect(() => {
    if (fetchedProducts.products.length <= 1 && products) {
      dispatch(addProducts(products));
    }
  }, [dispatch, fetchedProducts, products]);

  //if location change, assign different products to the state
  useEffect(() => {
    if (pathname === "/shop") {
      setProductsData(fetchedProducts);
      dispatch(addCategorizedProducts(null)); //clear filtered products
    } else if (
      filteredProductsByCategory &&
      matchPath("/shop/:category", pathname)
    ) {
      setProductsData(filteredProductsByCategory);
    }
  }, [pathname, filteredProductsByCategory]);

  //set data after render
  useEffect(() => {
    if (filteredProductsByCategory) {
      setProductsData(filteredProductsByCategory);
    } else if (fetchedProducts) {
      setProductsData(fetchedProducts);
    }
  }, [filteredProductsByCategory, fetchedProducts]);

  //sorting products based on sortOption from global state
  const sortedProducts = useCallback(() => {
    const { field, direction } = sortOptions;

    const productsCopy = [...productsData.products];

    // helper function for sorting
    const compareFn = (a: any, b: any) => {
      if (field === "title") {
        return a.title.localeCompare(b.title);
      } else if (field === "price") {
        return direction === "asc" ? a.price - b.price : b.price - a.price;
      } else if (field === "rating") {
        return direction === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    };

    // sorting products
    return productsCopy.sort(compareFn);
  }, [sortOptions]);

  ////UI
  return sortedProducts()
    ?.slice(firstIndex, secondIndex)
    .map((product) => (
      <div
        key={product.id}
        className="m-0 scale-100 max-lg:m-[-20px] max-lg:scale-90 max-md:m-[-50px] max-md:scale-[0.7]"
      >
        <Product {...product} />
      </div>
    ));
};

export default ProductsList;
