import { useEffect, useMemo, useState } from "react";
import { FilterHeader } from ".";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesList } from "../api/queries";
import { Product } from "../lib/types";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import {
  addCategorizedProducts,
  addCategoryName,
} from "../redux/productsSlice";

type FiltersCategoryProps = {
  toggle: boolean;
  close?: () => void;
};

const FiltersCategory = ({ toggle, close }: FiltersCategoryProps) => {
  //
  ////DATA
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { category } = useParams();

  const [open, setOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const { fetchedProducts: allProducts } = useSelector(
    (state: RootState) => state.products,
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesList,
  });

  ////LOGIC
  const categorizedProducts: Product[] = useMemo(
    () =>
      allProducts.products.filter(
        (product) => product.category === selectedCategory,
      ),
    [allProducts.products, selectedCategory],
  );

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

  //toggle open state if filter icon was clicked
  useEffect(() => {
    if (toggle) return setOpen(true);
    setOpen(false);
  }, [toggle]);

  const handleHeaderClick = () => {
    setOpen(!open), setSelectedCategory("");
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/shop/${category}`);
    setSelectedCategory(category);
    close?.();
  };

  ////UI
  return (
    <>
      <FilterHeader title="Category" onClick={handleHeaderClick} state={open} />
      <div className="pb-6">
        {open &&
          categories?.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between first:pt-6"
              onClick={() => handleCategoryClick(category)}
            >
              <p className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default FiltersCategory;
