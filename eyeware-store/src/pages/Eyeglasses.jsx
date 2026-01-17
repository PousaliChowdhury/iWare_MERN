import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Eyeglasses() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  const items = products.filter(
    (p) => p.category === "eyeglasses"
  );

  return (
    <div className="grid page eyeglasses-page">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}

