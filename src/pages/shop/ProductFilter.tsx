// import React, { useState } from "react";

// const ProductFilter = ({ onFilter }) => {
//   const [filter, setFilter] = useState("");
//   const [order, setOrder] = useState("");
//   const [status, setStatus] = useState("");
//   const [price, setPrice] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [sortBy, setSortBy] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = {
//       filter,
//       order,
//       status,
//       price,
//       minPrice,
//       maxPrice,
//       page,
//       limit,
//       sortBy,
//     };
//     onFilter(query); // Filter parametrlarini yuborish
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Filter</label>
//         <input
//           type="text"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border rounded p-2 w-full"
//           placeholder="e.g., laptop"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Order</label>
//         <select
//           value={order}
//           onChange={(e) => setOrder(e.target.value)}
//           className="border rounded p-2 w-full"
//         >
//           <option value="">--</option>
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Status</label>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border rounded p-2 w-full"
//         >
//           <option value="">--</option>
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Price</label>
//         <select
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="border rounded p-2 w-full"
//         >
//           <option value="">--</option>
//           <option value="low">Low</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Min Price</label>
//         <input
//           type="number"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="border rounded p-2 w-full"
//           placeholder="e.g., 100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Max Price</label>
//         <input
//           type="number"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="border rounded p-2 w-full"
//           placeholder="e.g., 1000"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Page</label>
//         <input
//           type="number"
//           value={page}
//           onChange={(e) => setPage(e.target.value)}
//           className="border rounded p-2 w-full"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Limit</label>
//         <input
//           type="number"
//           value={limit}
//           onChange={(e) => setLimit(e.target.value)}
//           className="border rounded p-2 w-full"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Sort By</label>
//         <input
//           type="text"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border rounded p-2 w-full"
//           placeholder="e.g., createdAt or id"
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         Apply Filters
//       </button>
//     </form>
//   );
// };

// export default ProductFilter;
