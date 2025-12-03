import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function CartDetails() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/cart")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, []);
  const updateQty = (id, type) => {
    setCart(prev =>
      prev.map(item =>
        item.product_id === id
          ? {
              ...item,
              quantity:
                type === "add"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }
          : item
      )
    );
  };

  // REMOVE FROM DB
  const removeItem = (id) => {
    axios.delete(`http://localhost:8080/cart/${id}`)
      .then(() => {
        setCart(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Cart Details</h1>

      <div className="space-y-4 cursor-pointer">
        {cart.map(item => (
          <div
            key={item.product_id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-none  transition duration-500"
          >
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-lg"><span className="text-md text-blue-600 font-[550]">Brand: </span> {item.brand}</h2>
              <p className="description-cartDetails text-sm">{item.description}</p>
              <p className="text-gray-500">Price: ${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.product_id, "minus")}
                className="px-3 py-1 bg-gray-200 rounded-lg cursor-pointer"
              >
                -
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => updateQty(item.product_id, "add")}
                className="px-3 py-1 bg-gray-200 rounded-lg cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 font-semibold ml-4 bg-blue-600 px-3 py-1.5 cursor-pointer rounded hover:bg-blue-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-xl">
        <div className="text-xl font-bold flex justify-between">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          <Link to="/checkout">Checkout</Link>
        </button>
      </div>
    </div>
  );
}
