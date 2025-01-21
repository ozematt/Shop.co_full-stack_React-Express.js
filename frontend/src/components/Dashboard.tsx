import { Outlet } from "react-router";
import { Nav, TopBar } from "../sections";

const Dashboard = () => {
  return (
    <>
      <TopBar />
      <Nav />
      <Outlet />
    </>
  );
};

export default Dashboard;
