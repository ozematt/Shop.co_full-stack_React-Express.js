import { useNavigate } from "react-router-dom";
import { beauty, clothes, electronics, kitchen } from "../assets";
import { useCallback } from "react";

const Category = () => {
  //
  ////DATA
  const navigate = useNavigate();

  ////LOGIC
  const handleClick = useCallback(() => {
    navigate("/shop");
    window.scrollTo(0, 0);
  }, [navigate]);

  ////UI
  return (
    <section id="category" className="mt-[80px] px-4 sm:px-[100px]">
      <div className="z-[1] rounded-[40px] bg-grayBG dark:bg-zinc-900">
        <h2 className="pb-[24px] pt-[40px] text-center font-integralCFBold text-[32px] leading-9 sm:pb-[64px] sm:pt-[70px] sm:text-5xl">
          browse by category
        </h2>
        <div className="space-y-4 px-[24px] sm:px-[64px]">
          <div className="flex gap-4 max-xl:flex-wrap">
            <div
              onClick={handleClick}
              className="relative h-[190px] w-[407px] flex-auto cursor-pointer overflow-hidden rounded-[20px] bg-white transition duration-200 ease-in-out hover:scale-95 md:h-[289px] dark:bg-black"
            >
              <p className="pl-[36px] pt-[25px] font-satoshi text-2xl font-bold md:text-[36px]">
                Beauty
              </p>
              <img
                src={beauty}
                alt="cosmetics"
                width={300}
                className="absolute right-[-50px] top-0 h-full w-full object-contain"
              />
            </div>

            <div
              onClick={handleClick}
              className="relative h-[190px] w-[684px] flex-auto cursor-pointer overflow-hidden rounded-[20px] bg-white transition duration-200 ease-in-out hover:scale-95 md:h-[289px] dark:bg-black"
            >
              <p className="z-[1] pl-[36px] pt-[25px] font-satoshi text-2xl font-bold md:text-[36px]">
                Clothes
              </p>
              <img
                src={clothes}
                alt="clothes"
                width={450}
                className="absolute right-[-50px] top-0 h-full w-full object-contain"
              />
            </div>
          </div>
          <div
            onClick={handleClick}
            className="flex gap-4 pb-[74px] max-xl:flex-wrap"
          >
            <div className="relative h-[190px] w-[684px] flex-auto cursor-pointer overflow-hidden rounded-[20px] bg-white transition duration-200 ease-in-out hover:scale-95 md:h-[289px] dark:bg-black">
              <p className="pl-[36px] pt-[25px] font-satoshi text-2xl font-bold md:text-[36px]">
                Kitchen
              </p>
              <img
                src={kitchen}
                alt="kitchen accessories"
                width={450}
                className="absolute right-[-50px] top-0 h-full w-full object-contain"
              />
            </div>
            <div
              onClick={handleClick}
              className="relative h-[190px] w-[407px] flex-auto cursor-pointer overflow-hidden rounded-[20px] bg-white transition duration-200 ease-in-out hover:scale-95 md:h-[289px] dark:bg-black"
            >
              <p className="pl-[36px] pt-[25px] font-satoshi text-2xl font-bold md:text-[36px]">
                Electronics
              </p>
              <img
                src={electronics}
                alt="electronics devices"
                className="absolute left-[100px] top-0 h-full w-full scale-x-[-1] transform object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
