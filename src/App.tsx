import "./App.css";
import ProductsPage from "./components/ProductsPage";

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ marginBottom: "20px" }}>
        <h1>Assortiment kwekerij Annie</h1>
      </header>
      <main>
        <ProductsPage />
      </main>
    </div>
  );
}

export default App;
