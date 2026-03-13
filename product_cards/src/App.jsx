import { useState } from "react";
import ProductCard from "./components/productCards/ProductCards";
import "./index.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 2999,
      rating: 4.5,
      image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX522_.jpg",
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Footwear",
      price: 1999,
      rating: 4.2,
      image: "https://m.media-amazon.com/images/I/61utX8kBDlL._SY695_.jpg",
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Gadgets",
      price: 4999,
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/61akt30bJsL._SX522_.jpg",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 1599,
      rating: 4.3,
      image: "data:image/webp;base64,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",
    },
    {
      id: 5,
      name: "Gaming Mouse",
      category: "Electronics",
      price: 999,
      rating: 4.4,
      image: "https://m.media-amazon.com/images/I/61Mk3YqYHpL.jpg",
    },
    {
      id: 6,
      name: "Casual Sneakers",
      category: "Footwear",
      price: 2499,
      rating: 4.1,
      image: "https://fausto.in/cdn/shop/files/FSTSNK-12GREY_MoodShot_1_400x.jpg?v=1716974357",
    },
    {
      id: 7,
      name: "Fitness Band",
      category: "Gadgets",
      price: 1799,
      rating: 4.2,
      image: "https://www.pebblecart.com/cdn/shop/files/0_afcd32ea-2fc9-406a-b043-ee14475e0862.jpg?v=1760166402&width=673",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || product.category === category),
  );

  return (
    <div>
      {/* HEADER */}

      <div className="header">
        <h1 className="title">Our Products</h1>

        <div className="controls">
          <input
            type="text"
            placeholder="Search product..."
            className="search"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Footwear</option>
            <option>Gadgets</option>
          </select>
        </div>

        <div className="cart">🛒 Cart : {cartCount}</div>
      </div>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            rating={product.rating}
            image={product.image}
            addToCart={() => setCartCount(cartCount + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
