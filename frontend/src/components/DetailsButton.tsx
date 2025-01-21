import { type DetailsButtonProps } from "../lib/types";

const DetailsButton = ({
  onClick,
  details,
  children,
  title,
}: DetailsButtonProps) => {
  //
  ////UI
  return (
    <button
      onClick={onClick}
      className="duration-600 w-[50%] border-b-2 py-6 font-satoshi text-base opacity-60 transition ease-in-out hover:border-b-black hover:font-bold hover:opacity-100 md:text-xl dark:hover:border-b-white"
      style={
        details === title
          ? {
              opacity: "1",
              fontWeight: "bold",
              borderBottom: "2px solid black",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
};

export default DetailsButton;
