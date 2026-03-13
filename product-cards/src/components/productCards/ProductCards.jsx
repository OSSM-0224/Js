import { useState } from "react";

function ProductCard({ name, category, price, rating, image, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    setAdded(true);
    addToCart();
  };

  return (
    <div className="card">
      <img src={image} alt={name} />

      <h2>{name}</h2>

      <p className="category">{category}</p>

      <p className="rating">⭐ {rating}</p>

      <p className="price">₹{price}</p>

      <button onClick={handleClick}>{added ? "Added ✓" : "Add to Cart"}</button>
    </div>
  );
}

export default ProductCard;
