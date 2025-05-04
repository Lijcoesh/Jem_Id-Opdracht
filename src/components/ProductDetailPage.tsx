import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="product-detail-container">
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductDetailPage;
