"use client";
import { useState } from "react";
import type { Brand } from "@prisma/client";
import { FaEye } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import { MdShoppingBag } from "react-icons/md";

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
                <div className="modal-box bg-[#212121]">
                    <h3 className="font-bold text-lg">View Product</h3>
                    <hr className="mt-4 border-none h-0.5 bg-[#3d3d3d] mx-8" />
                    <div className="flex-col space-y-4 mt-4 h-24">
                        <div className="flex items-center mx-8 px-4 py-3 rounded-lg custom-shadow hover:ring-1 hover:ring-[#DCA54C]">
                            <BiSolidTagAlt size={28} />
                            <div className="text-start ms-4">
                                <span className="text-sm text-slate-400">Name</span>
                                <p className="text-white">{product.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center mx-8 px-4 py-3 rounded-lg custom-shadow hover:ring-1 hover:ring-[#DCA54C]">
                            <IoPricetags size={28} />
                            <div className="text-start ms-4">
                                <span className="text-sm text-slate-400">Price</span>
                                <p className="text-white">Rp {product.price.toLocaleString('en-US')}</p>
                            </div>
                        </div>
                        <div className="flex items-center mx-8 px-4 py-3 rounded-lg custom-shadow hover:ring-1 hover:ring-[#DCA54C]">
                            <MdShoppingBag size={28} />
                            <div className="text-start ms-4">
                                <span className="text-sm text-slate-400">Brand</span>
                                <p className="text-white">{product.brand.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action mt-44">
                        <button type="button" className="btn" onClick={handleModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;