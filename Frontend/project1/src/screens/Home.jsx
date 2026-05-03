import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCards from "../components/ProductCards";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
      } catch (e) { console.log(e); }
    })();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#080808] px-8 py-10"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mb-10">
        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#cc4444] mb-2">
          New Arrivals
        </p>
        <h1
          className="text-4xl font-semibold text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Explore Collection
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map(p => <ProductCards key={p.id} products={p} />)}
      </div>
    </div>
  );
};

export default Home;