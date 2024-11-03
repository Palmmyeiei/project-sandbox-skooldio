import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ShoppingCart from "../components/shoppingcart";
import ProductRecommendations from "./productDetail/product-recommend";
import { useEffect } from "react";

// import { useCart } from "./cart/card-context"; // Adjust the import path if needed
// import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Cart() {
    useEffect(() => {
    document.title = "Cart"; // Set the page title here
  }, []);

  return (
    <>
      <Navbar />
      <ShoppingCart />
      <ProductRecommendations />
      <Footer />
    </>
  );
}
