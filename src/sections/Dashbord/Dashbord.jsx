import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  logout,
} from "../../api";
import { useNavigate } from "react-router-dom";
import "./Dashbord.css";

function ProductForm({ initial, onSave, onClose, isLoading }) {
  const [form, setForm] = useState(initial);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="dashboard-modal-bg">
      <form
        className="dashboard-modal"
        onSubmit={(e) => {
          e.preventDefault();
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
            placeholder="اسم المنتج AR"
            className="w-full mb-2 p-2 border rounded"
            value={form.name || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="product_overview"
            placeholder="وصف عام للمنتج..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.product_overview || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="uses"
            placeholder="استخدامات المنتج..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.uses || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="potential_harms"
            placeholder="الأضرار المحتملة..."
            className="w-full mb-2 p-2 border rounded span-2"
            value={form.potential_harms || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="method_of_use"
            placeholder="طريقة الاستخدام..."
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
            required
          />
          <input
            name="code2"
            placeholder="Code 2"
            className="w-full mb-2 p-2 border rounded"
            value={form.code2 || ""}
            onChange={handleChange}
            required
          />
          <input
            name="code3"
            placeholder="Code 3"
            className="w-full mb-2 p-2 border rounded"
            value={form.code3 || ""}
            onChange={handleChange}
            required
          />
          <input
            name="code4"
            placeholder="Code 4"
            className="w-full mb-2 p-2 border rounded"
            value={form.code4 || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="warnings"
            placeholder="تحذيرات مهمة..."
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
            name="sec_id"
            type="number"
            placeholder="Section ID"
            className="w-full mb-2 p-2 border rounded"
            value={form.sec_id || ""}
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
            placeholder="Main Image URL"
            className="w-full mb-2 p-2 border rounded"
            value={form.img_url || ""}
            onChange={handleChange}
            required
          />
          <input
            name="img_url2"
            placeholder="Second Image URL (اختياري)"
            className="w-full mb-2 p-2 border rounded"
            value={form.img_url2 || ""}
            onChange={handleChange}
          />
          <input
            name="img_url3"
            placeholder="Third Image URL (اختياري)"
            className="w-full mb-2 p-2 border rounded"
            value={form.img_url3 || ""}
            onChange={handleChange}
          />
        </div>
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
    ? products.filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          String(p.pname || "").toLowerCase().includes(q) ||
          String(p.name || "").toLowerCase().includes(q) ||
          String(p.p_id || "").toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="dashboard-bg min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="dashboard-title text-3xl">Dashboard</h1>
        <button className="dashboard-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <input
          className="w-full p-2 border rounded max-w-sm"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="dashboard-btn" onClick={() => setShowForm(true)}>
          + Add Product
        </button>
      </div>
      {isLoading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div className="text-red-500">Error loading products.</div>
      ) : Array.isArray(products) ? (
        <div className="overflow-x-auto">
          <table className="dashboard-table min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name EN</th>
                <th className="p-2 border">Name AR</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td className="p-2 border text-center" colSpan="5">
                    No matching products.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.p_id}>
                    <td className="p-2 border">{prod.p_id}</td>
                    <td className="p-2 border">{prod.pname}</td>
                    <td className="p-2 border">{prod.name}</td>
                    <td className="p-2 border">{prod.price}</td>
                    <td className="p-2 border flex gap-2 actions">
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-red-500">No products found or API error.</div>
      )}

      {showForm && (
        <ProductForm
          initial={{
            pname: "",
            name: "",
            price: "",
            // ...other fields
          }}
          onSave={(data) => createMutation.mutate(data)}
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
  );
}
