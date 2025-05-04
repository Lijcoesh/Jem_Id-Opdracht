import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ marginBottom: "20px" }}>
          <h1>Assortiment kwekerij Annie</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
