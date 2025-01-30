import { Outlet } from "react-router";
import { Nav, TopBar } from "../sections";

const Dashboard = () => {
  //
  ////UI
  return (
    <>
      <TopBar />
      <Nav />
      <Outlet />
    </>
  );
};

export default Dashboard;
