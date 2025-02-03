import { memo, useState, useEffect } from "react";
import {
  useCheckTokenQuery,
  useUpdateCustomerMutation,
} from "../../../../redux/api/customer-api";

const Self = () => {
  const { data, isFetching } = useCheckTokenQuery(null);
  const [updateClient] = useUpdateCustomerMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
  });

  // Ekran o'lchamini tekshirish uchun media query
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    if (data?.client) {
      setFormData({
        full_name: data.client.full_name || "",
        phone_number: data.client.phone_number || "",
        email: data.client.email || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateClient({
        clientId: data?.client?.id,
        data: {
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          email: formData.email,
        },
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl ${
        isMobile ? "p-4" : "p-6"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">User Info</h2>

      {/* Ma'lumotlar yuklanayotganini ko'rsatish */}
      {isFetching ? (
        <p className="text-gray-500">Info uploading...</p>
      ) : isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>
            <strong>Full Name:</strong>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            <strong>Phone Number:</strong>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-bg-primary text-white rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
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
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 px-4 bg-bg-primary text-white rounded-md"
            >
              Change Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Self);
