import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const addToWishlist = useStore((s) => s.addToWishlist);
  const saveForLaterList = useStore((s) => s.saveForLater);       
  const saveForLaterItem = useStore((s) => s.saveForLaterItem); 
  const moveToCartFromSave = useStore((s) => s.moveToCartFromSave);
  const fetchUserData = useStore((s) => s.fetchUserData);
  const user = useStore((s) => s.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  return (
    <div className="page cart-page">
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 && <p>No items in cart.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {cart.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "1rem",
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src={p.image} alt={p.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "0.5rem" }} />
              <span>{p.name} - ${p.price}</span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => addToWishlist(p._id)}>❤️</button>
              <button onClick={() => saveForLaterItem(p._id)}>⏳ Save for Later</button>
              <button onClick={() => removeFromCart(p._id)}>❌</button>
              <button onClick={() => navigate("/buy", { state: { product: p } })}>💳 Buy</button>
            </div>
          </div>
        ))}
        
      </div>
      <hr style={{ margin: "2rem 0" }}/>
        <h1>⏳ Saved for Later</h1>
        
{(!saveForLaterList || saveForLaterList.length === 0) && (
  <p>No saved items.</p>
)}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {saveForLaterList?.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "1rem",
              background: "#fff",
            }}
          >
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <img src={p.image} alt={p.name} width={60} />
      <span>{p.name} - ${p.price}</span>
    </div>

    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button onClick={() => moveToCartFromSave(p._id)}>🛒 Move to Cart</button>
      <button onClick={() => addToWishlist(p._id)}>❤️ Wishlist</button>
      <button onClick={() => removeFromCart(p._id)}>❌ Remove</button>
    </div>
  </div>
))}   
</div>   
</div>
    
  );
}
