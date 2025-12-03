import axios from "axios";
import HeroSection1 from "./../assets/HeroImage.jpg";
import "./AOS.js";
const Contents = ({ Data =[]}) => {
  const addToCart = (product) => {
    axios
      .post("http://localhost:8080/cart", {
        product_id: product.product_id,
        image: product.image,
        brand: product.brand,
        price: product.price,
        description: product.description,
        quantity: 1,
      })
      .then(() => {
        alert("Added to cart!");
        window.dispatchEvent(new Event("cartUpdate"));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {/* Hero Section */}
      <div className="HeroContainer flex justify-center flex-col items-center bg-[#988989] ">
        <img
          src={HeroSection1}
          alt="Hero"
          className="w-full max-w-full object-cover"
        />
      </div>
        <div className="container mx-auto mt-4 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Data.map((items) => (
              <div
                key={items.product_id}
                className="bg-[#eee] rounded-lg shadow-md hover:shadow-xl transition-all  duration-300 p-5 flex flex-col items-center"
                data-aos="fade-in"
              >
                <img
                  src={`/images/${items.image}`}
                  alt={items.name}
                  className="rounded-xl w-full h-48 sm:h-52 md:h-49 object-cover mb-3"
                />
                <div className="w-full mb-2 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900">
                    {items.brand}
                  </h3>
                  <p className="text-gray-700 text-sm font-medium mt-1">
                    Price:{" "}
                    <span className="text-blue-600 font-semibold">
                      ${items.price}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-3 text-center sm:text-left">
                  {items.description}
                </p>
                <button
                  className="w-full bg-blue-600 text-white rounded-full py-2 font-medium text-sm hover:bg-blue-700 transition-all cursor-pointer"
                  onClick={() => addToCart(items)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default Contents;
