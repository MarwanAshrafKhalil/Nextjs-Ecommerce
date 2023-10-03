import axios from "axios";

export function getProductsData() {
  return axios.get("/api/products");
}

export function createAProduct({ data }) {
  return axios.post("/api/products", { ...data });
}

export function updateAProduct(data, _id) {
  return axios.put("/api/products", { ...data, _id });
}

export function deleteAProduct(id) {
  return axios.delete("/api/products?id=" + id);
}
