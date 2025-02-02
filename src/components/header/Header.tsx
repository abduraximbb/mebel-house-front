import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "../../static";
import logo from "@/assets/logo.png";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { PiXBold } from "react-icons/pi";
import useOnlineonline from "@/hooks/useOnlineStatus";
import "./Header.scss";
import HeaderSearch from "./HeaderSearch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Switch from "./Switcher";
import { useCheckTokenQuery } from "../../redux/api/customer-api";
import { useGetWishlistQuery } from "../../redux/api/wishlist-api";
import ThemeToggle from "../theme/ThemeToggle";

const Header: FC = () => {
  const token = useSelector((state: RootState) => state.token.access_token);
  const { online, firstEnter } = useOnlineonline();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { data, isSuccess } = useCheckTokenQuery(null, {
    skip: Boolean(!token),
  });

  const wishlist = useSelector((state: RootState) => state.wishlist.value);
  const { data: wishlistData } = useGetWishlistQuery(Number(data?.client?.id), {
    skip: Boolean(!data),
  });

  const totalWishlist = wishlistData
    ? wishlistData?.data?.length
    : wishlist?.length
    ? wishlist?.length
    : 0;

  const cart = useSelector((state: RootState) => state.cart.value);
  const cartTotal = cart?.length || 0;
  

  const navigate = useNavigate();
  return (
    <div
      className={`bg-white dark:bg-zinc-900 w-full shadow-sm sticky left-0 z-50 transition-colors duration-300 ${
        !online && firstEnter ? "top-6" : "top-0"
      } ${online && firstEnter ? "header-animete" : ""}`}
    >
      <div
        id="header"
        className="container relative mx-auto h-20 flex justify-between items-center font-poppins max-[725px]:h-14 max-[767px]:h-16"
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center hover:opacity-70 duration-200"
        >
          <img
            src={logo}
            alt="logo.svg"
            className="h-14 w-14 cursor-pointer max-[767px]:h-10 max-[767px]:w-10"
          />
          <h2 className="ml-1 text-[30px] font-montserrat font-semibold cursor-pointer max-[767px]:text-[24px] text-gray-800 dark:text-white">
            Mebel House
          </h2>
        </div>
        <div className="flex items-center gap-12 max-[986px]:hidden">
          {links?.map((link) => (
            <NavLink
              to={link.href}
              key={link.href}
              className="text-center font-medium text-lg hover:text-bg-primary duration-200 text-gray-800 dark:text-white"
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center justify-between py-3 min-[987px]:gap-6 gap-1">
          <div>
            <Switch />
          </div>

          <FiSearch
            className="h-6 w-6 cursor-pointer hover:text-bg-primary duration-200 max-[986px]:hidden text-gray-800 dark:text-white"
            onClick={() => setSearchOpen(true)}
          />
          <NavLink to={"/wishlist"} className="relative ">
            <AiOutlineHeart className="h-6 w-6 hover:text-bg-primary duration-200 max-[986px]:hidden text-gray-800 dark:text-white" />
            {!!totalWishlist && (
              <span className="absolute max-[986px]:hidden top-[-5px] right-[-5px] bg-bg-primary  w-4 rounded-full text-white flex items-center justify-center text-[12px] h-4">
                {totalWishlist}
              </span>
            )}
          </NavLink>
         <NavLink to={"/cart"} className={"relative"}>
            {!!cartTotal && (
              <span className="absolute max-[986px]:hidden top-[-5px] right-[-5px] bg-bg-primary  w-4 rounded-full text-white flex items-center justify-center text-[12px] h-4">
                {cartTotal}
              </span>
            )}
            <AiOutlineShoppingCart className="h-6 w-6 hover:text-bg-primary duration-200 max-[986px]:hidden" />
          </NavLink>


          <NavLink to={token ? "/auth/profile" : "/auth/sign-in"}>
            {isSuccess ? (
              <div className="w-8 h-8 bg-bg-primary max-[986px]:hidden rounded-full flex items-center justify-center text-white uppercase">
                {data?.client?.full_name?.trim()?.slice(0, 1)}
              </div>
            ) : (
              <LuUser className="h-6 w-6 hover:text-bg-primary duration-200 max-[986px]:hidden text-gray-800 dark:text-white" />
            )}
          </NavLink>
          <div className="flex items-center gap-6">
          <ThemeToggle /> 
          </div> 

          
          <MdMenu
            className="h-6 w-6 min-[987px]:hidden hover:text-bg-primary duration-200 cursor-pointer text-gray-800 dark:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>
      </div>
      <HeaderSearch setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
      {menuOpen && (
        <div className="absolute  container top-20 border-t w-1/2 right-0 bg-white dark:bg-zinc-950 shadow-md z-50">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-white dark:text-white"
            >
              <PiXBold className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-4">
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-bg-primary duration-200 text-gray-800 dark:text-white"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-bg-primary duration-200 text-gray-800 dark:text-white"
            >
              Contact
            </NavLink>
            <NavLink
              to="/auth/profile"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-bg-primary duration-200 text-gray-800 dark:text-white"
            >
              Profile
            </NavLink>
          </div>
        </div>
      )}
      <div id="header" className="max-[986px]:block hidden font-poppins-light">
        <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-zinc-950 opacity-95 py-2 flex items-center justify-evenly z-50 max-[725px]:h-14 max-[767px]:h-16">
          <NavLink to={"/"}>
            <div className="flex flex-col items-center hover:text-bg-primary duration-200 text-gray-800 dark:text-white">
              <AiOutlineHome className="h-5 w-5" />
              <p className="text-xs">Home</p>
            </div>
          </NavLink>
          <NavLink to={"/shop"}>
            <div className="flex flex-col items-center hover:text-bg-primary duration-200 text-gray-800 dark:text-white">
              <FiShoppingBag className="h-5 w-5" />
              <p className="text-xs">Shop</p>
            </div>
          </NavLink>
          <NavLink to={"/wishlist"} className={"relative"}>
            <div className="flex flex-col items-center hover:text-bg-primary duration-200 text-gray-800 dark:text-white">
              <AiOutlineHeart className="h-5 w-5" />
              {!!totalWishlist && (
                <span className="absolute top-[-5px] right-[4px] bg-bg-primary  w-4 rounded-full text-white flex items-center justify-center text-[12px] h-4">
                  {totalWishlist}
                </span>
              )}
              <p className="text-xs">Wishlist</p>
            </div>
          </NavLink>
          <NavLink to={"/cart"} className={"relative"}>
            <div className="flex flex-col items-center hover:text-bg-primary duration-200">
              {!!cartTotal && (
                <span className="absolute top-[-5px] right-[-5px] bg-bg-primary  w-4 rounded-full text-white flex items-center justify-center text-[12px] h-4">
                  {cartTotal}
                </span>
              )}
              <AiOutlineShoppingCart className="h-5 w-5" />
              <p className="text-xs">Cart</p>
            </div>
          </NavLink>

          <div className="flex cursor-pointer flex-col justify-center items-center hover:text-bg-primary duration-200 text-gray-800 dark:text-white">
            <FiSearch
              className="h-5 w-5"
              onClick={() => {
                setSearchOpen(true);
              }}
            />
            <p className="text-xs"> Search</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
