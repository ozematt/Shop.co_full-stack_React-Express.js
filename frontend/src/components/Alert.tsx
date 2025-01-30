import { useNavigate } from "react-router-dom";

type AlertProps = {
  url?: string;
  title: string;
  text: string;
  buttonText: string;
};

const Alert = ({ url, title, text, buttonText }: AlertProps) => {
  //
  ////DATA
  const navigate = useNavigate();

  ////UI
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
      <div className="ring-3 mx-4 w-[500px] rounded-xl bg-white md:h-[270px] dark:bg-zinc-600">
        <div className="flex flex-col px-4 py-9">
          <h6 className="text-center font-integralCFBold text-3xl md:text-4xl">
            {title}
          </h6>
          <p className="pt-3 text-center font-satoshi text-lg max-md:text-sm">
            {text}
          </p>
          <button
            onClick={() => navigate(`/${url}`)}
            className="mx-auto my-3 rounded-full bg-black px-[60px] py-2 font-satoshi text-white hover:scale-90 active:scale-100 md:py-3 dark:bg-white dark:text-black"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
