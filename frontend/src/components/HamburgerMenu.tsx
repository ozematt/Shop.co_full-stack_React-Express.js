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
      {open && (
        <ul className="absolute left-[15px] top-[100px] z-50 w-[130px] rounded-[5px] bg-white bg-opacity-90 pl-3 pt-1 ring-1 ring-black ring-opacity-20 dark:bg-opacity-80 dark:text-black">
          <li
            onClick={() => navigate("/shop")}
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
          >
            Shop
          </li>
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => handleClick(link.id)}
              className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            >
              {link.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
