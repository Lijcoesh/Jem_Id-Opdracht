import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product, StandingPlace, WateringNeeds } from "../types/Product";

const ProductDetailPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <h1>Product detail</h1>
      <div>
        <img src={product.photoUrl} alt={product.name} />

        <div>
          <h2>{product.name}</h2>
          <p>€{product.price}</p>
          <p>{product.description}</p>
          <p>Product ID: {id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
