import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");

  async function saveCategory(ev) {
    ev.preventDefault();
    try {
      await axios.post("/api/categories", { name });

      await axios.post("/api/products", data);
    } catch (error) {
      console.log(error);
    }
    setName("");
  }
  return (
    <Layout>
      <h1>Categories </h1>
      <label>New Category Name</label>

      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category Name"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <button className="btn-primary py-1" type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
}
