"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";

type ProductType = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const DeleteProduct = ({ product }: { product: ProductType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = async (productId: number) => {
        await axios.delete(`/api/products/${productId}`);
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button type="button" className="btn btn-error btn-sm" onClick={handleModal}>
                <RiDeleteBin6Fill className="size-4 inline-block" />
                Delete
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete {product.title}?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>No</button>
                        <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-error">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProduct;