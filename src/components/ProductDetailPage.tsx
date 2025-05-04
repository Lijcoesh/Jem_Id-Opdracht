import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product, StandingPlace, WateringNeeds } from "../types/Product";
import "./ProductDetailPage.css";

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jemid-warmupapi.azurewebsites.net/api/Products/${id}`
        );
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
    return <div className="loading-message">Loading product...</div>;
  }

  if (!product) {
    return <div className="not-found-message">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <h1 className="product-detail-title">Product detail</h1>
      <div className="product-detail-layout">
        <img
          src={product.photoUrl}
          alt={product.name}
          className="product-detail-image"
        />

        <div className="product-detail-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">€{product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-specs">
            <p className="product-spec">
              <strong>Height:</strong> {product.height} cm
            </p>
            <p className="product-spec">
              <strong>Diameter:</strong> {product.diameter} cm
            </p>
            <p className="product-spec">
              <strong>Standing Place:</strong> {product.standingPlace}
            </p>
            <p className="product-spec">
              <strong>Watering Needs:</strong> {product.wateringNeeds}
            </p>
            <p className="product-spec">
              <strong>Product ID:</strong> {id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
