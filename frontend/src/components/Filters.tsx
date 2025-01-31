import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesList } from "../api/queries";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import {
  addCategorizedProducts,
  addCategoryName,
} from "../redux/productsSlice";
import { RotatingArrow, Sorting } from "./";
import { settings, arrow } from "../assets";
import { type Product, type FiltersProps } from "../lib/types";

const Filters = ({ iconHide, sortOptions, close }: FiltersProps) => {
  //
  ////DATA
  const { category } = useParams();

  const [priceOpen, setPriceOpen] = useState(true); //price filter open/close
  const [categoryOpen, setCategoryOpen] = useState(true); //category filter open/close
  const [selectedCategory, setSelectedCategory] = useState(category); //selected category name, initial from url
  const [priceRange, setPriceRange] = useState({
    from: "",
    to: "",
  });

  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  //global state
  const { fetchedProducts: allProducts, filteredProductsByCategory } =
    useSelector((state: RootState) => state.products);

  // fetch category list
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesList,
  });

  ////LOGIC
  //open/close all filters
  const handleFiltersOpen = useCallback(() => {
    if (priceOpen && categoryOpen) {
      setCategoryOpen(false);
      setPriceOpen(false);
    } else {
      setCategoryOpen(true);
      setPriceOpen(true);
    }
  }, [priceOpen, categoryOpen]);

  //filtered products by category
  const categorizedProducts: Product[] = useMemo(
    () =>
      allProducts.products.filter(
        (product) => product.category === selectedCategory,
      ),
    [allProducts.products, selectedCategory],
  );

  //when selected category will change, updated filtered product list in global state and add actual category name
  useEffect(() => {
    if (selectedCategory) {
      const dataToAdd = {
        products: categorizedProducts,
        total: categorizedProducts.length,
        skip: 0,
        limit: 0,
      };
      dispatch(addCategorizedProducts(dataToAdd));
      dispatch(addCategoryName(selectedCategory ?? selectedCategory));
    }
  }, [selectedCategory]);

  //helper function
  const filterByPriceRange = (products: Product[], from: number, to: number) =>
    products.filter((product) => product.price >= from && product.price <= to);

  //filter products with price range
  const handleFilterApply = useCallback(() => {
    const actualProducts = filteredProductsByCategory || allProducts; //assign actual products

    const from = Number(priceRange.from) || 0;
    const to = Number(priceRange.to) || Infinity;

    if (from > to) {
      console.error("Invalid price range: 'from' cannot be greater than 'to'.");
      return;
    }

    //used helper function
    const priceRangedProducts = filterByPriceRange(
      actualProducts.products,
      from,
      to,
    );
    //creating relevant data to add
    const dataToAdd = {
      products: priceRangedProducts,
      total: priceRangedProducts.length,
      skip: 0,
      limit: 0,
    };

    // Close filter window if needed
    close?.();

    //add relevant data
    dispatch(addCategorizedProducts(dataToAdd));
  }, [filteredProductsByCategory, allProducts, priceRange, dispatch]);

  //UI
  return (
    <div className="rounded-[20px] px-6 pb-6 pt-[20px] ring-1 ring-black ring-opacity-20 dark:bg-zinc-900">
      <div className="flex items-center justify-between pb-6">
        {/*  filter header */}
        <p className="font-satoshi text-[20px] font-bold">Filters</p>
        <img
          src={settings}
          width={24}
          height={24}
          alt="settings"
          className={`-rotate-90 ${iconHide ? "hidden" : ""} cursor-pointer opacity-60 hover:opacity-100 dark:invert`}
          onClick={handleFiltersOpen}
        />
      </div>

      {/* filter method */}
      <div className="border-t-2 pb-6" />
      {sortOptions ? <Sorting /> : null}

      {/* CATEGORY */}
      <div
        onClick={() => {
          setCategoryOpen(!categoryOpen), setSelectedCategory("");
        }}
        className="flex cursor-pointer items-center justify-between"
      >
        <p className="font-satoshi text-[20px] font-bold">Category</p>
        <RotatingArrow rotateOn={categoryOpen} />
      </div>

      <div className="pb-6">
        {categoryOpen &&
          categories?.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between first:pt-6"
              onClick={() => {
                navigate(`/shop/${category}`), setSelectedCategory(category);
              }}
            >
              {" "}
              <p className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            </div>
          ))}
      </div>
      <div className="border-t-2 pb-6" />
      {/* PRICE */}
      <div
        onClick={() => setPriceOpen(!priceOpen)}
        className="flex cursor-pointer items-center justify-between pb-6"
      >
        <p className="font-satoshi text-[20px] font-bold">Price</p>
        <RotatingArrow rotateOn={priceOpen} />
      </div>
      {priceOpen && (
        <div className="flex gap-2 pb-6">
          <input
            value={priceRange.from}
            name="from"
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="h-7 w-full max-w-[120px] rounded-sm pl-2 ring-1 ring-black ring-opacity-20 placeholder:text-sm focus:outline-none focus:ring-black dark:bg-zinc-700"
            placeholder="from:"
          />
          <input
            value={priceRange.to}
            name="to"
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="h-7 w-full max-w-[120px] rounded-sm pl-2 ring-1 ring-black ring-opacity-20 placeholder:text-sm focus:outline-none focus:ring-black dark:bg-zinc-700"
            placeholder="to:"
          />
        </div>
      )}

      <div className="border-t-2 pb-6" />
      <button
        onClick={handleFilterApply}
        className="w-full rounded-full bg-black px-[86px] py-[15px] text-[14px] text-white transition duration-100 ease-in-out hover:scale-95 dark:bg-white dark:text-black"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filters;
