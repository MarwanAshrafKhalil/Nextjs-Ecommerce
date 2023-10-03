import axios from "axios";

export function getCategoriesData() {
  return axios.get("/api/categories");
}

export function createACategory({ data }) {
  console.log("data-cat: ", { ...data });
  return axios.post("/api/categories", { ...data });
}

export function updateCategory({ data }) {
  return axios.put("/api/categories", { ...data });
}

export function deleteCategory(_id) {
  console.log(_id);
  return axios.delete("/api/categories?id=" + _id);
}
