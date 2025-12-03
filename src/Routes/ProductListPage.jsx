import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeroSection1 from './../assets/HeroImage.jpg';
const ProductListPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
     axios
      .get(`http://localhost:8080/products/${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  },[categoryId]);

   // Add to cart
  const addToCart = (product) => {
    axios
      .post("http://localhost:8080/cart", {
        product_id: product.product_id,
        image: product.image,
        brand: product.brand,
        price: product.price,
        description: product.description,
        quantity: 1
      })
      .then(() => {
        alert("Added to cart!");
        // OPTIONAL: notify navbar count here
        window.dispatchEvent(new Event("cartUpdate"));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      
      <div className="HeroContainer flex justify-center flex-col items-center bg-[#988989]  space-y-5">
        <img src={HeroSection1} alt={HeroSection1} className=""/>
      </div>
      <div className="container mx-auto grid grid-cols-4 gap-4 mt-4 ">
      {products.length > 0 ? (
        <>
          {products.map(product => (
            <div
              key={product.product_id}
              className="w-62 bg-[#eee] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center "
              data-aos="fade-out"
              data-aos-duration="500"
            >
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="rounded-xl w-full h-46 object-cover mb-3"
              />
              <div className="w-full mb-1">
                <span className="text-lg font-bold text-gray-900 leading-tight">
                 <h3>{product.brand}</h3>
                </span>
                <p className="text-gray-700 text-sm font-medium my-1">
                  Price:
                  <span className="text-blue-600 font-semibold">
                    ${product.price}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-3 leading-tight">
                {product.description}
              </p>
              <button
                className="w-full bg-blue-600 text-white rounded-full py-2 font-medium text-sm
                hover:bg-blue-700 active:scale-99 transition-all duration-200 cursor-pointer"
                onClick={()=>addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>No products found in this category.</p>
      )}
       </div>
    </div>
  );
};

export default ProductListPage;