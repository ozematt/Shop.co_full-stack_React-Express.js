import { Input } from "../components";
import { email } from "../assets";

const Newsletter = () => {
  //
  ////UI
  return (
    <section id="newsletter" className="relative mt-[80px] px-4 sm:px-[80px]">
      <div className="flex w-full max-w-[1280px] flex-wrap items-center justify-center rounded-[20px] bg-black min-[1345px]:justify-between dark:bg-grayBG">
        <h2 className="w-full max-w-[690px] px-[36px] py-[32px] font-integralCFBold text-[32px] leading-[45px] text-white sm:px-[64px] sm:py-[43px] sm:text-[40px] dark:text-black">
          Stay upto date about our latest offers
        </h2>
        <div className="flex flex-col px-3 pb-[28px] sm:px-[64px] sm:py-[43px]">
          <Input
            icon={email}
            alt="envelope"
            type="text"
            placeholder="Enter your email address"
          />
          <button className="mt-[14px] flex-shrink-0 rounded-full bg-white px-[80px] py-[12px] text-black transition duration-200 ease-in-out hover:scale-95 max-sm:text-[14px] sm:px-[89px] dark:bg-black dark:text-white">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] h-[50%] w-full bg-grayBG dark:bg-zinc-900" />
    </section>
  );
};

export default Newsletter;
