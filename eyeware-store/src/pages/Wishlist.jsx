import { useStore } from "../store/useStore";

export default function Wishlist() {
  const wishlist = useStore((s) => s.wishlist);
  const removeFromWishlist = useStore((s) => s.removeFromWishlist);
  const addToCart = useStore((s) => s.addToCart);

  return (
    <div className="page wishlist-page">
      <h1>❤️ Your Wishlist</h1>
      {wishlist.length === 0 && <p>No items in wishlist.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {wishlist.map((p) => (
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
            <button onClick={() => addToCart(p._id)}>🛒</button>
            <button onClick={() => removeFromWishlist(p._id)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
