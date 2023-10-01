import {
  createProduct,
  updateProduct,
} from "@/Redux/features/products-slice/productsSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";
import { getCategories } from "@/Redux/features/categories/categoriesSlice";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: existingProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [productProperties, setProductProperties] = useState(
    existingProperties || {}
  );
  const [images, setImages] = useState(existingImages || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(existingCategory || "");
  const router = useRouter();
  const dispatch = useDispatch();

  const categoriesFetch = useSelector((state) => state.categories.data);

  useEffect(() => {
    setCategories(categoriesFetch);
  }, [categoriesFetch]);

  // useEffect(() => {
  //   try {

  //     axios.get("/api/categories").then((result) => {
  //       setCategories(result.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

    try {
      if (_id) {
        //update Product
        await dispatch(updateProduct({ data, _id }));

        // await axios.put("/api/products", { ...data, _id });
        // console.log("res.update ", res);
      } else {
        //create Product
        await dispatch(createProduct({ data }));
        // await axios.post("/api/products", data);
        // console.log("res.post: ", res);
      }
      setGoToProducts(true);
    } catch (error) {
      console.log(`error#: ${error}`);
    }
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUpdating(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      // console.log("res.data: ", res.data.links);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
    setIsUpdating(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function prodProperties(propName, value) {
    setProductProperties((prev) => {
      const prodProp = { ...prev };
      prodProp[propName] = value;
      return prodProp;
    });
  }

  // function printInstant(x) {
  //   console.log("print: ", x);
  //   console.log("print1: ", { ...prodProperties });
  // }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    if (catInfo?.properties) {
      propertiesToFill.push(...catInfo.properties);
    }
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo.parent._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
      console.log("catInfo: ", catInfo);
      console.log("properties: ", propertiesToFill);
    }
    // console.log("catInfo: ", catInfo);
    // console.log("category: ", category);
  }

  return (
    <form onSubmit={saveProduct}>
      <label> Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Select a category</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {/* properites */}
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className=" gap-2" key={p.index}>
            <label className="">{p.name}</label>
            <select
              value={productProperties[p.name]}
              onChange={(ev) => prodProperties(p.name, ev.target.value)}
            >
              <option value="">Select Value</option>
              {p.values.map((p) => (
                <option key={p.index} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {/* {printInstant(p)}{" "} */}
          </div>
        ))}

      {/* Photos Section  */}
      <label>Photos</label>
      <div className=" items-center gap-1 flex flex-wrap mb-2">
        <ReactSortable
          className="flex flex-wrap"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="  h-24 mx-2 border border-200 rounded-lg shadow-sm bg-white "
              >
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUpdating && (
          <div className="h-24 items-center flex  rounded-lg">
            <Spinner />
          </div>
        )}
        <label
          className="  w-24 h-24 flex flex-col  cursor-pointer
        justify-center gap-1 text-gray-500
        mx-2 my-2 items-center text-sm 
        rounded-lg shadow-sm bg-white border border-gray-200 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Add Image
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>

        {!images?.length && <div> No images for this product </div>}
      </div>

      <label> Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>

      <label> Price (in USD)</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
