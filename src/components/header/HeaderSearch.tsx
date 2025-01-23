import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { FiSearch } from "react-icons/fi";
import { useGetProductsQuery } from "@/redux/api/product-api";
import { IProduct } from "@/types";
import useDebounce from "@/hooks/useDebounce";
import { CircularProgress } from "@mui/material";

const HeaderSearch: FC<{ searchOpen: boolean; setSearchOpen: any }> = ({
  setSearchOpen,
  searchOpen,
}) => {
  const ref = useOutsideClick(() => setSearchOpen(false));
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value.trim().toLowerCase());
  const { data, isSuccess, isFetching } = useGetProductsQuery(
    { limit: 10, filter: debouncedValue },
    { skip: !debouncedValue}
  );
  const handlClose = ()=> {
    setSearchOpen(false)
    setValue("")
  }

  return (
    <div
      ref={ref}
      className={`absolute  top-0 bg-white p-6 flex flex-col items-center gap-4 shadow-lg min-h-[250px] rounded-b-3xl w-full transition-all duration-500 ${
        searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={() => {
          navigate("/"), setSearchOpen(false);
        }}
        className="absolute left-5 top-5 flex hover:opacity-70 duration-300 max-[1300px]:hidden"
      >
        <img src={logo} alt="logo.svg" />
        <h2 className="ml-1 text-[30px] font-montserrat font-semibold cursor-pointer">
          Furnishings
        </h2>
      </div>
      <div className="flex items-center w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for products"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 border  rounded-l-lg outline-none text-gray-700 text-sm"
        />
        <button className="p-3 border border-x-0 round hover:bg-amber-600 hover:border-amber-600 hover:text-white transition duration-300">
          <FiSearch className="h-5 w-5" />
        </button>
        <button
          onClick={() => setSearchOpen(false)}
          className="p-3 text-[14.5px] bg-red-500 text-white rounded-r-lg hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
      </div>
      {
        // qidirilgan productslar
        !isFetching && value.trim() && isSuccess && (
          <div className=" max-w-2xl w-full flex flex-col gap-1">
            {data?.data?.map((product: IProduct) => (
              <Link
                key={product.id}
                onClick={handlClose}
                className="flex items-center gap-3 border-b p-1 hover:bg-slate-100 last:border-b-0"
                to={`/product/${product.id}`}
              >
                <img
                  src={import.meta.env.VITE_BASE_IMAGE_URL + product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 object-contain"
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )
      }
      {!value.trim() && (
        <div className="flex flex-wrap gap-3 max-w-2xl justify-center">
          {[
            "Sofa",
            "Table",
            "Chair",
            "Bed Frame",
            "Bookshelf",
            "Coffee Table",
            "Wardrobe",
            "Armchair",
          ].map((term) => (
            <span
              key={term}
              onClick={() => setValue(term)}
              className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 cursor-pointer hover:bg-gray-200 hover:shadow-md transition duration-300"
            >
              {term}
            </span>
          ))}
        </div>
      )}

      {
        // loading
        isFetching && <CircularProgress />
      }
      {
        // not found
        !data?.total && isSuccess && value.trim() && !isFetching && (
          <div>
            <p className="text-red-500">Product not found</p>
          </div>
        )
      }
    </div>
  );
};

export default React.memo(HeaderSearch);
