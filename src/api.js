// src/api/api.js  (or src/api.js)

const BASE_URL = "https://trx-laboratory.com/";

/* ================================================================
   AUTH
   ================================================================ */
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}UserLogin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function logout(id, token) {
  const res = await fetch(`${BASE_URL}UserLogout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, token }),
  });
  return res.json();
}

/* ================================================================
   PRODUCTS – ADMIN DASHBOARD (ALL PRODUCTS)
   ================================================================ */
export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}get_all_products.php`);
  const result = await res.json();

  if (result && Array.isArray(result.data)) {
    return result.data;
  }
  if (result && typeof result.data === "object" && result.data !== null) {
    return [result.data];
  }
  return [];
}

/* ================================================================
   PRODUCTS – PUBLIC PAGES (PEPTIDES SECTION)
   ================================================================ */
export async function getVialsProducts() {
  const res = await fetch(`${BASE_URL}get_vials_products.php`);
  const result = await res.json();
  return Array.isArray(result.data) ? result.data : [];
}

export async function getPensProducts() {
  const res = await fetch(`${BASE_URL}get_pens_products.php`);
  const result = await res.json();
  return Array.isArray(result.data) ? result.data : [];
}

/* ================================================================
   PRODUCT CRUD (ADMIN)
   ================================================================ */
export async function createProduct(productData) {
  const res = await fetch(`${BASE_URL}CreateProduct.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...productData,
      price: productData.price ? Number(productData.price) : null,
      sec_id: productData.sec_id ? Number(productData.sec_id) : null,
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  if (data?.status === "success") return data;
  throw new Error(data?.message || "Failed to create product");
}

export async function updateProduct(productData) {
  const res = await fetch(`${BASE_URL}UpdateProduct.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...productData,
      p_id: Number(productData.p_id),
      price: productData.price ? Number(productData.price) : null,
      sec_id: productData.sec_id ? Number(productData.sec_id) : null,
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  if (data?.status === "success") return data;
  throw new Error(data?.message || "Failed to update product");
}

export async function deleteProduct(p_id) {
  const res = await fetch(`${BASE_URL}DeleteProduct.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ p_id: Number(p_id) }),
  });
  return res.json();
}

/* ================================================================
   ADMIN CONTACT INFO UPDATE
   ================================================================ */
export async function updateUserInfo({ phone, email }) {
  try {
    const res = await fetch(`${BASE_URL}update_info.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "1", phone, email }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("updateUserInfo failed:", error);
    throw error;
  }
}

/* ================================================================
   OPTIONAL: Get single product by name (not used now but useful)
   ================================================================ */
export async function getProductByName(name) {
  const res = await fetch(`${BASE_URL}get_product_by_name.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}