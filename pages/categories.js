import {
  createCategory,
  deleteACategory,
  getCategories,
  updateCategory,
} from "@/Redux/features/categories/categoriesSlice";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    dispatch(getCategories());
  }

  const categoriesFetch = useSelector((state) => state.categories.data);

  // useEffect(() => {
  //   setCategories(categoriesFetch);
  // }, [categoriesFetch]);

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      console.log("data-cat: ", data);
      await dispatch(updateCategory({ data }));
      // await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await dispatch(createCategory({ data }));
      // await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  // function printDebugging(x) {
  //   console.log("length", x);
  // }

  function editCategory(category) {
    setEditedCategory(category);
    console.log("cat-print: ", category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        console.log(result);
        if (result.isConfirmed) {
          const _id = category._id;
          await dispatch(deleteACategory({ _id }));
          // await axios.delete("/api/categories?=id" + _id);
          fetchCategories();
        }
      })
      .catch((error) => {
        console.log("Delete Cat:", error);
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
    console.log("values: ", property);
  }

  function removeProperty(index) {
    setProperties((prev) => {
      return [...prev].filter((p, pindex) => {
        return pindex != index;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories </h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory?.name}`
          : "New Category Name"}
      </label>

      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
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
            {categoriesFetch.length > 0 &&
              categoriesFetch.map((category, index) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {/* adding properties  */}
        <div className="mt-2 mb-2">
          <label className="block">Properities</label>
          <button
            onClick={() => {
              addProperty();
            }}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex mb-2 gap-1">
                <input
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  type="text"
                  className="mb-0"
                  placeholder="property name, example color"
                />
                <input
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  type="text"
                  className="mb-0"
                  placeholder="values, comma separeted"
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btn-default"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setName("");
                setParentCategory("");
                setEditedCategory(null);
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button className="btn-primary py-1" type="submit">
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
        <table className="basic">
          <thead>
            <tr>
              <td>Categories</td>
              <td>Parent Categorey</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categoriesFetch.length > 0 &&
              categoriesFetch.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name} </td>
                  <td>
                    <button
                      className="btn-default mr-1"
                      onClick={() => editCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-red"
                      onClick={() => deleteCategory(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
