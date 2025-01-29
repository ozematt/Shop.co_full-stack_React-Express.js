import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { useLocation } from "react-router-dom";
import {
  SortMethod,
  addCategoryName,
  addSortMethod,
} from "../redux/productsSlice";
import { settings, arrow, closeBlack } from "../assets";
import { Filters } from "./";
import { type ShopInfoBarProps } from "../lib/types";
import { sortingOptions } from "../constants";

const ShopInfoBar = ({ total, first, second }: ShopInfoBarProps) => {
  //
  ////DATA
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Alphabetical");

  const [filterOpen, setFilterOpen] = useState(false);

  //global state of added category name
  const categoryName = useSelector(
    (state: RootState) => state.products.categoryName,
  );

  ////LOGIC
  //when pathname is changing to "/shop" set category name in global state to ""
  useEffect(() => {
    if (pathname === "/shop") {
      dispatch(addCategoryName(""));
    }
  }, [pathname]);

  const handleSortChange = (option: SortMethod) => {
    setSortBy(option);
    setOpen(false);
    dispatch(addSortMethod(option));
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  ////UI
  return (
    <div className="relative flex items-center justify-between">
      <h3 className="font-satoshi text-2xl font-bold sm:text-[32px]">
        {categoryName ? categoryName : "Products"}
      </h3>
      <div className="flex items-center pt-2 max-sm:text-[14px]">
        {" "}
        <p className="font-satoshi opacity-60 sm:pt-2">
          Showing {first}-{second} of {total} Products{" "}
          <span className="hidden pl-1 xl:inline">Sort by:</span>
        </p>
        {/* SETTINGS ICON */}
        <img
          src={settings}
          alt="settings"
          width={34}
          height={34}
          onClick={() => setFilterOpen(!filterOpen)}
          className="mb-[-3px] ml-5 hidden -rotate-90 cursor-pointer rounded-full bg-grayBG p-[7px] opacity-80 hover:opacity-100 max-xl:block"
        />
        <span
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center pl-2 pt-2 font-satoshi font-bold max-xl:hidden"
        >
          {sortBy}
          <img
            src={arrow}
            width={16}
            height={16}
            alt="arrow"
            className="px-[2px]"
            style={{
              transform: `rotate(${!open ? "180deg" : "0deg"})`,
            }}
          />
        </span>
        {open && (
          <ul className="absolute right-[-5px] top-[50px] z-10 w-[130px] rounded-[5px] bg-white bg-opacity-85 pl-3 pt-1 ring-1 ring-black ring-opacity-20">
            {sortingOptions.map((option) => (
              <li
                key={option}
                className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
                onClick={() => handleSortChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {filterOpen && (
        <>
          {" "}
          <div className="absolute top-[-70px] z-20 w-full rounded-2xl bg-white dark:bg-black">
            <img
              src={closeBlack}
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
