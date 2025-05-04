import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { fetchProducts } from "../services/productService";
import "./ProductsPage.css";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Products data:", data);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p className="loading-message">Producten laden</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="products-container">
      <h1 className="products-title">Producten</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.photoUrl}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">
              <strong>Prijs:</strong> ${product.price}
            </p>
            <p className="product-description">{product.description}</p>
            <ul className="product-specs">
              <li>
                <strong>Height:</strong> {product.height} cm
              </li>
              <li>
                <strong>Diameter:</strong> {product.diameter} cm
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
