import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Purchase from "./pages/Purchase";
import Loader from "./components/Loader";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <BrowserRouter>
      <NavBar />
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchases" element={<Purchase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
