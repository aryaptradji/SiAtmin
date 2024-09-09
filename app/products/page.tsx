import { getBrands, getProductPages, getProducts } from "@/lib/data";
import AddProduct from "./add_product";
import Image from "next/image";
import ProductTable from "../components/product_table";
import Pagination from "../components/pagination";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


const Product = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const [products, brands, totalPages] = await Promise.all([getProducts(), getBrands(), getProductPages()]);

    return (
        <div>
            <div className="mb-10 ml-8 mr-10 flex justify-between items-center">
                <AddProduct brands={brands} />
                <Image src="/img/SiAtmin_logo.png" alt="Logo_SiAtmin.png" width={100} height={100}></Image>
            </div>

            {/* Render Tabel Produk */}
            <Suspense>
                <ProductTable products={products} brands={brands} />
            </Suspense>

            {/* Render Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

export default Product;