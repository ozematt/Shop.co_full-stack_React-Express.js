import { useCallback } from "react";
import { userIcon, close } from "../assets";
import { useMenuOpen } from "../lib/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { logOutUser } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";

const UserIcon = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const token = localStorage.getItem("token");

  const username =
    useSelector((state: RootState) => state.user.username) ||
    localStorage.getItem("user");

  //custom hook
  const { menuOpen, setMenuOpen, menuProps } = useMenuOpen();

  ////LOGIC
  const handleUserPanel = useCallback(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setMenuOpen((prevState) => !prevState);
  }, [token, navigate]);

  const handleLogOut = useCallback(() => {
    dispatch(logOutUser());
    dispatch(clearCart());
    setMenuOpen(false);
    navigate("/");
  }, []);

  ////UI
  return (
    <>
      <img
        src={userIcon}
        alt="user icon"
        width={24}
        height={24}
        onClick={handleUserPanel}
        className="cursor-pointer hover:opacity-60 dark:invert"
      />
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        {...menuProps}
        className={`${menuOpen ? "translate-x-0" : "translate-x-full"} fixed right-[0] top-[0] z-50 h-[100vh] w-[40vw] transform bg-stone-100 shadow-lg transition-transform duration-300 lg:w-[30vw] xl:w-[20vw] 2xl:w-[15vw] dark:dark:bg-zinc-800`}
      >
        <ul className="text-xl text-black md:p-10">
          <div className="flex justify-between px-4 pb-4 pt-4 font-bold dark:text-white">
            User Panel{" "}
            <img
              onClick={() => setMenuOpen(false)}
              src={close}
              alt="close icon"
              width={16}
              height={16}
              className="cursor-pointer dark:invert"
            />
          </div>
          <hr className="border-b-1 border-stone-400" />
          <li
            className="hover: cursor-pointer pb-2 pl-4 pt-2 font-satoshi hover:bg-white dark:text-white dark:hover:bg-zinc-700"
            onClick={() => {
              navigate(`account/${username}`);
              setMenuOpen(false);
            }}
          >
            My Account
          </li>

          <li
            className="hover: cursor-pointer pb-2 pl-4 pt-2 font-satoshi hover:bg-white dark:text-white dark:hover:bg-zinc-700"
            onClick={handleLogOut}
          >
            {" "}
            Log Out
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserIcon;
