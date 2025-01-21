import { useState } from "react";
import { addSortMethod } from "../redux/productsSlice";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { arrow } from "../assets";
import { sortingOptions } from "../constants";

const Sorting = () => {
  //
  ////DATA
  const dispatch: AppDispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  ////UI
  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex cursor-pointer items-center justify-between"
      >
        <p className="font-satoshi text-[20px] font-bold">Sorting</p>
        <img
          src={arrow}
          width={20}
          height={20}
          alt="arrow"
          className="cursor-pointer opacity-60 hover:opacity-100 dark:invert"
          style={{
            transform: `rotate(${!open ? "180deg" : "0deg"})`,
          }}
        />
      </div>
      <div className="pb-6">
        {open &&
          sortingOptions.map((option) => (
            <div
              key={option}
              onClick={() => dispatch(addSortMethod(option))}
              className="flex items-center justify-between first:pt-6"
            >
              {" "}
              <p className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100">
                {option}
              </p>
            </div>
          ))}
      </div>
      <div className="border-t-2 pb-6" />
    </>
  );
};

export default Sorting;
