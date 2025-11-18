// src/api/api.js

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
   PRODUCT CRUD (ADMIN) - UPDATED WITH ALL NEW FIELDS
   ================================================================ */

/**
 * Sanitize and normalize product data before sending to API
 * @param {Object} productData - Raw product data from form
 * @returns {Object} Sanitized product data
 */
function sanitizeProductData(productData) {
  return {
    // Basic Information
    pname: String(productData.pname || "").trim(),
    name: String(productData.name || "").trim(),
    
    // Dosage & Strength
    dosage: String(productData.dosage || "").trim(),
    strength: String(productData.strength || "").trim(),
    
    // Kit & Vial Information
    kit: String(productData.kit || "").trim(),
    total_vial: String(productData.total_vial || "").trim(),
    vial: String(productData.vial || "").trim(),
    sterile_water: String(productData.sterile_water || "").trim(),
    caliber: String(productData.caliber || "").trim(),
    
    // Pricing
    price: productData.price ? Number(productData.price) : null,
    
    // Codes
    code: String(productData.code || "").trim().substring(0, 5),
    code2: String(productData.code2 || "").trim().substring(0, 5),
    code3: String(productData.code3 || "").trim().substring(0, 5),
    code4: String(productData.code4 || "").trim().substring(0, 5),
    
    // QR Code
    qr_code: String(productData.qr_code || "").trim(),
    
    // Product Descriptions
    product_overview: String(productData.product_overview || "").trim(),
    uses: String(productData.uses || "").trim(),
    method_of_use: String(productData.method_of_use || "").trim(),
    
    // Side Effects & Benefits (NEW)
    side_effects: String(productData.side_effects || "").trim(),
    muscle_gain: String(productData.muscle_gain || "").trim(),
    keep_gains: String(productData.keep_gains || "").trim(),
    fat_water: String(productData.fat_water || "").trim(),
    
    // Other Information
    potential_harms: String(productData.potential_harms || "").trim(),
    warnings: String(productData.warnings || "").trim(),
    
    // Section ID
    sec_id: productData.sec_id ? Number(productData.sec_id) : null,
  };
}

/**
 * Create FormData object for file uploads
 * @param {Object} productData - Product data including files
 * @returns {FormData} FormData object with all data and files
 */
function createFormDataWithFiles(productData) {
  const formData = new FormData();
  
  // Add all text fields
  const sanitized = sanitizeProductData(productData);
  Object.keys(sanitized).forEach((key) => {
    if (sanitized[key] !== null && sanitized[key] !== undefined) {
      formData.append(key, sanitized[key]);
    }
  });
  
  // Add file fields
  const fileFields = ["vid_url", "img_url", "img_url2", "img_url3"];
  fileFields.forEach((field) => {
    if (productData[field] instanceof File) {
      formData.append(field, productData[field]);
    } else if (typeof productData[field] === "string" && productData[field]) {
      // If it's a URL string, keep it as is
      formData.append(field, productData[field]);
    }
  });
  
  return formData;
}

/**
 * Create a new product
 * @param {Object} productData - Product data from form
 * @returns {Promise} API response
 */
export async function createProduct(productData) {
  try {
    const hasFiles = [
      productData.vid_url,
      productData.img_url,
      productData.img_url2,
      productData.img_url3,
    ].some((file) => file instanceof File);

    let res;
    
    if (hasFiles) {
      // Use FormData for file uploads
      const formData = createFormDataWithFiles(productData);
      res = await fetch(`${BASE_URL}CreateProduct.php`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header when using FormData
      });
    } else {
      // Use JSON for text-only data
      const sanitized = sanitizeProductData(productData);
      res = await fetch(`${BASE_URL}CreateProduct.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitized),
      });
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data?.status === "success") {
      return data;
    }
    
    throw new Error(data?.message || "Failed to create product");
  } catch (error) {
    console.error("createProduct error:", error);
    throw error;
  }
}

/**
 * Update an existing product
 * @param {Object} productData - Product data from form (including p_id)
 * @returns {Promise} API response
 */
export async function updateProduct(productData) {
  try {
    const hasFiles = [
      productData.vid_url,
      productData.img_url,
      productData.img_url2,
      productData.img_url3,
    ].some((file) => file instanceof File);

    let res;
    
    if (hasFiles) {
      // Use FormData for file uploads
      const formData = createFormDataWithFiles(productData);
      formData.append("p_id", Number(productData.p_id));
      
      res = await fetch(`${BASE_URL}UpdateProduct.php`, {
        method: "POST",
        body: formData,
      });
    } else {
      // Use JSON for text-only data
      const sanitized = sanitizeProductData(productData);
      res = await fetch(`${BASE_URL}UpdateProduct.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sanitized,
          p_id: Number(productData.p_id),
        }),
      });
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data?.status === "success") {
      return data;
    }
    
    throw new Error(data?.message || "Failed to update product");
  } catch (error) {
    console.error("updateProduct error:", error);
    throw error;
  }
}

/**
 * Delete a product
 * @param {number} p_id - Product ID
 * @returns {Promise} API response
 */
export async function deleteProduct(p_id) {
  try {
    const res = await fetch(`${BASE_URL}DeleteProduct.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p_id: Number(p_id) }),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("deleteProduct error:", error);
    throw error;
  }
}

/* ================================================================
   ADMIN CONTACT INFO UPDATE
   ================================================================ */
export async function updateUserInfo({ id, phone, email }) {
  try {
    const res = await fetch(`${BASE_URL}update_info.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(id || "1"),
        phone: String(phone || "").trim(),
        email: String(email || "").trim(),
      }),
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
   UTILITY: Get single product by name
   ================================================================ */
export async function getProductByName(name) {
  try {
    const res = await fetch(`${BASE_URL}get_product_by_name.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: String(name || "").trim() }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("getProductByName failed:", error);
    throw error;
  }
}

/* ================================================================
   UTILITY: Validate product data before sending to API
   ================================================================ */
export function validateProductData(productData) {
  const errors = [];

  // Required fields validation
  const requiredFields = [
    "pname",
    "name",
    "product_overview",
    "uses",
    "method_of_use",
    "price",
    "qr_code",
    "code",
    "code2",
    "code3",
    "code4",
    "warnings",
    "vial",
    "caliber",
    "dosage",
    "potential_harms",
  ];

  requiredFields.forEach((field) => {
    const value = String(productData[field] || "").trim();
    if (!value) {
      errors.push(`${field} is required`);
    }
  });

  // Code validation - must be exactly 5 characters
  const codeFields = ["code", "code2", "code3", "code4"];
  codeFields.forEach((field) => {
    const code = String(productData[field] || "").trim();
    if (code && !/^[A-Za-z0-9]{5}$/.test(code)) {
      errors.push(`${field} must be exactly 5 alphanumeric characters`);
    }
  });

  // Price validation
  if (productData.price) {
    const price = Number(productData.price);
    if (isNaN(price) || price < 0) {
      errors.push("Price must be a valid positive number");
    }
  }

  // Email validation (if provided)
  if (productData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(productData.email)) {
      errors.push("Invalid email format");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}