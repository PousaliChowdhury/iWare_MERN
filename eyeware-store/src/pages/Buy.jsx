import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Buy.css"; // separate CSS file

export default function Buy() {
  const { state } = useLocation();
  const product = state?.product;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Credit Card"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}! Your order for ${product?.name} is confirmed.`);
    // Clear form if needed
    setForm({ name:"", email:"", phone:"", address:"", payment:"Credit Card" });
  };

  if (!product) return <p>No product selected.</p>;

  return (
    <div className="buy-page">
      <h1>💳 Checkout</h1>
      <div className="product-info">
        <img src={product.image} alt={product.name} />
        <p>{product.name} - ${product.price}</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Shipping Address" value={form.address} onChange={handleChange} required />

        <div className="payment-methods">
          <label>
            <input type="radio" name="payment" value="Credit Card" checked={form.payment==="Credit Card"} onChange={handleChange} />
            <img src="/credit-card.jpg" alt="Credit Card" /> Credit Card
          </label>
          <label>
            <input type="radio" name="payment" value="Debit Card" checked={form.payment==="Debit Card"} onChange={handleChange} />
            <img src="/debit-card.png" alt="Debit Card" /> Debit Card
          </label>
          <label>
            <input type="radio" name="payment" value="UPI" checked={form.payment==="UPI"} onChange={handleChange} />
            <img src="/upi.jpeg" alt="UPI" /> UPI
          </label>
          <label>
            <input type="radio" name="payment" value="Cash on Delivery" checked={form.payment==="Cash on Delivery"} onChange={handleChange} />
            <img src="/cod.png" alt="Cash on Delivery" /> COD
          </label>
        </div>

        <button type="submit" className="confirm-btn">Confirm Purchase</button>
      </form>
    </div>
  );
}
