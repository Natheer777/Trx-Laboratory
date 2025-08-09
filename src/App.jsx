import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import DynamicRouteHandler from "../components/DynamicRouteHandler";
import "./App.css";
import { Home, Contact , Authenticity_sec } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Authenticity" element={<Authenticity_sec />} />
          <Route path="/:param" element={<DynamicRouteHandler />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
