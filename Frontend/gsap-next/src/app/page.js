'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProductCard from '@/components/local/ProductCard';
import { ProductProvider } from '@/context/ProductProvider';

let HomeContent = () => {
  let boxref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(boxref.current, {
      x: 100,
      duration: 1,
      scrollTrigger: {
        trigger: boxref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '50px',
        gap: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div ref={boxref}>WELCOME TO THE OYSM STORE</div>

      <ProductCard />
    </div>
  );
};

let Home = () => {
  return (
    <ProductProvider>
      <HomeContent />
    </ProductProvider>
  );
};

export default Home;