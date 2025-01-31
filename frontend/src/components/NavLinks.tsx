import { useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { RotatingArrow } from ".";

const NavLinks = () => {
  //
  //DATA
  const navigate = useNavigate();
  const locationShop = !!location.pathname.includes("shop");

  ////UI
  return (
    <ul className="flex min-w-[390px] items-center justify-center gap-[24px] pl-[40px] font-satoshi font-normal max-[1192px]:hidden">
      <li
        onClick={() => navigate("/shop")}
        className="flex items-center py-3 dark:text-white"
      >
        <button className="pr-1 hover:opacity-60">Shop</button>
        <RotatingArrow rotateOn={locationShop} />
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
