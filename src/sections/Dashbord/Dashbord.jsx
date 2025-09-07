import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  logout,
} from "../../api";
import ShinyText from "../../components/ShinyText/ShinyText";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Dashbord.css";

function ProductForm({ initial, onSave, onClose, isLoading }) {
  const [form, setForm] = useState(initial);
  const [formError, setFormError] = useState("");

  function handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;
    // Enforce alphanumeric only and max length 5 for code fields
    if (["code", "code2", "code3", "code4"].includes(name)) {
      value = String(value || "").replace(/[^a-z0-9]/gi, "").slice(0, 5);
    }
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="dashboard-modal-bg">
      <form
        className="dashboard-modal"
        onSubmit={(e) => {
          e.preventDefault();
          // Validate codes: each must be exactly 5 alphanumeric characters
          const codes = [form.code, form.code2, form.code3, form.code4];
          const allValid = codes.every((c) => /^[A-Za-z0-9]{5}$/.test(String(c || "")));
          if (!allValid) {
            setFormError("Codes (code, code2, code3, code4) must be exactly 5 characters (letters or numbers).");
            return;
          }
          setFormError("");
          onSave(form);
        }}
      >
        <h3 className="dashboard-title mb-4">
          {initial.p_id ? "Edit" : "Add"} Product
        </h3>
        <div className="form-grid">
          <input
            name="pname"
            placeholder="Product Name EN"
            className="w-full mb-2 p-2 border rounded"
            value={form.pname || ""}
            onChange={handleChange}
            required
          />
          <input
            name="name"
            placeholder="Product Name"
            className="w-full mb-2 p-2 border rounded"
            value={form.name || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="product_overview"
            placeholder="General product description..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.product_overview || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="uses"
            placeholder="Product uses..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.uses || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="potential_harms"
            placeholder="Potential harms..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.potential_harms || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="method_of_use"
            placeholder="How to use..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.method_of_use || ""}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            className="w-full mb-2 p-2 border rounded"
            value={form.price || ""}
            onChange={handleChange}
            required
          />
          <input
            name="qr_code"
            placeholder="QR Code"
            className="w-full mb-2 p-2 border rounded"
            value={form.qr_code || ""}
            onChange={handleChange}
            required
          />
          <input
            name="code"
            placeholder="Code"
            className="w-full mb-2 p-2 border rounded"
            value={form.code || ""}
            onChange={handleChange}
            maxLength={5}
            pattern="[A-Za-z0-9]{5}"
            inputMode="text"
            title="Enter exactly 5 characters (letters or numbers)"
            required
          />
          <input
            name="code2"
            placeholder="Code 2"
            className="w-full mb-2 p-2 border rounded"
            value={form.code2 || ""}
            onChange={handleChange}
            maxLength={5}
            pattern="[A-Za-z0-9]{5}"
            inputMode="text"
            title="Enter exactly 5 characters (letters or numbers)"
            required
          />
          <input
            name="code3"
            placeholder="Code 3"
            className="w-full mb-2 p-2 border rounded"
            value={form.code3 || ""}
            onChange={handleChange}
            maxLength={5}
            pattern="[A-Za-z0-9]{5}"
            inputMode="text"
            title="Enter exactly 5 characters (letters or numbers)"
            required
          />
          <input
            name="code4"
            placeholder="Code 4"
            className="w-full mb-2 p-2 border rounded"
            value={form.code4 || ""}
            onChange={handleChange}
            maxLength={5}
            pattern="[A-Za-z0-9]{5}"
            inputMode="text"
            title="Enter exactly 5 characters (letters or numbers)"
            required
          />
          <textarea
            name="warnings"
            placeholder="Important warnings..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.warnings || ""}
            onChange={handleChange}
            required
          />
          <input
            name="vial"
            placeholder="Vial"
            className="w-full mb-2 p-2 border rounded"
            value={form.vial || ""}
            onChange={handleChange}
            required
          />
          <input
            name="caliber"
            placeholder="Caliber"
            className="w-full mb-2 p-2 border rounded"
            value={form.caliber || ""}
            onChange={handleChange}
            required
          />
          <input
            name="vid_url"
            placeholder="Video URL"
            className="w-full mb-2 p-2 border rounded"
            value={form.vid_url || ""}
            onChange={handleChange}
            required
          />
          <input
            name="img_url"
            placeholder="Image one"
            className="w-full mb-2 p-2 border rounded"
            value={form.img_url || ""}
            onChange={handleChange}
            required
          />
          <input
            name="img_url2"
            placeholder="Image two"
            className="w-full mb-2 p-2 border rounded"
            value={form.img_url2 || ""}
            onChange={handleChange}
            required
          />
          <input
            name="img_url3"
            placeholder="Image three"
            className="w-full mb-2 p-2 border rounded"
            value={form.img_url3 || ""}
            onChange={handleChange}
            required
          />
        </div>
        {formError && (
          <div className="text-red-500 mb-2" role="alert">{formError}</div>
        )}
        <div className="flex gap-2 mt-4">
          <button type="submit" className="dashboard-btn" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="dashboard-btn"
            style={{ backgroundColor: "#e5e7eb", color: "#2563eb" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = (searchParams.get("section") || "injectables").toLowerCase();
  const [activeSection, setActiveSection] = useState(initialSection);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setDeleteId(null);
    },
  });

  function handleLogout() {
    const token = localStorage.getItem("token");
    // You may need to store user id somewhere, here assumed as "1"
    logout(1, token).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }

  const filteredProducts = Array.isArray(products)
    ? products
      .filter((p) => {
        // Section filter using sec_name
        const sec = String(p.sec_name || "").toLowerCase();
        return sec === String(activeSection).toLowerCase();
      })
      .filter((p) => {
        // Text search filter
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          String(p.pname || "").toLowerCase().includes(q) ||
          String(p.name || "").toLowerCase().includes(q) ||
          String(p.p_id || "").toLowerCase().includes(q)
        );
      })
    : [];

  const countFor = (sec) =>
    Array.isArray(products)
      ? products.filter(
        (p) => String(p.sec_name || "").toLowerCase() === String(sec)
      ).length
      : 0;
  

  function setSection(sec) {
    const norm = (sec || "injectables").toLowerCase();
    setActiveSection(norm);
    setSearchParams({ section: norm });
  }

  return (
    <div className="dash">
      <div className="dashboard-bg min-h-screen p-8">
        <div className="catego">

          <h1>
            <ShinyText
              text="Dashboard"
              speed={3}
              className='shiny-heading'
            />

          </h1>
        </div>
        <div className="container">

        <div className="toolbar mt-5 mb-5">
          <div className="toolbar-left">
            <input
              className="toolbar-search"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-right">
            <button className="dashboard-btn" onClick={() => setShowForm(true)}>
              + Add Product
            </button>
            <button className="dashboard-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="section-tabs">
          <button
            className={`tab ${activeSection === "injectables" ? "active" : ""}`}
            onClick={() => setSection("injectables")}
          >
            Injectables ({countFor("injectables")})
          </button>
          <button
            className={`tab ${activeSection === "tablets" ? "active" : ""}`}
            onClick={() => setSection("tablets")}
          >
            Tablets ({countFor("tablets")})
          </button>
        </div>
        {isLoading ? (
          <div>Loading products...</div>
        ) : error ? (
          <div className="text-red-500">Error loading products.</div>
        ) : Array.isArray(products) ? (
          <div>
            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500">No matching products.</div>
            ) : (
              <div className="product-swiper-wrap">
                <Swiper
                  className="product-swiper"
                  modules={[Navigation, Pagination, Keyboard]}
                  navigation
                  pagination={{ clickable: true }}
                  keyboard={{ enabled: true, onlyInViewport: true }}
                  watchOverflow={true}
                  centeredSlides={true}
                  centeredSlidesBounds={true}
                  spaceBetween={12}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 12, centeredSlides: false },
                    900: { slidesPerView: 3, spaceBetween: 12, centeredSlides: false },
                    1280: { slidesPerView: 4, spaceBetween: 12, centeredSlides: false },
                  }}
                >
                {filteredProducts.map((prod) => {
                  const img = prod.img_url || prod.img_url2 || prod.img_url3;
                  return (
                    <SwiperSlide key={prod.p_id}>
                      <div className="product-card">
                        <div className="product-card-image">
                          {img ? (
                            <img src={img} alt={prod.name || prod.pname || "product"} loading="lazy" />
                          ) : (
                            <div className="product-card-image placeholder">No Image</div>
                          )}
                        </div>
                        <div className="product-card-body">
                          <div className="product-card-title">{prod.name}</div>
                          {prod.pname && (
                            <div className="product-card-subtitle">{prod.pname}</div>
                          )}
                          <div className="product-card-price">Price: {prod.price}$</div>
                        </div>
                        <div className="product-card-actions">
                          {prod.qr_code ? (
                            <a
                              className="dashboard-btn"
                              href={`${prod.qr_code}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Go to product QR route"
                            >
                              Show More
                            </a>
                          ) : (
                            <span className="dashboard-btn" style={{ opacity: 0.6, pointerEvents: "none" }}>
                              Show More
                            </span>
                          )}
                          <button
                            className="dashboard-btn edit"
                            onClick={() => setEditProduct(prod)}
                          >
                            Edit
                          </button>
                          <button
                            className="dashboard-btn delete"
                            onClick={() => setDeleteId(prod.p_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                </Swiper>
              </div>
            )}
          </div>
        ) : (
          <div className="text-red-500">No products found or API error.</div>
        )}

        {showForm && (
          <ProductForm
            initial={{
              pname: "",
              name: "",
              product_overview: "",
              uses: "",
              potential_harms: "",
              method_of_use: "",
              price: "",
              qr_code: "",
              code: "",
              code2: "",
              code3: "",
              code4: "",
              warnings: "",
              vial: "",
              caliber: "",
              // Auto-fill sec_id based on active section: Injectables=3, Tablets=4
              sec_id: activeSection === "injectables" ? 3 : activeSection === "tablets" ? 4 : "",
              vid_url: "",
              img_url: "",
              img_url2: "",
              img_url3: "",
            }}
            onSave={(data) => {
              // Enforce sec_id mapping on submit as well
              const mappedSecId =
                activeSection === "injectables" ? 3 : activeSection === "tablets" ? 4 : data.sec_id;
              createMutation.mutate({ ...data, sec_id: mappedSecId });
            }}
            onClose={() => setShowForm(false)}
            isLoading={createMutation.isLoading}
          />
        )}

        {editProduct && (
          <ProductForm
          initial={editProduct}
            onSave={(data) =>
              updateMutation.mutate({ ...data, p_id: editProduct.p_id })
            }
            onClose={() => setEditProduct(null)}
            isLoading={updateMutation.isLoading}
          />
        )}

        {deleteId && (
          <div className="dashboard-modal-bg">
            <div className="dashboard-modal">
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex gap-2">
                <button
                  className="dashboard-btn delete"
                  onClick={() => deleteMutation.mutate(deleteId)}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
                <button
                  className="dashboard-btn"
                  style={{ backgroundColor: "#e5e7eb", color: "#2563eb" }}
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
