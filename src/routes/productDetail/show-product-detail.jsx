import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ProductDetail from "./product-detail";
import ProductRecommendations from "./product-recommend";

function ShowProductDetail() {
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
