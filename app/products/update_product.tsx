"use client";
import { useState, SyntheticEvent } from "react";
import { RiEditCircleFill } from "react-icons/ri";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ProductType {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const UpdateProduct = ({
    brands,
    product,
}: {
    brands: Brand[];
    product: ProductType;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(String(product.price));
    const [brand, setBrand] = useState(product.brandId);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Menghapus semua karakter non-digit sebelum menambahkan format pemisah ribuan
        const value = e.target.value.replace(/\D/g, '');
        // Mengatur ulang state price dengan format pemisah ribuan
        setPrice(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Menghapus pemisah ribuan dari price sebelum submit
        const formattedPrice = price.replace(/,/g, '');
        
        await axios.patch(`api/products/${product.id}`, {
            title: title,
            price: Number(formattedPrice),
            brandId: Number(brand),
        });
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button type="button" className="btn btn-accent btn-sm inline-block mr-4" onClick={handleModal}>
                <RiEditCircleFill className="size-4 inline-block mr-2" />
                Edit
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered"
                                placeholder="Enter product name..."
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={handlePriceChange}
                                className="input input-bordered"
                                placeholder="Enter price..."
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(Number(e.target.value))}
                                className="select select-bordered"
                            >
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-accent">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
