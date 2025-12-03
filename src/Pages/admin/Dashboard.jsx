import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineBell,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const navigate = useNavigate();
  const [editId, setEditId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");


  const menuItems = [
    { name: "Home", icon: <AiOutlineHome size={24} /> },
    { name: "Users", icon: <AiOutlineUser size={24} /> },
    { name: "Analytics", icon: <AiOutlineBarChart size={24} /> },
    { name: "Settings", icon: <AiOutlineSetting size={24} /> },
  ];

  useEffect(() => {
    // Fetch Users
    axios
      .get("http://localhost:8080/backend/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

    // Fetch Orders
    axios
      .get("http://localhost:8080/backend/orders")
      .then((res) => {
        setOrders(res.data);
        const total = res.data.reduce(
          (acc, o) => acc + parseFloat(o.total || 0),
          0
        );
        setRevenue(total);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    navigate("/login  ");
  };

  //Delete user from DB
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/backend/user/${id}`)
      .then((res) => {
        alert(res.data.message);

        // Refresh UI (remove deleted user)
        setUsers((prev) => prev.filter((u) => u.userid !== id));
      })
      .catch((err) => console.log(err));
  };

  //Update users
  const updateUser = (id) => {
    axios
      .put(`http://localhost:8080/backend/user/${id}`, {
        username,
        password,
        Phone: phone,
      })
      .then((res) => {
        alert(res.data.message);

        // Update UI instantly
        setUsers((prev) =>
          prev.map((u) =>
            u.userid === id ? { ...u, username, password, Phone: phone } : u
          )
        );

        // Close popup
        setEditId(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white w-64 shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Dashboard</div>
        <nav className="flex-1 mt-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center w-full px-6 py-3 mb-1 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 ${
                activeMenu === item.name ? "bg-blue-100 text-blue-700" : ""
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 w-full"
          >
            <AiOutlineLogout size={24} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <h1 className="text-2xl font-bold">{activeMenu}</h1>
          <div className="flex items-center space-x-4">
            <AiOutlineBell size={24} className="text-gray-600 relative" />
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
              {orders.length}
            </span>
            <div>Admin</div>
          </div>
        </div>

        <div className="p-6 overflow-auto flex-1">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col">
              <span className="text-gray-400 text-sm">Users</span>
              <span className="text-3xl font-bold mt-2">{users.length}</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col">
              <span className="text-gray-400 text-sm">Orders</span>
              <span className="text-3xl font-bold mt-2">{orders.length}</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-3xl font-bold mt-2">
                ${revenue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Conditional Content */}
          {activeMenu === "Users" && (
            <div className="bg-white shadow rounded-xl overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-blue-200">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Password</th>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3" colSpan={2}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx} className="border-b  hover:bg-gray-50">
                      <td className="px-6 py-3">{user.userid}</td>
                      <td className="px-6 py-3">{user.username}</td>
                      <td className="px-6 py-3">{user.password}</td>
                      <td className="px-6 py-3">{user.Phone}</td>
                      <td className="px-6 py-3">{user.role || "User"}</td>
                      <td>
                        {" "}
                        <button
                          className="bg-red-800 text-white px-2 py-1 rounded cursor-pointer outline-0 hover:bg-red-900 "
                          onClick={() => deleteUser(user.userid)}
                        >
                          Delete
                        </button>{" "}
                      </td>
                      <td>
                        {" "}
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                          onClick={() => {
                            setEditId(user.userid);
                            setUsername(user.username);
                            setPassword(user.password);
                            setPhone(user.Phone);

                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeMenu === "Analytics" && (
            <div className="bg-white shadow rounded-xl overflow-auto p-4">
              <h2 className="text-lg font-bold mb-4">Orders Details</h2>
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Order ID</th>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Total ($)</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{order.order_id}</td>
                      <td className="px-4 py-2">{order.full_name}</td>
                      <td className="px-4 py-2">
                        {parseFloat(order.total).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{order.payment_method}</td>
                      <td className="px-4 py-2">{order.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeMenu === "Home" && (
            <div className="text-gray-600">
              Welcome to your dashboard! Use the menu to see details.
            </div>
          )}
        </div>
      </div>

      {editId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>

            <input
              type="text"
              className="w-full border px-3 py-2 mb-3 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="w-full border px-3 py-2 mb-3 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              className="w-full border px-3 py-2 mb-3 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                onClick={() => updateUser(editId)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
