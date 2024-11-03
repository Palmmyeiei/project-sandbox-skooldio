import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ProductDetail from "./product-detail";
import ProductRecommendations from "./product-recommend";
import { useEffect } from "react";

function ShowProductDetail() {
  useEffect(() => {
    document.title = "Product Detail"; // Set the page title here
  }, []);
  
  return (
    <>
      <Navbar />
      <ProductDetail />
      <ProductRecommendations />
      <Footer />
    </>
  );
}

export default ShowProductDetail;
