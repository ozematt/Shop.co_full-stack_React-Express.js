import { CartIcon, SearchEngineIcon, ThemeIcon, UserIcon } from ".";

const NavIcons = () => {
  //
  ////UI
  return (
    <div className="relative ml-[40px] flex min-w-[102px] items-center justify-end gap-[14px]">
      <SearchEngineIcon />
      <CartIcon />
      <UserIcon />
      <ThemeIcon />
    </div>
  );
};

export default NavIcons;
