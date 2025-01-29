import { type InputProps } from "../lib/types";

const Input = ({ icon, alt, type, placeholder }: InputProps) => {
  //
  ////UI
  return (
    <div className="relative w-full">
      <img
        src={icon}
        alt={alt}
        width={20}
        height={20}
        className="absolute left-6 top-[30%] opacity-60"
      />
      <input
        type={type}
        placeholder={placeholder}
        className="h-[48px] w-full rounded-full bg-white pl-[60px] focus:outline-none focus:ring-1 focus:ring-black max-sm:placeholder:text-[14px] dark:text-black"
      />
    </div>
  );
};

export default Input;
