import { Filters } from ".";
import { close } from "../assets";

type FilterWindowProps = {
  onClick: () => void;
  open: boolean;
};

const FilterWindow = ({ onClick, open }: FilterWindowProps) => {
  ////UI
  return (
    <>
      {" "}
      <div
        className={`absolute top-[-70px] ${open ? "block" : "hidden"} z-20 w-full rounded-2xl bg-white dark:bg-black`}
      >
        <img
          src={close}
          alt=""
          width={15}
          height={15}
          className="absolute right-5 top-7 cursor-pointer hover:scale-95 dark:invert"
          onClick={onClick}
        />
        <Filters iconHide sortOptions close={onClick} />
      </div>
      <div
        onClick={onClick}
        className={` ${open ? "fixed" : "hidden"} inset-0 z-10 bg-black opacity-50`}
      />
    </>
  );
};

export default FilterWindow;
