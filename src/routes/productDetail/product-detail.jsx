import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/card-context";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  FavoriteBorder,
  Login,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function ProductDetail() {
  const { permalink } = useParams(); // Get permalink from URL params
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Add this
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorCode, setSelectedColorCode] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState(null); // Initialize product to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products/${permalink}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const item = jsonData; // Assuming product data is at the root level

        if (!item) {
          throw new Error("Product not found");
        }

        // Extract variants and set default selected options
        const variants = item.variants || [];
        const uniqueColors = [...new Set(variants.map((v) => v.color))]; // Unique color names
        const uniqueColorCodes = [...new Set(variants.map((v) => v.colorCode))]; // Unique color codes
        const uniqueSizes = [...new Set(variants.map((v) => v.size))]; // Unique sizes

        const productData = {
          skuCode: item.skuCode,
          name: item.name,
          description: item.description || "No description available.",
          price: item.price || 0,
          rating: item.rating || 4,
          imageUrls: item.imageUrls || [],
          variants, // Keep the full variant list
          colors: uniqueColors, // Store unique color names from variants
          colorCodes: uniqueColorCodes, // Store unique color codes from variants
          sizes: uniqueSizes, // Store unique sizes from variants
        };

        setProduct(productData);

        setSelectedColor(uniqueColors[0] || ""); // Set default color
        setSelectedColorCode(uniqueColorCodes[0] || ""); // Set default color code
        setSelectedSize(uniqueSizes[0] || ""); // Set default size
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [permalink]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error fetching product: {error.message}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < product.imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.imageUrls.length - 1
    );
  };

  const handleAddToCart = () => {
    const item = {
      skuCode: product.skuCode,
      name: product.name,
      price: product.price,
      imageUrls: product.imageUrls[0],
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    addToCart(item);
    console.log("Item added to cart:", item);
  };

  const thumbnailImages = product.imageUrls.filter(
    (_, index) => index !== currentIndex
  );

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-[full] mx-[160px] mt-[160px] ">
      <div className="grid grid-cols-1 md:grid-cols-[780px_1fr] gap-[40px]">
        <div className="product-picture">
          <div className="product-picture-large relative">
            <img
              src={product.imageUrls[currentIndex]}
              alt={product.name}
              className="w-[780px] h-[780px] object-cover"
            />
            <div className="button-previous absolute top-1/2 left-[16px] transform -translate-y-1/2">
              <IconButton
                className="bg-white shadow-md"
                aria-label="previous"
                onClick={handlePreviousImage}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>
            </div>
            <div className="button-next absolute top-1/2 right-[16px] transform -translate-y-1/2">
              <IconButton
                className="bg-white shadow-md"
                aria-label="next"
                onClick={handleNextImage}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className="product-picture-small flex mt-[31px] gap-[30.79px]">
            {thumbnailImages.slice(0, 4).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className="w-[172.21px] h-[172.21px] object-cover cursor-pointer"
                onClick={() =>
                  handleThumbnailClick(index + (index < currentIndex ? 0 : 1))
                }
              />
            ))}
          </div>
        </div>

        <div className="product-detail flex flex-col w-[780px] gap-[24px]">
          <div className="product-description">
            <div className="flex justify-between items-center mb-[16px]">
              <p className="product-description-id text-[24px] font-bold h-[40px]">
                ID : {product.skuCode}
              </p>
              <IconButton
                className="h-0"
                color="default"
                aria-label="add to favorites"
              >
                <FavoriteBorder fontSize="large" />
              </IconButton>
            </div>
            <p className="product-description-name text-[48px] font-bold mb-[16px]">
              {product.name}
            </p>
            <p className="text-[24px] font-bold text-[#626262]">
              {product.description}
            </p>
          </div>
          <div className="product-price">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              THB{" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </div>
          <div className="product-score flex items-center">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <Star key={i} className="text-[#DEF81C]" fontSize="large" />
            ))}
            <Star fontSize="large" style={{ color: "gray" }} />
          </div>

          <div className="product-selection flex flex-col gap-[24px]">
            <div className="product-color">
              <p className="text-[16px] font-normal text-[#626262] mb-[8px]">
                Color
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, index) => {
                  const colorCode = product.colorCodes[index]; // Get the corresponding color code
                  return (
                    <div key={colorCode} className="flex flex-col items-center">
                      <Button
                        style={{
                          width: "54px",
                          height: "54px",
                          backgroundColor: colorCode, // Set the background color to the color code
                          border:
                            selectedColorCode === colorCode
                              ? "2px solid black"
                              : "none",
                          borderRadius: "0",
                        }}
                        onClick={() => setSelectedColorCode(colorCode)}
                      ></Button>
                      <div className="mt-[8px] text-[16px] text-[#222222] text-center">
                        {color} {/* Display the color name */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-size">
              <p className="text-[16px] font-normal text-[#626262] mb-[8px]">
                Size
              </p>
              <div className="flex gap-[8px]">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "outlined" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: "149.6px",
                      height: "54px",
                      border:
                        selectedSize === size
                          ? "1.5px solid #C1CD00"
                          : "1.5px solid #E1E1E1",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "0",
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="product-quantity">
              <p className="text-[16px] font-normal text-[#626262] mb-[8px]">
                Quantity
              </p>
              <Select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                displayEmpty
                className="w-[150px]"
                style={{
                  width: "139px",
                  height: "54px",
                  borderRadius: "0",
                  border: "0.5px solid #E1E1E1",
                }}
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <MenuItem key={q} value={q}>
                    {q}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              width: "780px",
              height: "54px",
              backgroundColor: "#222222",
              color: "white",
              borderRadius: 0,
            }}
            onClick={() => {
              try {
                handleAddToCart(); // Correctly invoke the function with ()
                console.log("handle work");
              } catch {
                console.log("handle error");
              }
              console.log("Click");
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
