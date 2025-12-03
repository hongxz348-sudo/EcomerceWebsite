import { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from API
  useEffect(() => {
    axios.get("http://localhost:8080/cart").then(res => {
      setCart(res.data);
      setTotal(res.data.reduce((sum, item) => sum + item.price * item.quantity, 0));
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = () => {
    const orderData = {
      ...form,
      cart,
      total,
    };

    axios
      .post("http://localhost:8080/checkout", orderData)
      .then(res => {
        alert("Order placed successfully! Order ID: " + res.data.order_id);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4 bg-white shadow p-6 rounded-xl">
        {/* Form Inputs */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Payment Method */}
        <div>
          <label className="font-semibold">Payment Method</label>
          <div className="flex gap-6 mt-2 ">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={form.payment === "cod"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="payment"
                value="KH QR"
                onChange={handleChange}
                className="cursor-pointer"
              />
              KH QR
            </label>

            <label className="flex items-center gap-2 ">
              <input
                type="radio"
                name="payment"
                value="card"
                onChange={handleChange}
                className="cursor-pointer"
              />
              Credit Card
            </label>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={placeOrder}
          className="w-full bg-green-600 cursor-pointer text-white p-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
