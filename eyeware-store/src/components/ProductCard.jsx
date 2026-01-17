import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useState } from "react";

export default function ProductCard({ product }) {
  const addToCart = useStore((s) => s.addToCart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const addToWishlist = useStore((s) => s.addToWishlist);
  const removeFromWishlist = useStore((s) => s.removeFromWishlist);

  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);

  const inCart = cart.some((p) => String(p._id) === String(product._id));
  const inWishlist = wishlist.some((p) => String(p._id) === String(product._id));

  const [error, setError] = useState("");

  const handleCart = async () => {
  try {
    if (inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
    setError("");
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.msg || err.message || "❌ Failed to update cart");
  }
};

const handleWishlist = async () => {
  try {
    if (inWishlist) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
    setError("");
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.msg || err.message || "❌ Failed to update wishlist");
  }
};


  return (
    <div>
      <Link to={`/product/${product._id}`} className="product-card">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>${product.price}</p>
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
        <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleWishlist();
  }}
>
  {inWishlist ? "💔 Remove" : "❤️ Add"}
</button>

<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCart();
  }}
>
  {inCart ? "❌ Remove" : "🛒 Add"}
</button>

      </div>

      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
    </div>
  );
}
