import { useNavigate } from "react-router-dom";

const Success = () => {
  //
  ////DATA
  const navigate = useNavigate();

  ////UI
  return (
    <div className="ring-3 mx-4 w-[500px] rounded-xl bg-white md:h-[270px] dark:bg-zinc-600">
      <div className="flex flex-col px-4 py-9">
        <h6 className="text-center font-integralCFBold text-3xl md:text-4xl">
          Success!
        </h6>
        <p className="pt-3 text-center font-satoshi text-lg max-md:text-sm">
          Thank you for your purchase! Your order has been successfully placed.
          You will be redirected to the homepage shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mx-auto my-3 rounded-full bg-black px-[60px] py-2 font-satoshi text-white hover:scale-90 active:scale-100 md:py-3 dark:bg-white dark:text-black"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Success;
