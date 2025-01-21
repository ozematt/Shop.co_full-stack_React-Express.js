import { useLocation, useNavigate } from "react-router";
import { arrow } from "../assets";
import { useParams } from "react-router-dom";

const Breadcrumbs = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const location = useLocation();

  //params extract from url
  const { category, product } = useParams();

  //category name from url
  const upCategory =
    category && category?.charAt(0).toUpperCase() + category?.slice(1);

  ////UI
  return (
    <div className="flex items-center pt-6 opacity-60 max-sm:text-[14px]">
      <p
        className="cursor-pointer pr-2 font-satoshi leading-none hover:opacity-70"
        onClick={() => navigate("/")}
      >
        Home
      </p>
      <img
        src={arrow}
        width={16}
        alt="arrow"
        className="-rotate-90 dark:invert"
      />

      {location.pathname === "/cart" && (
        <p className="cursor-pointer px-2 font-satoshi leading-none hover:opacity-70">
          <strong>Cart</strong>
        </p>
      )}
      {location.pathname === "/cart/checkout" && (
        <div
          onClick={() => navigate("/cart")}
          className="flex cursor-pointer px-2 font-satoshi leading-none hover:opacity-70"
        >
          Cart
          <img
            src={arrow}
            width={16}
            alt="arrow"
            className="mx-2 -rotate-90 dark:invert"
          />
          <strong>Checkout</strong>
        </div>
      )}

      {location.pathname.includes("/shop") && (
        <p
          className="cursor-pointer px-2 font-satoshi leading-none hover:opacity-70"
          onClick={() => navigate("/shop")}
        >
          {location.pathname === "/shop" ? (
            <strong onClick={() => navigate("/shop")}>Shop</strong>
          ) : (
            "Shop"
          )}
        </p>
      )}

      {category && (
        <img
          src={arrow}
          width={16}
          alt="arrow"
          className="-rotate-90 dark:invert"
        />
      )}

      <p
        className="cursor-pointer px-2 font-satoshi leading-none hover:opacity-70"
        onClick={() => navigate(`/shop/${category}`)}
      >
        {category && product ? (
          <span>{upCategory}</span>
        ) : (
          <strong>{upCategory}</strong>
        )}
      </p>
      {product && (
        <img
          src={arrow}
          width={16}
          alt="arrow"
          className="-rotate-90 dark:invert"
        />
      )}
      <p className="px-2 font-satoshi leading-none">
        {product && <strong>{product}</strong>}
      </p>
    </div>
  );
};

export default Breadcrumbs;
