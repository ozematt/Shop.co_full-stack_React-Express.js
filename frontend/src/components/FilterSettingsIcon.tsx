import { settings } from "../assets";

type FilterSettingsIconProps = {
  onClick: () => void;
};

const FilterSettingsIcon = ({ onClick }: FilterSettingsIconProps) => {
  //
  ////UI
  return (
    <img
      src={settings}
      alt="settings"
      width={34}
      height={34}
      onClick={onClick}
      className="mb-[-3px] ml-5 hidden -rotate-90 cursor-pointer rounded-full bg-grayBG p-[7px] opacity-80 hover:opacity-100 max-xl:block"
    />
  );
};

export default FilterSettingsIcon;
