import { memo } from "react";
import { useCheckTokenQuery } from "../../../../redux/api/customer-api";

const Self = () => {
  const { data } = useCheckTokenQuery(null);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Mijoz Ma'lumotlari</h2>
      <div className=" flex flex-col gap-2">
        <p>
          <strong>Full Name:</strong> {data?.client?.full_name}
        </p>
        <p>
          <strong>Phone Number:</strong> {data?.client?.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {data?.client?.email}
        </p>
        <div>
          <button className="py-2 px-4 bg-bg-primary text-white rounded-md">
            Change Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Self);
