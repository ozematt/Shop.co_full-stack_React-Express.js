import { useNavigate } from "react-router-dom";
import { arrow } from "../assets";
import { navLinks } from "../constants";

const NavLinks = () => {
  //
  //DATA
  const navigate = useNavigate();
  const locationShop = !!location.pathname.includes("shop");

  ////UI
  return (
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
  );
};

export default NavLinks;
