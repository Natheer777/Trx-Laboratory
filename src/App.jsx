import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./sections/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import DynamicRouteHandler from "../components/DynamicRouteHandler";
import "./App.css";
import {
  Home,
  Contact,
  Blogs,
  About,
  Authenticity_sec,
  Articles,
  Counterfeit,
  Injectables,
  Tablets,
  Dash,
} from "./pages";
import { useEffect } from "react";
const queryClient = new QueryClient();

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dash />
              </PrivateRoute>
            }
          />
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
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
