import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const statuses = ["Pending", "Confirmed", "Shipped", "On The Way", "Delivered"];

function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/order/${orderId}`).then((res) => {
        console.log(res)
      setOrder(res.data.order);
      setLoading(false);
    });
  }, [orderId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

// ...
if (loading) return <p className="p-6">Loading...</p>;
if (!order) return <p className="p-6">Order not found.</p>;

// ✅ safely check order_status
const currentStep = statuses.findIndex(
  (s) =>
    order?.order_status &&
    s.toLowerCase().replace(/\s/g, "") ===
      order.order_status.toLowerCase().replace(/\s/g, "")
);


  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* LEFT: Tracking Flow */}
      <div className=" bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 md:mb-8">Order Tracking</h2>

        <div className="relative">
          {statuses?.map((status, index) => {
            const isCompleted = index <= currentStep;
            const isLast = index === statuses.length - 1;

            return (
              <div key={status} className="flex items-start relative">
                {/* Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center z-10
                      ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {isCompleted && <FaCheck size={12} />}
                  </div>

                  {/* Line */}
                  {!isLast && (
                    <div
                      className={`w-[2px] flex-1 ${
                        index < currentStep ? "bg-green-500" : "bg-gray-300"
                      }`}
                      style={{ minHeight: "40px" }}
                    ></div>
                  )}
                </div>

                {/* Label */}
                <div className="ml-4 mb-8">
                  <p
                    className={`font-medium ${
                      index === currentStep
                        ? "text-green-700 text-lg"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Order Details */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>

        {/* Order Info */}
        <div>
          <p>
            <span className="font-medium">Order ID:</span> {order._id}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="capitalize">{order.order_status}</span>
          </p>
          <p>
            <span className="font-medium">Payment:</span> {order.payment_method}{" "}
            ({order.payment_status || "pending"})
          </p>
          <p>
            <span className="font-medium mr-3">Total:</span> 
            <span className="font-[500] text-lg font-sans text-gray-800">

            ₹{order.total}
            </span>
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-semibold mb-2">Products</h4>
          <ul className="divide-y divide-gray-200 max-h-[300px] overflow-y-scroll">
            {order.products.map((p) => (
              <li key={p.productId} className="flex items-center py-2">
                <img
                  src={p.image[0]}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    {p.quantity} × ₹{p.price}
                  </p>
                </div>
                <div className="ml-auto font-semibold">₹{p.subtotal}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery Address */}
        <div>
          <h4 className="font-semibold mb-2">Delivery Address</h4>
          <p>{order.delivery_address.address_line}</p>
          <p>
            {order.delivery_address.city}, {order.delivery_address.state},{" "}
            {order.delivery_address.country} - {order.delivery_address.pincode}
          </p>
          <p>📞 {order.delivery_address.mobile}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
