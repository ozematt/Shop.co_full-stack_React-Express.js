import { footerData, socials } from "../constants";
import { pay } from "../assets";

const Footer = () => {
  //
  ////UI
  return (
    <section className="relative mt-[50px] px-4 sm:px-[80px]">
      <div className="flex max-[820px]:flex-wrap">
        {" "}
        <div className="">
          <h3 className="font-integralCFBold text-[34px] leading-[28px]">
            Shop.co
          </h3>
          <p className="mt-[25px] w-full font-satoshi text-[14px] opacity-60 md:max-w-[248px]">
            We offer products that match your style and make you proud — for
            everyone, everywhere.
          </p>
          <div className="mt-[35px] flex gap-3">
            {" "}
            {socials.map((social) => (
              <img
                src={social.iconIMG}
                alt={social.name}
                key={social.name}
                className="cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>
        <div className="ld:grid-cols-3 grid grid-cols-2 max-[820px]:pt-[24px] xl:grid-cols-4">
          {" "}
          {footerData.map((item) => (
            <div
              key={item.title}
              className="pb-6 pl-[40px] max-[820px]:odd:pl-0 min-[820px]:pl-[110px]"
            >
              <p className="font-satoshi font-medium uppercase tracking-[.35rem] max-sm:text-[14px]">
                {item.title}
              </p>
              {item.items.map((element) => (
                <p
                  key={element}
                  className="cursor-pointer pt-2 font-satoshi opacity-60 hover:opacity-30 max-sm:text-[12px] sm:pt-4"
                >
                  {element}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[50px] border-b-2" />
      <div className="flex flex-wrap items-center justify-center sm:justify-between">
        {" "}
        <p className="mt-[25px] font-satoshi text-[14px] opacity-60 sm:mb-[88px]">
          Shop.co © 2000-2024, All Rights Reserved
        </p>
        <img
          src={pay}
          alt="payment method"
          className="max-sm:p-2 sm:mb-[60px]"
        />
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] h-[120%] w-full max-w-[1440] bg-grayBG dark:bg-zinc-900" />
    </section>
  );
};

export default Footer;
