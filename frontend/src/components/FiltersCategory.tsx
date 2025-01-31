import { useEffect, useMemo, useState } from "react";
import { RotatingArrow } from ".";
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
};

const FiltersCategory = ({ toggle }: FiltersCategoryProps) => {
  //
  ////DATA
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { category } = useParams();

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);

  //global state
  const { fetchedProducts: allProducts } = useSelector(
    (state: RootState) => state.products,
  );

  // fetch category list
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

  useEffect(() => {
    setCategoryOpen((prev) => !prev);
  }, [toggle]);

  ////UI
  return (
    <>
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
    </>
  );
};

export default FiltersCategory;
