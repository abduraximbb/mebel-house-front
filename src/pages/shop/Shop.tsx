import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/product-api";
import Products from "../../components/products/Products";
import { Pagination } from "@mui/material";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsViewList } from "react-icons/bs";
import Hero from "./Hero";
import { PiCirclesFourFill } from "react-icons/pi";
import "./Shop.scss";
import ShopInfo from "./ShopInfo";
import { IProductQuery } from "../../types";

const Shop = () => {
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("cheapest");
  const limitNum = 16

  // Create query object dynamically based on sortBy
  const query: IProductQuery = {
    limit: limitNum,
    page,
    ...(sortBy === "cheapest" || sortBy === "expensive"
      ? { price: sortBy === "cheapest" ? "asc" : "desc" }
      : { order: sortBy === "oldest" ? "asc" : "desc" }),
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

  return (
    <>
      <Hero />
      <div className="bg-[#faf3ea] dark:bg-[#645644] h-[100px] grid place-items-center font-poppins mb-16">
        <div className="container flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6 sm:gap-4">
            <div className="flex items-center gap-3 cursor-pointer hover:text-bg-primary duration-300">
              <GiSettingsKnobs className="w-6 h-6 md:w-5 md:h-5" />
              <p className="text-xl md:text-base font-medium">Filter</p>
            </div>
            <div className="flex justify-center items-center cursor-pointer hover:text-bg-primary duration-300">
              <PiCirclesFourFill className="w-7 h-7 md:w-6 md:h-6" />
            </div>
            <div className="flex justify-center items-center cursor-pointer hover:text-bg-primary duration-300">
              <BsViewList className="w-7 h-7 md:w-6 md:h-6" />
            </div>
            <div className="hidden md:inline-block">|</div>
            <div className="text-sm md:text-xs">
              {isLoading
                ? "Pending results..."
                : data && data.total > 0
                ? `Showing ${Math.min(
                    (page - 1) * limitNum + 1,
                    data.total
                  )}–${Math.min(page * limitNum, data.total)} of ${
                    data.total
                  } results`
                : "No results found"}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-2 items-center">
            <div className="flex items-center gap-2 cursor-pointer hover:text-bg-primary duration-300">
              <p className="text-base md:text-sm">Sort by</p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-48 h-14 md:w-32 md:h-12 bg-white dark:bg-slate-100 outline-none text-lg md:text-sm indent-3 rounded-sm text-bg-primary"
              >
                <option value="cheapest">Cheapest</option>
                <option value="expensive">Most Expensive</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
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
