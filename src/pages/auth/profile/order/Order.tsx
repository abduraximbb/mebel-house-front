import React, { useState } from "react";
import { useCheckTokenQuery } from "@/redux/api/customer-api";
import {
  useDeleteOrderMutation,
  useGetOrderByCustomerIdQuery,
} from "@/redux/api/order-api";
import toast from "react-hot-toast";

const Order = () => {
  const { data } = useCheckTokenQuery(null);
  const [deleteOrder] = useDeleteOrderMutation();
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const customerId = data?.client?.id;
  const {
    data: orderData,
    isLoading,
    isFetching,
  } = useGetOrderByCustomerIdQuery(customerId, {
    skip: !customerId,
  });

  if (isLoading || isFetching) {
    return (
      <p className="text-center text-lg dark:text-white">Loading orders...</p>
    );
  }

  if (!orderData?.data?.length) {
    return (
      <p className="text-center text-lg dark:text-white">No orders found</p>
    );
  }

  const handleDeleteOrder = async (id: string) => {
    setLoadingOrderId(id);
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order cancelled");
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="container">
      <h2 className="text-3xl max-sm:text-[24px] font-semibold mb-6 dark:text-white">
        My Orders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderData?.data?.map((order: any) => (
          <div
            key={order.id}
            className="border rounded-md p-6 max-sm:p-2 mb-8 bg-white dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-[1.02]"
          >
            {order.status !== "cancelled" ? (
              <div className="flex relative flex-col sm:flex-row justify-between items-start sm:items-center max-sm:w-full">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Order ID: {order.id} - Status:{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    {order.status}
                  </span>
                </h3>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  disabled={loadingOrderId === order.id}
                  className={`text-white absolute max-sm:top-0 top-7 hover:bg-opacity-85 right-0 rounded-md py-1 px-4 font-semibold text-lg ${
                    loadingOrderId === order.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-400"
                  }`}
                >
                  {loadingOrderId === order.id ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            ) : null}

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Address:</strong> {order.address?.region},{" "}
              {order.address?.street}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <strong>Total Price:</strong> ${order.total_price}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {order.order_items.map((item: any, index: any) => (
                <div
                  key={index}
                  className="border p-4 max-sm:p-2 rounded-lg flex flex-col sm:flex-row items-center gap-6 max-sm:gap-2 bg-gray-100 dark:bg-gray-900 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="text-center sm:text-left">
                    <h4 className="font-medium text-gray-900 dark:text-gray-200">
                      Product ID: {item.productId}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Order);
