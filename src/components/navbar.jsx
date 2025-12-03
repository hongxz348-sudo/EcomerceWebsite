import { FaShoppingCart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import  axios from "axios";

const Navbar = ({IsSearch}) => {
  const [count, setCount] = useState(0);

  const loadCount = () => {
    axios.get("http://localhost:8080/cart")
      .then(res => setCount(res.data.length));
  };

  useEffect(() => {
    loadCount();

    // Listen to cart updates
    window.addEventListener("cartUpdate", loadCount);

    return () => {
      window.removeEventListener("cartUpdate", loadCount);
    };
  }, []);


  const [categories,setCategories]=useState([]);
  useEffect(()=>{
    axios
    .get("http://localhost:8080/backend/categories")
    .then(res=>{
      setCategories(res.data);
    }).catch(error=>{
      console.error("Error fetching Categories. " ,error)
    });
  },[])

  return (
    <div className="shadow-md sticky top-0 bg-white z-50">
  <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-2">

    {/* Logo */}
    <div className="flex items-center space-x-3 w-1/2 md:w-auto">
      <Link to="/" className="text-lg md:text-xl font-bold">
        K-Ecommerce
      </Link>
    </div>

    {/* Categories: Desktop */}
    <ul className="hidden lg:flex space-x-2">
      <li className="text-sm text-gray-600 hover:text-blue-600 transition">
        <Link to="/">Home</Link>
      </li>
      {categories.map((items) => (
        <li
          key={items.category_id}
          className="text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <Link to={`/categories/${items.category_id}`}>
            {items.category_name}
          </Link>
        </li>
      ))}
    </ul>
    <div className="w-full sm:w-auto order-3 sm:order-none mt-3 sm:mt-0 flex-grow sm:flex-grow-0">
      <input
        type="text"
        className="w-full sm:w-64 px-4 py-1 border border-gray-400 rounded-sm
          focus:outline-none focus:ring-1 focus:ring-gray-600"
        placeholder="Enter product name..."
        onChange={e=>IsSearch(e.target.value)}
      />
    </div>

    {/* Cart & User */}
    <div className="flex items-center space-x-5 w-1/2 sm:w-auto justify-end">
      <Link to="/cartdetails" className="relative">
        <FaShoppingCart className="text-xl text-gray-600" />
        <span className="CartCount">{count}</span>
      </Link>

      <Link to="/login">
        <FaUserLarge className="text-gray-600 hover:text-gray-700" />
      </Link>
    </div>

    {/* Categories: Mobile / Tablet */}
    <ul className="flex flex-wrap justify-center gap-2.5 mt-3 w-full lg:hidden border-t pt-2">
      <li className="text-sm text-gray-600 hover:text-blue-600 transition">
        <Link to="/">Home</Link>
      </li>
      {categories.map((items) => (
        <li
          key={items.category_id}
          className="text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <Link to={`/categories/${items.category_id}`}>
            {items.category_name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};
export default Navbar;
