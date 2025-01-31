import { RotatingArrow } from ".";
import { settings } from "../assets";

type FilterHeaderProps = {
  title: string;
  onClick: () => void;
  state: boolean;
  main?: boolean;
  iconHide?: boolean;
};

const FilterHeader = ({
  title,
  onClick,
  state,
  main,
  iconHide,
}: FilterHeaderProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between"
    >
      <p className="font-satoshi text-[20px] font-bold">{title}</p>
      {main ?? <RotatingArrow rotateOn={state} />}
      {main && (
        <img
          src={settings}
          width={24}
          height={24}
          alt="settings"
          className={`-rotate-90 ${iconHide ? "hidden" : ""} cursor-pointer opacity-60 hover:opacity-100 dark:invert`}
        />
      )}
    </div>
  );
};

export default FilterHeader;
