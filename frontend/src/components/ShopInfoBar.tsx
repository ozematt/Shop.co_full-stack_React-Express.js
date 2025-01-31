import { useEffect } from "react";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { useLocation } from "react-router-dom";
import { addCategoryName } from "../redux/productsSlice";
import {
  CategoryName,
  FilterSettingsIcon,
  FilterWindow,
  NumberOfProducts,
  SortByMethod,
} from "./";
import { useFilterWindow } from "../lib/hooks";

const ShopInfoBar = () => {
  //
  ////DATA
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const { filterWindowOpen, handleFilterOpen } = useFilterWindow();

  ////LOGIC
  //when pathname is changing to "/shop" set category name in global state to ""
  useEffect(() => {
    if (pathname === "/shop") {
      dispatch(addCategoryName(""));
    }
  }, [pathname]);

  ////UI
  return (
    <div className="relative flex items-center justify-between">
      <CategoryName />

      <div className="flex items-center pt-2 max-sm:text-[14px]">
        <NumberOfProducts />
        <FilterSettingsIcon onClick={handleFilterOpen} />
        <SortByMethod />
      </div>
      <FilterWindow onClick={handleFilterOpen} open={filterWindowOpen} />
    </div>
  );
};

export default ShopInfoBar;
