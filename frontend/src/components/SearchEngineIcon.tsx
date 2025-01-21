import { useEffect, useRef, useState } from "react";
import { lupeIcon } from "../assets";
import { SearchEngine } from "./";
import { useLocation } from "react-router-dom";

const SearchEngineIcon = () => {
  //
  ////DATA
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  ////LOGIC
  //handle click outside search engine
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //close search engine when pathname has change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  ////UI
  return (
    <>
      <img
        src={lupeIcon}
        onClick={() => setOpen(!open)}
        alt="lupe icon"
        width={24}
        height={24}
        className="hidden cursor-pointer hover:opacity-60 max-[837px]:block dark:invert"
      />
      {open ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="absolute h-full w-full bg-black bg-opacity-70" />
          <div ref={ref} className="z-30 mx-7 w-full max-w-[400px]">
            <SearchEngine />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchEngineIcon;
