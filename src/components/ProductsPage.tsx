import React, { useState, useEffect } from "react";
import { Product, StandingPlace, WateringNeeds } from "../types/Product";
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

        const mappedProducts = data.map((product) => ({
          ...product,
          standingPlace: mapStandingPlace(product.standingPlace),
          wateringNeeds: mapWateringNeeds(product.wateringNeeds),
        }));

        setProducts(mappedProducts);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    getProducts();
  }, []);

  const mapStandingPlace = (apiValue: string): StandingPlace => {
    if (apiValue === "Sun") return StandingPlace.SUNNY;
    if (apiValue === "Partial") return StandingPlace.PARTIAL;
    if (apiValue === "Shadow") return StandingPlace.SHADOW;
    return StandingPlace.SUNNY;
  };

  const mapWateringNeeds = (apiValue: string): WateringNeeds => {
    if (apiValue === "Low") return WateringNeeds.LOW;
    if (apiValue === "Medium") return WateringNeeds.MEDIUM;
    if (apiValue === "High") return WateringNeeds.HIGH;
    return WateringNeeds.MEDIUM;
  };

  const VertaalStandingPlace = (standingPlace: StandingPlace): string => {
    switch (standingPlace) {
      case StandingPlace.SUNNY:
        return "Zonnig";
      case StandingPlace.PARTIAL:
        return "Gedeelelijken schaduw";
      case StandingPlace.SHADOW:
        return "Schaduw";
      default:
        return "Onbekend";
    }
  };

  const VertaalWateringNeends = (wateringNeeds: WateringNeeds): string => {
    switch (wateringNeeds) {
      case WateringNeeds.LOW:
        return "Laag";
      case WateringNeeds.MEDIUM:
        return "Gemiddeld";
      case WateringNeeds.HIGH:
        return "Hoog";
      default:
        return "Onbekend";
    }
  };

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
              <strong>Prijs:</strong> €{product.price}
            </p>
            <p className="product-description">{product.description}</p>
            <ul className="product-specs">
              <li>
                <strong>Hoogte:</strong> {product.height} cm
              </li>
              <li>
                <strong>Diameter:</strong> {product.diameter} cm
              </li>
              <li>
                <strong>Standplaats:</strong>{" "}
                {VertaalStandingPlace(product.standingPlace)}
              </li>
              <li>
                <strong>Waterbehoefte:</strong>{" "}
                {VertaalWateringNeends(product.wateringNeeds)}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
