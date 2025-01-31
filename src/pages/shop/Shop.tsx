import React, { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/product-api";
import Products from "../../components/products/Products";
import { Pagination } from "@mui/material";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsViewList } from "react-icons/bs";
import { PiCirclesFourFill } from "react-icons/pi";
import "./Shop.scss";
import ShopInfo from "./ShopInfo";
import { IProductQuery } from "../../types";
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "@/redux/api/category-api";
import Hero from "@/components/hero/Hero";

const Shop = () => {
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("cheapest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false); 
const [category, setCategory] = useState<string>("");

  const { data: fetchedCategories } = useGetCategoriesQuery({});

  

  const limitNum = 16;
 const minPrice = useRef<number | undefined>();
 const maxPrice = useRef<number | undefined>();

 const categories = fetchedCategories?.data.map((category: any) => ({
   id: category.id,
   name: category.name,
 })) || [
   { id: "1", name: "Category 1" },
   { id: "2", name: "Category 2" },
 ];


  // Create query object dynamically based on sortBy
  const query: IProductQuery = {
    limit: limitNum,
    page,
    ...(sortBy === "cheapest" || sortBy === "expensive"
      ? { price: sortBy === "cheapest" ? "asc" : "desc" }
      : { order: sortBy === "oldest" ? "asc" : "desc" }),
    ...(minPrice.current !== undefined && { minPrice: minPrice.current }),
    ...(maxPrice.current !== undefined && { maxPrice: maxPrice.current }),
  };

  const { data, isLoading } = useGetProductsQuery(query);
  const totalPages = data ? Math.ceil(data?.total / limitNum) : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, sortBy]);



  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortBy(value);
    setPage(1); // Reset to the first page when sorting changes
  };

    const handlePriceChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      type: "min" | "max"
    ) => {
      const value = event.target.value
        ? parseInt(event.target.value, 10)
        : undefined;
      console.log(event.target.value);

      if (type === "min") {
        if (value !== undefined) {
          if (value < 0) {
            toast.error("Min price cannot be less than 0!");
            return;
          }
          if (maxPrice.current !== undefined && value > maxPrice.current) {
            toast.error("Min price cannot be greater than max price!");
            return;
          }
        }
        minPrice.current = value;
      } else {
        if (value !== undefined) {
          if (minPrice.current !== undefined && value < minPrice.current) {
            toast.error("Max price cannot be less than min price!");
            return;
          }
        }
        maxPrice.current = value;
      }
    };



    const toggleFilter = () => {
      setIsFilterOpen((prev) => !prev);
    };


  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };


     const applyFilter = () => {
       setIsFilterApplied(!isFilterApplied);
       setPage(1);
     };

     const getResultText = () => {
    if (isLoading) {
      return "Pending results...";
    }}

  return (
    <>
      <Hero pageName="Shop"/>
      <div className="bg-[#faf3ea] dark:bg-[#faf3ea] h-[100px] grid place-items-center font-poppins mb-16">
      <div className="container flex flex-wrap justify-between items-center gap-6 sm:gap-2">
      {/* Left Section: Filter, View Options */}
      <div className="flex items-center gap-6 sm:gap-4 w-full sm:w-auto">
        {/* Filter Button */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:text-bg-primary duration-300 transform hover:scale-110"
          onClick={toggleFilter}
        >
          <GiSettingsKnobs className="w-6 h-6 md:w-5 md:h-5" />
          <p className="text-xl md:text-base font-semibold tracking-wide">Filter</p>
        </div>

        {/* Grid View Icon */}
        <div className="flex justify-center items-center cursor-pointer hover:text-bg-primary duration-300 transform hover:scale-110">
          <PiCirclesFourFill className="w-7 h-7 md:w-6 md:h-6" />
        </div>

        {/* List View Icon */}
        <div className="flex justify-center items-center cursor-pointer hover:text-bg-primary duration-300 transform hover:scale-110">
          <BsViewList className="w-7 h-7 md:w-6 md:h-6" />
        </div>

        {/* Mobile Separator */}
        <div className="hidden md:inline-block text-gray-300">|</div>

        {/* Loading and Results Info */}
        <div className="text-sm md:text-xs flex-grow text-center sm:text-left font-medium text-gray-500">
          {getResultText()}
        </div>
      </div>

      {/* Right Section: Sort and Show Results */}
      <div className="flex flex-wrap gap-6 md:gap-2 items-center w-full sm:w-auto justify-between sm:justify-start">
        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-bg-primary duration-300 transform hover:scale-110">
          <p className="text-base md:text-sm font-medium text-gray-600">Sort by</p>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full sm:w-36 h-12 md:h-12 bg-white dark:bg-slate-100 outline-none text-lg md:text-sm indent-3 rounded-lg shadow-md transition-all focus:ring-4 focus:ring-bg-primary"
          >
            <option value="cheapest">Cheapest</option>
            <option value="expensive">Most Expensive</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Show Results Button */}
        <button
          onClick={applyFilter}
          className="bg-bg-primary text-white p-3 rounded-lg shadow-xl hover:bg-yellow-600 transform hover:scale-105 transition-all focus:ring-4 focus:ring-yellow-500"
        >
          Show Results
        </button>
      </div>
    </div>


      </div>
      {isFilterOpen && (
        <div className="filter-panel bg-bg-primary p-4 rounded-md container mb-5">
          <p className="text-lg font-medium mb-2">Filter Options</p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="minPrice" className="font-medium mb-1">
                Min Price
              </label>
              <input
                id="minPrice"
                type="number"
                defaultValue={minPrice.current || ""}
                onChange={(e) => handlePriceChange(e, "min")}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter min price"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="maxPrice" className="font-medium mb-1">
                Max Price
              </label>
              <input
                id="maxPrice"
                type="number"
                defaultValue={maxPrice.current || ""}
                onChange={(e) => handlePriceChange(e, "max")}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter max price"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-white duration-300 mt-4">
            <p className="text-base md:text-sm">Category</p>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-48 h-14 md:w-32 md:h-12 bg-white dark:bg-slate-100 outline-none text-lg md:text-sm indent-3 rounded-sm text-bg-primary"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Filter */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-white duration-300 mt-4">
            <p className="text-base md:text-sm">Sort by</p>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-48 h-14 md:w-32 md:h-12 bg-white dark:bg-slate-100 outline-none text-lg md:text-sm indent-3 rounded-sm text-bg-primary"
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              {/* Add other sorting options as needed */}
            </select>
          </div>
        </div>
      )}

      <section className="container mb-5">
        {isLoading && (
          <div className="flex justify-center items-center min-h-[10vh]">
            <div className="loader"></div>
          </div>
        )}
        {data ? (
          <Products data={data} seeMoreBtn={false} title="" countProducts={16}/>
        ) : (
          <div className="flex justify-center items-center">
            <h2 className="text-4xl font-medium">No products found.</h2>
          </div>
        )}
        <div className="flex justify-center">
          <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPagination-ul": {
                display: "flex",
                gap: "30px",
                "& .Mui-selected": {
                  backgroundColor: "#B88E2F",
                  color: "#fff",
                  fontWeight: "500",
                },
              },
              "& .MuiPaginationItem-root": {
                backgroundColor: "#F9F1E7",
                color: "#000",
                borderRadius: "8px",
                fontSize: "20px",
                height: "60px",
                width: "60px",
              },
              "@media (max-width: 600px)": {
                "& .MuiPaginationItem-root": {
                  fontSize: "15px",
                  height: "45px",
                  width: "45px",
                },
                "& .MuiPagination-ul": {
                  gap: "10px",
                },
              },
            }}
          />
        </div>
      </section>
      <ShopInfo />
    </>
  );
};

export default React.memo(Shop);
