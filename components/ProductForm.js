import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images };

    try {
      if (_id) {
        //update
        await axios.put("/api/products", { ...data, _id });
        // console.log("res.update ", res);
      } else {
        //create
        await axios.post("/api/products", data);
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
      console.log("res.data: ", res.data.links);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
    setIsUpdating(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
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

      <label>Photos</label>
      <div className=" items-center gap-1 flex flex-wrap mb-2">
        <ReactSortable
          className="flex flex-wrap"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="  h-24 mx-2 ">
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
          className="  w-24 h-24 flex cursor-pointer
        justify-center gap-1 text-gray-500
        mx-2 my-2 items-center text-sm rounded-lg bg-gray-200 "
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
          Upload
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
