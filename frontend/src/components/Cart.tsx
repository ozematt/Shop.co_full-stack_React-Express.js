import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addTotalPrice, selectAllCart } from "../redux/cartSlice";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { Footer, Newsletter } from "../sections";
import { Breadcrumbs, CartItem } from "./";
import { calculateTotalDiscount } from "../lib/helpers";
import { discount, arrowWhite } from "../assets";

const Cart = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const cart = useSelector(selectAllCart);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const dispatch: AppDispatch = useAppDispatch();

  const [totalDiscount, setTotalDiscount] = useState(0);
  const [savings, setSavings] = useState(0);

  ////LOGIC
  useEffect(() => {
    if (cart.length) {
      const { effectiveDiscount } = calculateTotalDiscount(cart);
      const discount = Math.round(Number(effectiveDiscount));
      setTotalDiscount(discount);
    }
    if (subtotal === 0) {
      setTotalDiscount(0);
    }
  }, [cart, subtotal]);

  useEffect(() => {
    if (totalDiscount !== 0) {
      const savings = Math.round((subtotal * totalDiscount) / 100);
      setSavings(savings);
    }
  }, [cart, totalDiscount]);

  const handleCheckout = useCallback(() => {
    const totalPrice = Number((subtotal - savings + 15).toFixed(2)) || 0;
    if (cart.length) {
      navigate("/cart/checkout");
      dispatch(addTotalPrice(totalPrice));
    }
  }, [subtotal, savings, cart, navigate, dispatch]);

  ////UI
  return (
    <>
      {" "}
      <section className="max-container px-4 sm:px-[100px]">
        <div className="border-b-2" />
        <Breadcrumbs />
        <div>
          <h2 className="mt-[8px] font-integralCFBold text-[32px] max-md:leading-[36px] sm:mt-[24px] sm:text-5xl">
            your cart
          </h2>
          {/* flex flex-wrap justify-center  */}
          <div className="mt-[20px] flex flex-wrap gap-[20px] sm:mt-[24px] min-[1454px]:flex-nowrap">
            {/* cart items */}
            {/* min-[1454px]:max-w-[715px] */}
            <div className="h-full max-h-[505px] w-full rounded-[20px] ring-1 ring-black ring-opacity-10 max-[1454px]:max-w-[800px] dark:ring-white">
              {cart.length ? (
                cart.map((item) => <CartItem key={item.id} {...item} />)
              ) : (
                <h2 className="insert-0 py-[190px] text-center font-integralCFBold text-7xl opacity-10 sm:text-8xl">
                  Empty
                </h2>
              )}
            </div>
            {/* SUMMARY */}
            {/* min-[1454px]:max-w-[505px] max-w-[805px]*/}
            <div className="w-full rounded-[20px] ring-1 ring-black ring-opacity-10 min-[1454px]:max-w-[505px] dark:ring-white">
              <div className="px-6 pb-[33px] pt-[20px]">
                <h6 className="pb-1 font-satoshi text-xl font-bold sm:text-2xl">
                  Order Summary
                </h6>
                <div>
                  <div className="flex justify-between pt-5">
                    <p className="font-satoshi text-base opacity-60 sm:text-xl">
                      Subtotal{" "}
                    </p>{" "}
                    <p className="font-satoshi text-base font-bold sm:text-xl">
                      ${subtotal}
                    </p>
                  </div>

                  <div className="flex justify-between pt-5">
                    <p className="font-satoshi text-base opacity-60 sm:text-xl">
                      Discount <span>(-{totalDiscount}%)</span>{" "}
                    </p>{" "}
                    <p className="font-satoshi text-base font-bold text-red-500 sm:text-xl">
                      -${savings}
                    </p>
                  </div>

                  <div className="flex justify-between pt-5">
                    <p className="font-satoshi text-base opacity-60 sm:text-xl">
                      Delivery Fee{" "}
                    </p>{" "}
                    <p className="font-satoshi text-base font-bold sm:text-xl">
                      $15
                    </p>
                  </div>

                  <div className="border-b-[1px] pt-5" />

                  <div className="flex justify-between pt-5">
                    <p className="font-satoshi text-base sm:text-xl">Total </p>{" "}
                    <p className="font-satoshi text-xl font-bold sm:text-2xl">
                      ${(subtotal - savings + 15).toFixed(2)}
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex w-full flex-col items-center">
                    <div className="relative flex w-full pt-6">
                      <img
                        src={discount}
                        alt="discount icon"
                        className="absolute left-4 top-[50%] z-10 opacity-40 max-sm:scale-90 dark:invert"
                      />
                      <input
                        type="text"
                        placeholder="Add promo code"
                        className="h-[48px] w-full rounded-full bg-grayBG pl-[50px] placeholder:opacity-40 focus:outline-none focus:ring-1 focus:ring-black placeholder:max-sm:text-sm dark:bg-zinc-900 dark:focus:ring-white"
                      />{" "}
                      <button className="ml-[12px] rounded-full bg-black px-[25px] py-[13px] font-satoshi font-medium text-white transition duration-100 ease-in-out hover:scale-95 max-sm:text-sm sm:px-[38px] dark:ring-1 dark:ring-white">
                        Apply
                      </button>
                    </div>{" "}
                    <button
                      onClick={handleCheckout}
                      className="relative mt-6 w-full max-w-[457px] rounded-full bg-black py-[19px] pr-9 font-satoshi font-medium text-white transition duration-100 ease-in-out hover:scale-95 max-sm:text-sm dark:bg-white dark:text-black"
                    >
                      Go to Checkout{" "}
                      <img
                        src={arrowWhite}
                        alt="white arrow icon"
                        className="absolute left-[65%] top-[30%] max-sm:scale-90 sm:left-[60%] sm:top-[32%] dark:invert"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-container">
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Cart;
