import Features from "../components/Features";
import Carousel from "../components/Carousel";
import ProductsData from "../data/products.json";
import type { Product } from "../types/Product";

export default function Home() {
  const allProducts: Product[] = ProductsData as Product[];

  return (
    <>
      <Carousel products={allProducts} autoSlideInterval={3000} />
      <Features />
    </>
  );
}