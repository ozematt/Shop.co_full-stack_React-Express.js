import {
  HamburgerMenu,
  SearchEngine,
  NavLinks,
  Logo,
  NavIcons,
} from "../components";

const Nav = () => {
  //
  ////UI
  return (
    <nav className="max-container flex h-[96px] items-center px-4 max-[838px]:justify-between sm:px-[100px]">
      <div className="flex items-center">
        <HamburgerMenu />
        <Logo />
      </div>
      <NavLinks />
      <div className="ml-[40px] hidden w-full min-[838px]:block">
        <SearchEngine />
      </div>
      <NavIcons />
    </nav>
  );
};

export default Nav;
