import { navLinks } from "../constants";
import { arrow } from "../assets";
import { useLocation, useNavigate } from "react-router";
import {
  UserIcon,
  CartIcon,
  HamburgerMenu,
  SearchEngine,
  SearchEngineIcon,
  ThemeIcon,
} from "../components";

const Nav = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const location = useLocation();
  const locationShop = !!location.pathname.includes("shop");

  ////UI
  return (
    <nav className="max-container flex h-[96px] items-center px-4 max-[838px]:justify-between sm:px-[100px]">
      <div className="flex items-center">
        {" "}
        <HamburgerMenu />
        {/* Logo */}
        <a
          onClick={() => navigate("/")}
          className="mb-[7px] cursor-pointer font-integralCFBold text-[25px] hover:opacity-90 sm:text-[32px] dark:text-white"
        >
          shop.co
        </a>
      </div>

      {/* Nav Links */}
      <ul className="flex min-w-[390px] items-center justify-center gap-[24px] pl-[40px] font-satoshi font-normal max-[1192px]:hidden">
        <li className="flex items-center py-3 dark:text-white">
          <button
            onClick={() => navigate("/shop")}
            className="pr-1 hover:opacity-60"
          >
            Shop
          </button>

          <img
            src={arrow}
            alt="arrow"
            className={`dark:invert ${locationShop ? "rotate-0" : "rotate-180"} transition duration-300 ease-in-out`}
          />
        </li>
        {navLinks.map((link, index) => (
          <li key={index} className="py-3 dark:text-white">
            <a href={link.href} className="hover:opacity-60">
              {link.label}{" "}
            </a>
          </li>
        ))}
      </ul>
      <div className="ml-[40px] hidden w-full min-[838px]:block">
        <SearchEngine />
      </div>
      {/* Icons */}
      <div className="relative ml-[40px] flex min-w-[102px] items-center justify-end gap-[14px]">
        <SearchEngineIcon />
        <CartIcon />
        <UserIcon />
        <ThemeIcon />
      </div>
    </nav>
  );
};

export default Nav;
