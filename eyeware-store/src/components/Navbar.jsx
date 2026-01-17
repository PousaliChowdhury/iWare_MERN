import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useStore } from "../store/useStore";
import "../index.css"; 

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = products.find((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (found) navigate(`/product/${found.id}`);
    else alert("No product found!");
  };

  const handleInputChange = (value) => {
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = products
      .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
      .map((p) => p.name);
    setSuggestions(matches.slice(0, 5)); // show only top 5
  };

  const handleSelectSuggestion = (name) => {
    setQuery(name);
    setSuggestions([]);
    const product = products.find((p) => p.name === name);
    if (product) navigate(`/product/${product.id}`);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <img src="/logo.jpg" alt="Luxury Eyewear Logo" />
      </Link>

      {/* Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search products..."
          />
          <button type="submit">🔍</button>
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSelectSuggestion(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Links with Icons */}
      <div className="nav-links">
        <Link to="/">🏠</Link>
        <Link to="/wishlist">❤️</Link>
        <Link to="/cart">🛒</Link>

        {/* Account button always visible */}
        <Link to="/login">👤</Link>

        {/* Logout button only if user logged in */}
        {user && (
          <button onClick={logout} className="logout-btn" style={{ marginLeft: "0.5rem" }}>
            ➜]
          </button>
        )}
      </div>
    </nav>
  );
}
