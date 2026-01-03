import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import IndividualProduct from './pages/IndividualProduct';
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import About from "./pages/About"

function AppContent() {
  const location = useLocation();
  const isIndividualProduct =
    location.pathname.startsWith("/jewellery/") ||
    location.pathname.startsWith("/dresses/");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/jewellery/:id" element={<IndividualProduct />} />
        <Route path="/dresses/:id" element={<IndividualProduct />} />
      </Routes>
      <Footer />
      {/* ✅ Floating WhatsApp Button, hidden on IndividualProduct */}
      {!isIndividualProduct && <WhatsAppButton />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
