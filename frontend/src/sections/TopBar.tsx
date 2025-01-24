import { useCallback, useState } from "react";
import { close } from "../assets";
import { useNavigate } from "react-router";

const TopBar = () => {
  //
  //DATA
  const [hideBar, setHideBar] = useState(false);
  const navigate = useNavigate();

  ////LOGIC
  const handleSignUpClick = useCallback(() => {
    navigate("/register");
    setHideBar(true);
  }, [navigate]);

  ////UI
  return (
    <>
      {!hideBar && (
        <section className="max-container relative">
          <div className="flex h-[34px] w-full items-center justify-center bg-black text-center text-white sm:h-[38px] sm:px-[100px] dark:bg-grayBG dark:text-black">
            {" "}
            <p className="font-satoshi text-[12px] font-normal sm:text-[14px]">
              Sign up and get 20% off to your first order.{" "}
              <span
                className="cursor-pointer font-medium underline"
                onClick={handleSignUpClick}
              >
                {" "}
                Sign Up Now
              </span>{" "}
            </p>
            <img
              src={close}
              alt="close icon"
              width={20}
              height={20}
              className="absolute right-[100px] hidden cursor-pointer sm:block dark:invert"
              onClick={() => setHideBar(!hideBar)}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default TopBar;
