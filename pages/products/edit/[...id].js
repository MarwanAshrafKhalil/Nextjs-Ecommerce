import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  // const [productInfo, setProductInfo] = useState(null)

  // useEffect(()=>{

  //     if(!id){
  //         return;
  //     }
  //     if(id){
  //     axios.get('/api/products?id='+id).then(response =>
  //         {
  //         setProductInfo(response.data)
  //         console.log(response.data)

  //         }
  //     )}}
  // ,[id])

  const productItem = useSelector((state) => state.products.data).find(
    (data) => data._id == id
  );
  console.log("prodItem: ", productItem);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productItem && <ProductForm {...productItem} />}

      {/* {productInfo &&  ( 
            <ProductForm {...productInfo}/>
            ) } */}
    </Layout>
  );
}
