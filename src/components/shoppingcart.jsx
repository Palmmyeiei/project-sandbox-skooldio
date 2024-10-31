import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../routes/cart/card-context"; // Adjust the import path if needed
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // Material-UI ShoppingBag icon
import DeleteIcon from "@mui/icons-material/Delete"; // Material-UI Delete icon
import { Button } from "@mui/material";

const ShoppingCart = () => {
  const { cartItems } = useCart(); // Get cartItems from CartContext
  const cartId = localStorage.getItem("cartId");
  const navigate = useNavigate();

  const removeFromCart = async (itemId) => {
    try {
      await fetch(
        `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );
      // Update the cartItems in context
      removeFromCart(itemId); // Call the context method to remove the item
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <main className="max-w-[1200px] mx-auto my-5 p-5 bg-white">
      <h1 className="text-2xl mb-5 font-bold text-center md:text-left">
        My Cart
      </h1>
      <div className="cartList flex flex-col md:flex-row justify-between gap-5">
        <div className="flex-[2] p-4 md:p-8 bg-[#fafafa] rounded-lg text-center">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="w-[403px] h-[403px] mx-auto mb-4">
                <img src="../../src/assets/emptycart.png" alt="emptycart" />
              </div>
              <p className="text-xl font-bold mb-2">Your cart is empty</p>
              <span className="text-sm text-[#666] mb-5 block">
                Looks like you have not added anything to your cart. Go ahead &
                explore top categories.
              </span>
              <button
                className="w-full md:w-[173px] h-[54px] bg-[#222222] text-[#FFFFFF]"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.skuCode}
                className="flex flex-col md:flex-row justify-between py-4 border-b border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={item.imageUrls}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-gray-900 font-medium">
                      {item.name}
                    </span>
                    <span className="text-gray-500">Color: {item.color}</span>
                    <span className="text-gray-500">Size: {item.size}</span>
                    <span className="text-gray-500">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                  <span className="text-gray-900 font-medium">
                    THB {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    // variant="outlined"
                    color="#222222"
                    size="small"
                    onClick={() => removeFromCart(item.skuCode)} // Call the remove function
                  >
                    <DeleteIcon className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="flex-[1] bg-[#fafafa] p-4 md:p-8 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Summary</h2>
            <span className="text-lg text-gray-500">
              {cartItems.length} items
            </span>
          </div>

          {/* Subtotal Row */}
          <div className="flex justify-between py-4 border-b border-gray-100">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-500">THB {calculateTotal()}</span>
          </div>

          {/* Shipping Fee Row */}
          <div className="flex justify-between py-4 border-b border-gray-100">
            <span className="text-gray-500">Shipping fee</span>
            <span className="text-gray-500">0.00</span>
          </div>

          {/* Total Row */}
          <div className="flex justify-between py-4 mb-8">
            <span className="text-xl font-medium text-gray-900">Total</span>
            <span className="text-xl font-medium text-gray-900">
              THB {calculateTotal()}
            </span>
          </div>

          <div>
            <button
              disabled={!cartItems.length}
              className={`w-full py-2 text-lg font-medium rounded ${
                cartItems.length
                  ? "bg-[#222222] text-white rounded-none"
                  : "bg-[#E1E1E1] text-[#9F9F9F] rounded-none cursor-not-allowed"
              }`}
            >
              Check Out
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full mt-3 py-2 text-lg font-medium bg-[#FFFFFF] text-[#222222] border-[1px] border-[#E1E1E1] rounded-none"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
