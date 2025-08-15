import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import DynamicRouteHandler from "../components/DynamicRouteHandler";
import "./App.css";
import { Home, Contact ,Blogs, Authenticity_sec ,Articles, Counterfeit, Injectables, Tablets } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Authenticity" element={<Authenticity_sec />} />
          <Route path="/Counterfeit" element={<Counterfeit />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Article" element={<Articles />} />
          <Route path="/injectables" element={<Injectables />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/:param" element={<DynamicRouteHandler />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
