import { NavLink, Outlet } from "react-router-dom";
import "./Profile.scss";
import { useDispatch } from "react-redux";
import { clearToken } from "@/redux/features/token-slice";

const Profile = () => {
  // const { data } = useCheckTokenQuery(null);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(clearToken());
  };
  return (
    <div className="container flex min-h-[600px]">
      <div className="w-[300px] border-r p-3 profile flex flex-col">
        <NavLink className={"block p-2 rounded-md duration-150"} to="self">
          Profile
        </NavLink>
        <NavLink className={"block p-2 rounded-md duration-150"} to="order">
          Orders
        </NavLink>
        <span className="flex-1"></span>
        <button
          onClick={handleLogOut}
          className="p-2 block bg-slate-900 rounded-md text-white hover-bg-primary"
        >
          Log out
        </button>
      </div>
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
