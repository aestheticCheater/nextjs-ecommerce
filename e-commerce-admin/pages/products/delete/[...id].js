import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        })
    }, [id]);

    function goBack() {
        router.push('/products');
    }

   async function deleteProduct() {
        await axios.delete('/api/products?id=' + id);
       goBack();
    }

    return (
        <Layout>
            <h1 className="flex gap-1 items-center justify-center mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>

              Наистина ли искате да изтриете  &nbsp;<u>{productInfo?.title}</u>?
            </h1>
            <div className="flex justify-center justify-evenly">
            <button onClick={deleteProduct}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="green" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
                  <b> ДА </b>
            </button>
            <button onClick={goBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="red" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  <b> НЕ </b>
            </button>
            </div>
        </Layout>
    )
}