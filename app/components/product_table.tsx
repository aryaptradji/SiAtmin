"use client";

import ViewProduct from "../products/view_product";
import UpdateProduct from "../products/update_product";
import DeleteProduct from "../products/delete_product";
import { useParams, useSearchParams } from "next/navigation";
import { Brand, Product } from "@prisma/client";
import { getBrands, getProducts } from "@/lib/data";
import { ProductWithBrand } from "@/lib/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductTable = ({ products, brands }: {products: ProductWithBrand[]; brands: Brand[]}) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ?? "1";
    const perPage = searchParams.get("perPage") ?? "6";

    const start = (Number(page) - 1) * Number(perPage);
    const end = start + Number(perPage);

    const entries = products.slice(start, end);

    return (
        <table className="table table-lg custom-shadow bg-[#212121]">
            <thead className="text-center">
                <tr>
                    <th>NO</th>
                    <th>PRODUCT NAME</th>
                    <th>PRICE</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, index) => (
                    <tr key={entry.id} className="hover text-center">
                        <td>{index + 1 + start}</td>
                        <td>{entry.title}</td>
                        <td>Rp {entry.price.toLocaleString('en-US')}</td>
                        <td>{entry.brand?.name}</td>
                        <td className="flex justify-center">
                            <ViewProduct product={entry} />
                            <UpdateProduct brands={brands} product={entry} />
                            <DeleteProduct product={entry} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;