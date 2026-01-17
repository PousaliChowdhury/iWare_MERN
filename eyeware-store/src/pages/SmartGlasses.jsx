import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function SmartGlasses() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  const items = products.filter(
    (p) => p.category === "smart-glasses"
  );

  return (
    <div className="grid page smart-glasses-page">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}