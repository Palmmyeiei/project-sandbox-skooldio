import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ShoppingCart from "../components/shoppingcart";
import ProductRecommendations from "./productDetail/product-recommend";

// import { useCart } from "./cart/card-context"; // Adjust the import path if needed
// import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Cart() {
  // const { cartItems } = useCart();

  return (
    <>
      <Navbar />
      <ShoppingCart />
      <ProductRecommendations />
      <Footer />
    </>
  );
}
