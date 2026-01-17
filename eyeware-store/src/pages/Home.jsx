import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const carouselSlides = [
  { image: "/carousel1.jpeg", caption: "Summer Collection" },
  { image: "/carousel2.jpeg", caption: "Luxury Eyewear" },
  { image: "/carousel3.jpeg", caption: "New Arrivals" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % carouselSlides.length);
  };

  return (
    <div className="page home-page">
<section className="hero-video relative w-full h-screen overflow-hidden">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src="videos/hero-video.mov"
    autoPlay
    loop
    muted
    playsInline
  />

  <div className="hero-text flex flex-col items-center justify-center absolute inset-0 mx-auto">
    <h1>Luxury Eyewear Collection</h1>
    <p>Discover premium sunglasses, eyeglasses, and smart eyewear crafted for elegance.</p>
  </div>
</section>

      <section className="grid categories">
        <Link to="/sunglasses" className="product-card">
          <img src="/sunglasses.jpeg" alt="Sunglasses" />
          <h2>Sunglasses</h2>
        </Link>

        <Link to="/eyeglasses" className="product-card">
          <img src="/eyeglasses.jpeg" alt="Eyeglasses" />
          <h2>Eyeglasses</h2>
        </Link>

        <Link to="/goggles" className="product-card">
          <img src="/goggles.jpeg" alt="Color-Changing Glasses" />
          <h2>Goggles</h2>
        </Link>

        <Link to="/smart-glasses" className="product-card">
          <img src="/smartglasses.jpg" alt="Smart Glasses" />
          <h2>Smart Glasses</h2>
        </Link>

        <Link to="/color-changing" className="product-card">
          <img src="/color-changing.jpeg" alt="Color-Changing Glasses" />
          <h2>Color-Changing Glasses</h2>
        </Link>
      </section>
      
      <section className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselSlides.map((slide, i) => (
            <div className="carousel-item" key={i}>
              <img src={slide.image} alt={slide.caption} />
              <div className="carousel-caption">{slide.caption}</div>
            </div>
          ))}
        </div>
        <button className="prev" onClick={prevSlide}>‹</button>
        <button className="next" onClick={nextSlide}>›</button>
      </section>

      <section className="editorial">
        <div className="story">
          <img src="/story1.jpg" alt="Story 1" />
          <div className="story-text">
            <h2>Craftsmanship & Elegance</h2>
            <p>Our eyewear is crafted with precision, quality, and style to match your personality.</p>
          </div>
        </div>
        <div className="story">
          <img src="/story2.jpg" alt="Story 2" />
          <div className="story-text">
            <h2>Heritage & Legacy</h2>
            <p>Explore the heritage of luxury eyewear that defines timeless fashion.</p>
          </div>
        </div>
      </section>
    </div>
  );
  <Footer/>
}
