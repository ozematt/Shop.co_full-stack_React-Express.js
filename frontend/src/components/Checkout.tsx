import { useCallback, useEffect, useState } from "react";
import { Footer, Newsletter } from "../sections";
import { Breadcrumbs, Success } from "./";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { clearCart } from "../redux/cartSlice";
import {
  type OrderData,
  cartLocalStorageSchema,
  CartItemT,
} from "../lib/types";
import { useMutation } from "@tanstack/react-query";
import addOrder from "../api/queries/addOrder";

const Checkout = () => {
  //
  ////DATA
  const dispatch: AppDispatch = useAppDispatch();
  const total = useSelector((state: RootState) => state.cart.total); //total price (included discount)

  const [order, setOrder] = useState<OrderData | null>(null);
  const [success, setSuccess] = useState(false);

  ////LOGIC
  //creating order data out of local storage data, with validation
  useEffect(() => {
    const rawCart: unknown = JSON.parse(localStorage.getItem("cart") || "{}");
    const parsedCart = cartLocalStorageSchema.safeParse(rawCart);

    if (parsedCart.success) {
      const cartItems = parsedCart.data.entities;
      const itemsArray = Object.values(cartItems);

      // creating order object
      const order: OrderData = {
        items: itemsArray.map((item: CartItemT) => ({
          product_name: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        total: parsedCart.data.total,
      };

      setOrder(order);
    } else {
      console.error("Invalid cart data in localStorage", parsedCart.error);
      localStorage.removeItem("cart");
      setOrder(null);
    }
  }, []);

  const orderMutate = useMutation({
    mutationFn: addOrder,
    onError: () => {
      console.log("Error fest");
      setSuccess(false);
    },
    onSuccess: (data) => {
      dispatch(clearCart());
      setSuccess(true);
      console.log(data);
    },
  });

  const handleOrder = useCallback(() => {
    orderMutate.mutate(order as OrderData);
  }, [dispatch, order]);

  ////UI
  return (
    <>
      <section className="max-container relative px-4 sm:px-[100px]">
        {" "}
        <Breadcrumbs />
        {success ? (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
            <Success />
          </div>
        ) : null}
        <div>
          <h2 className="mt-[8px] font-integralCFBold text-[32px] max-md:leading-[36px] sm:mt-[24px] sm:text-5xl">
            Finalization
          </h2>
          <div className="mt-[20px] flex flex-wrap justify-center gap-[20px] sm:mt-[24px]">
            <div className="h-full max-h-[505px] w-full rounded-[20px] ring-1 ring-black ring-opacity-10 min-[1454px]:max-w-[715px]">
              <div className="px-6 pb-[33px] pt-[20px]">
                <h6 className="pb-1 font-satoshi text-xl font-bold sm:text-2xl">
                  Shipping recipient details:
                </h6>
                <div className="border-b-[1px] pt-5" />
                {/* Address */}
                <div className="mt-4 space-y-1 font-satoshi text-sm">
                  <p className="pb-1 text-xl font-bold">
                    User data will be here.
                  </p>
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {/* {userData?.address?.city} */}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {/* {userData?.address?.address} */}
                  </p>
                  <p>
                    <span className="font-medium">Postal Code:</span>{" "}
                    {/* {userData?.address?.postalCode} */}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span>{" "}
                    {/* {userData?.address?.country} */}
                  </p>
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {/* {userData?.address?.state} */}
                  </p>
                </div>
              </div>
            </div>
            {/* SUMMARY */}
            <div className="w-full max-w-[805px] rounded-[20px] ring-1 ring-black ring-opacity-10 min-[1454px]:max-w-[505px]">
              <div className="px-6 pb-[33px] pt-[20px]">
                <h6 className="pb-1 font-satoshi text-xl font-bold sm:text-2xl">
                  Total Payable Amount
                </h6>
                <div>
                  <div className="flex justify-between pt-5">
                    <p className="font-satoshi text-base opacity-60 sm:text-xl">
                      Total Price{" "}
                    </p>{" "}
                    <p className="font-satoshi text-base font-bold sm:text-xl">
                      ${total}
                    </p>
                  </div>
                  <div className="border-b-[1px] pt-5" />

                  <button
                    onClick={handleOrder}
                    className="relative mt-6 w-full max-w-[457px] rounded-full bg-black py-[19px] font-satoshi font-medium text-white transition duration-100 ease-in-out hover:scale-95 max-sm:text-sm"
                  >
                    PAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-container">
        {" "}
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
