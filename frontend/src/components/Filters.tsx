import { useCallback, useState } from "react";
import { FilterHeader, FiltersCategory, FiltersPrice, Sorting } from "./";
import { type FiltersProps } from "../lib/types";

const Filters = ({ iconHide, sortOptions, close }: FiltersProps) => {
  //
  ////DATA
  const [openFilters, setOpenFilters] = useState(false);

  ////LOGIC
  //open/close all filters
  const handleFiltersOpen = useCallback(() => {
    if (openFilters) return setOpenFilters(false);
    setOpenFilters(true);
  }, [openFilters]);

  //UI
  return (
    <div className="rounded-[20px] px-6 pb-6 pt-[20px] ring-1 ring-black ring-opacity-20 dark:bg-zinc-900">
      <FilterHeader
        title="Filters"
        onClick={handleFiltersOpen}
        state
        main
        iconHide={iconHide}
      />
      <hr className="mt-4 pb-6" />
      {sortOptions && <Sorting />}
      <FiltersCategory toggle={openFilters} close={close} />
      <hr className="pb-6" />
      <FiltersPrice toggle={openFilters} close={close} />
    </div>
  );
};

export default Filters;
