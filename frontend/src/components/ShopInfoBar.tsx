import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { useLocation } from "react-router-dom";
import { addCategoryName, addSortMethod } from "../redux/productsSlice";
import { settings, arrow, close } from "../assets";
import {
  CategoryName,
  FilterSettingsIcon,
  Filters,
  NumberOfProducts,
  SortByMethod,
} from "./";
import { type SortMethod } from "../lib/types";
import { sortingOptions } from "../constants";

const ShopInfoBar = () => {
  //
  ////DATA
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const [openSortByMenu, setOpenSortByMenu] = useState(false);
  const [sortBy, setSortBy] = useState("Alphabetical");

  const [filterOpen, setFilterOpen] = useState(false);

  ////LOGIC
  //when pathname is changing to "/shop" set category name in global state to ""
  useEffect(() => {
    if (pathname === "/shop") {
      dispatch(addCategoryName(""));
    }
  }, [pathname]);

  const handleSortChange = (option: SortMethod) => {
    setSortBy(option);
    setOpenSortByMenu(false);
    dispatch(addSortMethod(option));
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  ////UI
  return (
    <div className="relative flex items-center justify-between">
      <CategoryName />

      <div className="flex items-center pt-2 max-sm:text-[14px]">
        <NumberOfProducts />
        <FilterSettingsIcon onClick={handleFilterOpen} />
        <SortByMethod />
      </div>
      {filterOpen && (
        <>
          {" "}
          <div className="absolute top-[-70px] z-20 w-full rounded-2xl bg-white dark:bg-black">
            <img
              src={close}
              alt=""
              width={15}
              height={15}
              className="absolute right-5 top-7 cursor-pointer hover:scale-95 dark:invert"
              onClick={() => setFilterOpen(false)}
            />
            <Filters iconHide sortOptions close={handleFilterClose} />
          </div>
          <div className="fixed inset-0 z-10 bg-black opacity-50"></div>{" "}
        </>
      )}
    </div>
  );
};

export default ShopInfoBar;
