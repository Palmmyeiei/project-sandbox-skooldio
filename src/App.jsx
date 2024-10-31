import React from "react";
import Navbar from "./components/navbar";
import ProductRecommendations from "./routes/productDetail/product-recommend";
import Footer from "./components/footer";

function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <img
          src="../src/assets/banner.jpeg"
          alt="2024Collection"
          className="w-full h-80 object-cover"
        />
      </section>

      {/* Collection Section */}
      <section className="px-6 py-12 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">2024 Collection</h2>
        <p className="text-lg mb-8">
          Step into a world of winter elegance and style with our latest Winter
          Collection...
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/2">
            <img
              src="../src/assets/CozyHome.jpeg"
              alt="Cozy Breeze"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Cozy Breeze</h3>
              <p className="text-gray-700 mb-4">
                Embrace this season with our carefully curated selection of
                garments...
              </p>
              <button className="bg-gray-900 text-white py-2 px-4 rounded">
                View More
              </button>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/2">
            <img
              src="../src/assets/sunsethour.jpeg"
              alt="Flexi Move"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Flexi Move</h3>
              <p className="text-gray-700 mb-4">
                Step into a world where fashion meets functionality with our
                latest sneaker...
              </p>
              <button className="bg-gray-900 text-white py-2 px-4 rounded">
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProductRecommendations />
      <Footer />
    </div>
  );
}

export default App;
