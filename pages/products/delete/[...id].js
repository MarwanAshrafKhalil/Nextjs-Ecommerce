import { deleteProduct } from "@/Redux/features/products-slice/productsSlice";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteProduct() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  // const [productInfo, setProductInfo] = useState();

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   axios.get("/api/products?id=" + id).then((response) => {
  //     setProductInfo(response.data);
  //   });
  // }, [id]);

  const productItem = useSelector((state) => state.products.data).find(
    (data) => data._id == id
  );

  function deleteProd() {
    dispatch(deleteProduct({ id }));
    goBack();
  }

  function goBack() {
    router.push("/products");
  }

  return (
    <Layout>
      <h1 className="text-center">
        {" "}
        Do you want to delete&nbsp;{productItem?.title}?
      </h1>

      <div className="flex justify-center gap-2 ">
        <button className="btn-red" onClick={deleteProd}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
