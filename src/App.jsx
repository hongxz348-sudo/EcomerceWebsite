import "./index.css";
import { useState,useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductListPage from "./Routes/ProductListPage.jsx";
import CartDetails from "./Pages/Cart/CartDetails.jsx";
import Checkout from "./Pages/Cart/CheckoutPage.jsx";
import Login from "./Pages/Log/loginForm.jsx";
import Register from "./Pages/Log/RegisterForm.jsx";
import Dashboard from "./Pages/admin/Dashboard.jsx";
import Search from "./Routes/Search.jsx";

const App = () => {
  const [search,setSearch]=useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/backend/search/products?search="+search)
      .then((res) => setProducts(res.data))
      .catch((err) =>console.log(err) );
  }, []);
  return (
    <>
      <Navbar IsSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Search data={products} />} />
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories/:categoryId" element={<ProductListPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
