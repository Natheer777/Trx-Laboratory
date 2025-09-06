const BASE_URL = "https://trx-laboratory.com/";

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

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}get_all_products.php`);
  const result = await res.json();
  // إذا كان هناك مفتاح data وهو مصفوفة، أرجعه مباشرة
  if (result && Array.isArray(result.data)) {
    return result.data;
  }
  // fallback: إذا كان data كائن واحد فقط
  if (result && typeof result.data === "object" && result.data !== null) {
    return [result.data];
  }
  return [];
}

export async function getProductByName(name) {
  const res = await fetch(`${BASE_URL}get_product_by_name.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function createProduct({
  pname,
  name,
  product_overview,
  uses,
  potential_harms,
  method_of_use,
  price,
  qr_code,
  code,
  code2,
  code3,
  code4,
  warnings,
  vial,
  caliber,
  sec_id,
  vid_url,
  img_url,
  img_url2,
  img_url3,
}) {
  const res = await fetch("https://trx-laboratory.com/CreateProduct.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pname,
      name,
      product_overview,
      uses,
      potential_harms,
      method_of_use,
      price,
      qr_code,
      code,
      code2,
      code3,
      code4,
      warnings,
      vial,
      caliber,
      sec_id,
      vid_url,
      img_url,
      img_url2,
      img_url3,
    }),
  });
  return await res.json();
}

export async function updateProduct({
  p_id,
  pname,
  name,
  product_overview,
  uses,
  potential_harms,
  method_of_use,
  price,
  qr_code,
  code,
  code2,
  code3,
  code4,
  warnings,
  vial,
  caliber,
  sec_id,
  vid_url,
  img_url,
  img_url2,
  img_url3,
}) {
  const res = await fetch("https://trx-laboratory.com/UpdateProduct.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      p_id,
      pname,
      name,
      product_overview,
      uses,
      potential_harms,
      method_of_use,
      price,
      qr_code,
      code,
      code2,
      code3,
      code4,
      warnings,
      vial,
      caliber,
      sec_id,
      vid_url,
      img_url,
      img_url2,
      img_url3,
    }),
  });
  return await res.json();
}

export async function deleteProduct(p_id) {
  const res = await fetch(`${BASE_URL}DeleteProduct.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ p_id }),
  });
  return res.json();
}
