import { Outlet } from "react-router-dom";
import NavigationBar from "../navigationbar";

const Root = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Root;
