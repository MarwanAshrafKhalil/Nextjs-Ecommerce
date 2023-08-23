import Layout from "@/components/Layout";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory,setEditedCategory] =useState(null)

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    try {
      axios.get("api/categories").then((result) => {
        setCategories(result.data);
        console.log("REs: ", result);
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    fetchCategories();
  }
  function printDebugging(x) {
    console.log("length", x);
  }
  function editCategory(category){
    setEditedCategory(category)



  }
  function deleteCategory(){

  }
  return (
    <Layout>
      <h1>Categories </h1>
      <label>{editedCategory? `Edit Category ${editedCategory.name}` : "New Category Name"}</label>

      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category Name"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />

        <select
          className="mb-0"
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value="">Select Parent</option>
          {/* {printDebugging(parentCategory)} */}
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button className="btn-primary py-1" type="submit">
          Save
        </button>
      </form>
      <table className="basic">
        <thead>
          <tr>
            <td>Categories</td>
            <td>Parent Categorey</td>
            <td></td>

          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name} </td>
                 <td><button className="btn-primary mr-1" onClick={editCategory(category)}>Edit</button>
                 <button className="btn-primary" >Delete</button></td>

              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
