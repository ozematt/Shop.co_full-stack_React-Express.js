import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePanelOpen } from "../lib/hooks";
import { navLinks } from "../constants";
import { hamburger } from "../assets";

const HamburgerMenu = () => {
  //
  ////DATA
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //custom hook
  const { open, setOpen } = usePanelOpen({ refValue: menuRef });

  const handleClick = useCallback(
    (id: string) => {
      navigate("/");

      // Scrolling to element id after page load
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // delay to make sure the page has loaded
    },
    [navigate],
  );

  ////UI
  return (
    <div ref={menuRef}>
      <img
        src={hamburger}
        alt="hamburger menu"
        width={24}
        height={24}
        onClick={() => setOpen((prevState) => !prevState)}
        className="mr-4 min-w-[24px] cursor-pointer pb-[6px] hover:opacity-60 sm:min-w-[30px] min-[1192px]:hidden dark:invert"
      />

      <div
        className={`${open ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 z-50 h-[100vh] w-[40vw] transform bg-stone-200 shadow-lg transition-transform duration-300`}
      >
        <ul className="text-xl text-black lg:p-10">
          <p className="pb-4 pl-4 pt-4 font-bold">MENU</p>
          <hr className="border-b-1 border-stone-400" />
          <li
            onClick={() => navigate("/shop")}
            className="hover: cursor-pointer pb-2 pl-4 pt-2 font-satoshi hover:bg-stone-100"
          >
            Shop
          </li>
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => handleClick(link.id)}
              className="cursor-pointer py-2 pl-4 font-satoshi hover:bg-stone-100"
            >
              {link.label}
            </li>
          ))}
          <hr className="border-b-1 border-stone-400" />
          <li className="cursor-pointer pb-2 pl-4 pt-2 font-satoshi hover:bg-stone-100">
            Theme
          </li>
        </ul>
        <div className="insert-0 fixed z-50 bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
