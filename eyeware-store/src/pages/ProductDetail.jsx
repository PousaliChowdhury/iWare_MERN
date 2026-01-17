import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Ensure you have styles for hero, carousel, editorial

export default function ProductDetail() {
  const { id } = useParams(); // MongoDB ObjectId
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        if (mounted) setProduct(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? product.lifestyleImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === product.lifestyleImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="page product-detail-page">
      {/* Hero Section with Product Image */}
      <section className="hero-video relative w-full h-screen overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="hero-text flex flex-col items-center justify-center absolute inset-0 mx-auto text-center text-white">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="text-xl mt-4">{product.description}</p>
          <p className="text-2xl font-semibold mt-2">${product.price}</p>
        </div>
      </section>

      {/* Editorial / Product Story */}
      <section className="editorial py-16 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Product Story</h2>
        <p className="text-lg">
          {product.longDescription || "Detailed product story goes here."}
        </p>
      </section>

      {/* Lifestyle / Campaign Carousel */}
      {product.lifestyleImages && product.lifestyleImages.length > 0 && (
        <section className="carousel py-16 px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">See It in Lifestyle</h2>
          <div className="carousel-wrapper relative flex items-center justify-center">
            <button
              className="absolute left-0 z-10 text-4xl font-bold px-4 py-2"
              onClick={prevSlide}
            >
              ‹
            </button>
            <img
              src={product.lifestyleImages[currentSlide]}
              alt={`Lifestyle ${currentSlide}`}
              className="lifestyle-image max-w-full rounded-lg shadow-lg"
            />
            <button
              className="absolute right-0 z-10 text-4xl font-bold px-4 py-2"
              onClick={nextSlide}
            >
              ›
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
