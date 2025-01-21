import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { arrowLeft, arrowRight } from "../assets";
import { generatePagination } from "../lib/helpers/generatePagination";
import { type PaginationBarProps } from "../lib/types";

const PaginationBar = ({ total, page }: PaginationBarProps) => {
  //
  ////DATA
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(page); //local selected page number

  const items = Math.ceil(total / 9); //numbers of pages
  const pageNumbers = generatePagination(page, items); // dynamically created table of page numbers

  ////LOGIC
  const handleSelectedPageNumber = useCallback(
    (number: number) => {
      navigate(`?page=${number}`);
      setPageNumber(number);
    },
    [navigate, pageNumber],
  );

  const handlePrevious = useCallback(() => {
    const newPage = Math.max(pageNumber - 1, 1); //prevent exceeding the minimum number of pages
    setPageNumber(newPage); //set new page number in local state
    navigate(`?page=${newPage}`); // upload new page to url, so Shop component can use it
  }, [navigate, pageNumber]);

  const handleNext = useCallback(() => {
    const newPage = Math.min(pageNumber + 1, items); //prevent exceeding the maximum number of pages
    setPageNumber(newPage); //set new page number in local state
    navigate(`?page=${newPage}`); // upload new page to url, so Shop component can use it
  }, [navigate, pageNumber]);

  ////UI
  return (
    <div className="mt-[20px] flex justify-between">
      <button
        onClick={handlePrevious}
        className="flex items-center rounded-lg px-[14px] py-2 font-satoshi text-sm font-medium ring-1 ring-black ring-opacity-20 transition duration-200 ease-in-out hover:scale-95 active:scale-105 dark:ring-white"
      >
        <img src={arrowLeft} alt="arrow left" className="pr-3 dark:invert" />
        Previous
      </button>

      <div className="mx-auto hidden space-x-2 md:block">
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() =>
              number !== "..." && handleSelectedPageNumber(Number(number))
            }
            className="h-[40px] w-[40px] rounded-[8px] font-satoshi text-xs font-medium opacity-50 hover:bg-grayBG hover:opacity-100 md:text-sm dark:hover:text-black"
            style={{
              ...(number === pageNumber
                ? { background: "#f0f0f0", opacity: "100%", color: "black" }
                : {}),
              ...(number === "..."
                ? { background: "none", cursor: "auto" }
                : {}),
            }}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="flex items-center rounded-lg px-[14px] py-5 font-satoshi text-sm font-medium ring-1 ring-black ring-opacity-20 transition duration-200 ease-in-out hover:scale-95 active:scale-105 md:py-2 dark:ring-white"
      >
        {" "}
        Next
        <img src={arrowRight} alt="" className="pl-3 dark:invert" />
      </button>
    </div>
  );
};

export default PaginationBar;
