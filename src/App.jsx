import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import DynamicRouteHandler from "../components/DynamicRouteHandler";
import "./App.css";
import { Home, Contact ,Blogs,  About, Authenticity_sec ,Articles, Counterfeit, Injectables, Tablets } from "./pages";
import { useEffect } from "react";
function App() {
  
  useEffect(() => {
    setInterval(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
                  observer.unobserve(entry.target); // نوقف المراقبة بعد الظهور

          }
        });
      });

      const Elements = document.querySelectorAll(
        ".left ,.right ,.top ,.hidden"
      );
      Elements.forEach((el) => observer.observe(el));

      return () => {
        Elements.forEach((el) => observer.unobserve(el));
      };
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
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
