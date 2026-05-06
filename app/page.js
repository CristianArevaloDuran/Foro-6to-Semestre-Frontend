'use client'

import { useEffect } from "react";
import About from "./components/HomePage/About/About";
import Hero from "./components/HomePage/Hero/Hero";

export default function Home() {

  useEffect(()=> {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0,0)
    }
  }, [])

  return (
    <main className="homepage">
      <Hero />
      <About />
    </main>
  );
}
