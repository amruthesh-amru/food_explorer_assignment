import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./components/HomePage";
import ProductDetailPage from "./components/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:barcode" element={<ProductDetailPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
