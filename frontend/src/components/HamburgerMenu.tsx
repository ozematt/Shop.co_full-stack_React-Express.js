import { useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { hamburger } from "../assets";
import { useMenuOpen } from "../lib/hooks";

const HamburgerMenu = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const { menuOpen, setMenuOpen, toggleMenu, handleMenuItemClick, menuProps } =
    useMenuOpen();

  ////UI
  return (
    <>
      <img
        src={hamburger}
        alt="hamburger menu"
        width={24}
        height={24}
        onClick={toggleMenu}
        className="mr-4 min-w-[24px] cursor-pointer pb-[6px] hover:opacity-60 sm:min-w-[30px] min-[1192px]:hidden dark:invert"
      />
      {/* overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        {...menuProps}
        className={`${menuOpen ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 z-50 h-[100vh] w-[40vw] transform bg-stone-200 shadow-lg transition-transform duration-300`}
      >
        <ul className="text-xl text-black md:p-10">
          <p className="pb-4 pl-4 pt-4 font-bold">MENU</p>
          <hr className="border-b-1 border-stone-400" />
          <li
            onClick={() => {
              navigate("/shop"), setMenuOpen(false);
            }}
            className="hover: cursor-pointer pb-2 pl-4 pt-2 font-satoshi hover:bg-stone-100"
          >
            Shop
          </li>
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => handleMenuItemClick(link.id)}
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
      </div>
    </>
  );
};

export default HamburgerMenu;
