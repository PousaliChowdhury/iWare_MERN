import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function ColorChanging() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  const items = products.filter(
    (p) => p.category === "color-changing"
  );

  return (
    <div className="grid page color-changing-page">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
