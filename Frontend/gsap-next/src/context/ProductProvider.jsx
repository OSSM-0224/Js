'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

let ProductContext = createContext();

export let ProductProvider = ({ children }) => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);


  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export let useProducts = () => useContext(ProductContext);