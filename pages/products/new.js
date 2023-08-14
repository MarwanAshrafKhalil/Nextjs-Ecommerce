import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function NewProduct(props) {

    return(
        <Layout>
        <h1>New Product</h1>
        
        <ProductForm/>

        </Layout>
    )
}

export default NewProduct;