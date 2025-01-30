import { darkIcon } from "../assets";
import { useToggleTheme } from "../lib/hooks";

type ThemeIconProps = {
  isVisible?: boolean;
};

const ThemeIcon = ({ isVisible }: ThemeIconProps) => {
  //
  ////DATA
  const { themeToggle } = useToggleTheme();

  ////UI
  return (
    <img
      {...themeToggle}
      src={darkIcon}
      width={24}
      height={24}
      className={`cursor-pointer hover:opacity-60 ${isVisible ? "" : "max-[1192px]:hidden"} dark:invert`}
    />
  );
};

export default ThemeIcon;
