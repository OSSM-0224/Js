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
      image: "https://m.media-amazon.com/images/I/61Mk3YqYHpL.jpg",
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
