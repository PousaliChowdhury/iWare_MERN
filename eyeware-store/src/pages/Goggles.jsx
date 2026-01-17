import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Goggles() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  const items = products.filter(
    (p) => p.category === "goggles"
  );

  return (
    <div className="grid page goggles-page">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}