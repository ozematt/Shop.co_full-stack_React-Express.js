import { useState } from "react";
import { sortingOptions } from "../constants";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { SortMethod } from "../lib/types";
import { addSortMethod } from "../redux/productsSlice";

const SortByMenu = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Alphabetical");

  const handleSortChange = (option: SortMethod) => {
    setSortBy(option);
    setOpen(false);
    dispatch(addSortMethod(option));
  };

  return (
    <ul
      className={`absolute right-[-12px] text-lg ${open ? "block" : "hidden"} top-[50px] z-10 bg-white text-center ring-1 ring-black`}
    >
      <div className="absolute right-4 top-[-7px] z-40 h-3 w-3 rotate-45 border-l-[1px] border-t-[1px] border-black bg-white" />
      {sortingOptions.map((option) => (
        <li
          key={option}
          className="relative z-50 cursor-pointer px-6 py-3 font-satoshi hover:bg-slate-200"
          onClick={() => handleSortChange(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default SortByMenu;
