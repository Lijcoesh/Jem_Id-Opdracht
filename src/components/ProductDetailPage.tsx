import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product, StandingPlace, WateringNeeds } from "../types/Product";

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
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
