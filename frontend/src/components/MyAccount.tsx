import { Footer, Newsletter } from "../sections";
import { user } from "../assets/index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Fragment, useEffect } from "react";
import { getDate } from "../lib/helpers";
import { useQuery } from "@tanstack/react-query";
import getOrder from "../api/queries/getOrders";

const MyAccount = () => {
  //
  ////DATA
  const username =
    useSelector((state: RootState) => state.user.username) ||
    localStorage.getItem("user");

  ////LOGIC
  const { data: orders, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrder,
  });

  useEffect(() => {
    refetch();
  }, [username]);

  ////UI
  return (
    <>
      <section className="max-container mt-3 flex w-full gap-6 px-4 max-lg:flex-wrap sm:px-[100px]">
        <div className="flex max-h-[400px] w-1/3 shrink-0 flex-col items-center rounded-[20px] py-5 ring-1 ring-black ring-opacity-10 max-lg:w-full md:py-7 dark:ring-white">
          <img
            src={user}
            alt="avatar"
            className="h-[150px] w-[150px] rounded-full bg-grayBG object-contain opacity-80 md:h-[200px] md:w-[200px] dark:bg-zinc-900 dark:bg-opacity-30 dark:opacity-100 dark:invert"
          />

          <p className="mt-2 font-satoshi text-2xl font-medium opacity-60 dark:opacity-100">
            {username}
          </p>
        </div>
        <div className="w-full rounded-[20px] px-7 py-5 ring-1 ring-black ring-opacity-10 md:px-9 md:py-7 dark:ring-white">
          <h6 className="font-integralCFBold text-2xl md:text-4xl">
            Purchase History
          </h6>
          <div className="border-b-[1px] py-2" />

          {orders?.length > 0 ? (
            orders?.map((order) => (
              <div key={order.orderId} className="my-1">
                <p className="py-1 pt-3 font-satoshi opacity-60 max-md:text-sm md:py-2">
                  Date: {getDate(order.created_at)}
                </p>
                {order.items.map((item) => (
                  <Fragment key={item.itemId}>
                    <div className="my-1 flex">
                      <img
                        src={item.image}
                        alt="product image"
                        className="h-[140px] w-[130px] rounded-lg bg-grayBG object-contain md:h-[180px] md:w-[170px] dark:bg-zinc-900"
                      />
                      <div className="ml-5 space-y-1">
                        <p className="font-satoshi text-lg font-semibold md:text-2xl dark:opacity-90">
                          {item.product_name}
                        </p>
                        <p className="font-satoshi text-lg md:text-xl dark:opacity-50">
                          <span className="text-base md:text-lg">
                            {item.quantity} x
                          </span>{" "}
                          {item.price} $
                        </p>
                      </div>
                    </div>
                    <div className="my-4 mr-[70px] border-b-[1px] md:my-6 md:mr-[150px] dark:opacity-30" />
                  </Fragment>
                ))}
                <p className="mt-[-10px] font-satoshi text-xl font-bold md:text-2xl">
                  Total: {order.total}$
                </p>
                <div className="border-b-[1px] py-2" />
              </div>
            ))
          ) : (
            <h2 className="insert-0 py-[190px] text-center font-integralCFBold text-7xl opacity-10 sm:text-8xl">
              Empty
            </h2>
          )}
        </div>
      </section>{" "}
      <div className="max-container">
        {" "}
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default MyAccount;
