import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product, StandingPlace, WateringNeeds } from "../types/Product";
import { fetchProducts } from "../services/productService";
import "./ProductsPage.css";

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nameFilter, setNameFilter] = useState<string>("");
  const [minHeight, setMinHeight] = useState<number | "">("");
  const [maxHeight, setMaxHeight] = useState<number | "">("");
  const [minDiameter, setMinDiameter] = useState<number | "">("");
  const [maxDiameter, setMaxDiameter] = useState<number | "">("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

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
        setFilteredProducts(mappedProducts);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [
    nameFilter,
    minHeight,
    maxHeight,
    minDiameter,
    maxDiameter,
    minPrice,
    maxPrice,
    products,
  ]);

  const filterProducts = () => {
    let filtered = [...products];

    if (nameFilter.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (minHeight !== "") {
      filtered = filtered.filter((product) => product.height >= minHeight);
    }
    if (maxHeight !== "") {
      filtered = filtered.filter((product) => product.height <= maxHeight);
    }

    if (minDiameter !== "") {
      filtered = filtered.filter((product) => product.diameter >= minDiameter);
    }
    if (maxDiameter !== "") {
      filtered = filtered.filter((product) => product.diameter <= maxDiameter);
    }

    if (minPrice !== "") {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== "") {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setNameFilter("");
    setMinHeight("");
    setMaxHeight("");
    setMinDiameter("");
    setMaxDiameter("");
    setMinPrice("");
    setMaxPrice("");
  };

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

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <p className="loading-message">Producten laden</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="products-container">
      <h1 className="products-title">Producten</h1>

      <div className="filter-container">
        <h3>Filter Producten</h3>
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="nameFilter">Naam:</label>
            <input
              type="text"
              id="nameFilter"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Zoek op naam"
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label>Hoogte (cm):</label>
            <div className="range-inputs">
              <input
                type="number"
                value={minHeight}
                onChange={(e) =>
                  setMinHeight(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Min"
              />
              <span>tot</span>
              <input
                type="number"
                value={maxHeight}
                onChange={(e) =>
                  setMaxHeight(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Diameter (cm):</label>
            <div className="range-inputs">
              <input
                type="number"
                value={minDiameter}
                onChange={(e) =>
                  setMinDiameter(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Min"
              />
              <span>tot</span>
              <input
                type="number"
                value={maxDiameter}
                onChange={(e) =>
                  setMaxDiameter(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Prijs (€):</label>
            <div className="range-inputs">
              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Min"
              />
              <span>tot</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <button className="reset-filters-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <div className="products-results">
        <p>Aantal resultaten: {filteredProducts.length}</p>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
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
