import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Sunglasses() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  const items = products.filter(
    (p) => p.category === "sunglasses"
  );

  return (
    <div className="grid page sunglasses-page">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}


  