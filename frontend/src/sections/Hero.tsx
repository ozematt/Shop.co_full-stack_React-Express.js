import { stats } from "../constants";
import { heroIMG } from "../assets";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  //
  ////DATA
  const navigate = useNavigate();

  ////UI
  return (
    <section className="relative bg-grayBG px-4 sm:px-[100px] dark:bg-zinc-900">
      <div className="w-full max-w-[360px] pt-10 max-sm:mx-auto sm:max-w-[520px] sm:pt-[103px]">
        {" "}
        <h1 className="font-integralCFBold text-4xl sm:text-[64px] sm:leading-[64px]">
          Discover what makes your style truly yours
        </h1>
        <p className="mt-[32px] font-satoshi text-[14px] opacity-60 sm:text-base">
          Browse through our diverse range of meticulously crafted products,
          designed to highlight your individuality and meet your unique
          preferences.
        </p>
        <Button onClick={() => navigate("/shop")}>Shop now</Button>
      </div>

      <div className="flex flex-wrap gap-[27px] py-[22px] max-[833px]:justify-center sm:gap-10 sm:pb-[116px] sm:pt-[48px]">
        {stats.map((stat) => (
          <div
            key={stat.number}
            className="first:pl-0 max-[833px]:even:border-l-2 max-sm:pl-[27px] sm:even:px-[32px] min-[833px]:even:border-x-2"
          >
            <h4 className="font-satoshi text-2xl font-bold sm:text-[40px]">
              {stat.number}
            </h4>
            <p className="font-satoshi opacity-60 max-sm:text-xs sm:pt-3">
              {stat.caption}
            </p>
          </div>
        ))}
        <img
          src={heroIMG}
          alt="hero img"
          width={670}
          height={670}
          className="absolute right-0 top-8 z-10 hidden contrast-150 grayscale min-[1250px]:block"
        />
      </div>
    </section>
  );
};

export default Hero;
