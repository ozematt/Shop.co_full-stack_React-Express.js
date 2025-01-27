import { useCallback, useRef } from "react";
import { userIcon } from "../assets";
import { usePanelOpen } from "../lib/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { logOutUser } from "../redux/userSlice";

const UserIcon = () => {
  //
  ////DATA
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const username = useSelector((state: RootState) => state.user.username);

  //custom hook
  const { open, setOpen } = usePanelOpen({ refValue: panelRef });

  ////LOGIC
  const handleUserPanel = useCallback(() => {
    if (!username) {
      navigate("/login");
      return;
    }
    setOpen((prevState) => !prevState);
  }, [username, navigate]);

  const handleLogOut = useCallback(() => {
    dispatch(logOutUser());
    setOpen(false);
  }, []);

  ////UI
  return (
    <div ref={panelRef}>
      <img
        src={userIcon}
        alt="user icon"
        width={24}
        height={24}
        onClick={handleUserPanel}
        className="cursor-pointer hover:opacity-60 dark:invert"
      />
      {open && (
        <ul className="absolute right-[-5px] top-[50px] z-50 w-[130px] rounded-[5px] bg-white bg-opacity-90 pl-3 pt-1 ring-1 ring-black ring-opacity-20 dark:text-black">
          <li
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            onClick={() => navigate(`account/${username}`)}
          >
            My Account
          </li>

          <li
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            onClick={handleLogOut}
          >
            {" "}
            Log Out
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserIcon;
