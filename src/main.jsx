import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ShowProductDetail from "./routes/productDetail/show-product-detail.jsx";
import ProductList from "./routes/ProductList.jsx";
import Cart from "./routes/Cart.jsx";
import CartProvider from "./routes/cart/card-context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:permalink",
    element: <ShowProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
