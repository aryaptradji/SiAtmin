"use client";
import { useState } from "react";
import type { Brand } from "@prisma/client";
import { FaEye } from "react-icons/fa6";

type ProductType = {
    id: number;
    title: string;
    price: number;
    brandId: number;
    brand: Brand;
}

const ViewProduct = ({ product }: { product: ProductType }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button type="button" className="btn glass btn-sm mr-4" onClick={handleModal}>
                <FaEye className="size-4 inline-block" />
                Preview
            </button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">View Product</h3>
                    <div className="flex-col space-y-4 mt-4 h-24">
                        <p>Name : {product.title}</p>
                        <p>Price : {product.price}</p>
                        <p>Brand : {product.brand.name}</p>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;