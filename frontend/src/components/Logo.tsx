import { useNavigate } from "react-router-dom";

const Logo = () => {
  //
  ////DATA
  const navigate = useNavigate();

  ////UI
  return (
    <a
      onClick={() => navigate("/")}
      className="mb-[7px] cursor-pointer font-integralCFBold text-[25px] hover:opacity-90 sm:text-[32px] dark:text-white"
    >
      shop.co
    </a>
  );
};

export default Logo;
