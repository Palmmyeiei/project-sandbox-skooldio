import React, { useState, useEffect } from "react";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        // Map the fetched data to the desired structure
        const productData = jsonData.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || "No description available.",
          price: item.price || 0,
          rating: item.rating || 4,
          image: item.imageUrls ? item.imageUrls[0] : "default_image_url",
          permalink: item.permalink, // Include permalink
        }));

        setProducts(productData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link to={`/products/${product.permalink}`} key={product.id}>
            {" "}
            {/* Updated path */}
            <div className="product-card flex flex-col w-[370px] h-[524px] gap-[16px] border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="product-rec-image">
                <img
                  style={{
                    width: "100%",
                    height: "200px",
                  }}
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover"
                />
              </div>

              <div className="product-rec-detail flex flex-col gap-[8px]">
                <p className="product-rec-name text-lg font-bold text-[#222222] line-clamp-1">
                  {product.name}
                </p>
                <p className="product-rec-description text-sm font-normal text-[#626262] line-clamp-1">
                  {product.description}
                </p>
                <div className="product-rec-score flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      fontSize="small"
                      className={
                        index < product.rating
                          ? "text-[#DEF81C]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="product-rec-price text-lg font-bold text-[#222222] text-right">
                  THB {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
