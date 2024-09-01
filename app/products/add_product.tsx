"use client";
import { useState, SyntheticEvent } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import SuccessNotif from "../components/success_notif";
import { FaCheckCircle } from "react-icons/fa";

let isAdded: boolean = false;

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
        setTitle("");
        setPrice("");
        setBrand("");
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Menghapus semua karakter non-digit sebelum menambahkan format pemisah ribuan
        const value = e.target.value.replace(/\D/g, '');
        // Mengatur ulang state price dengan format pemisah ribuan
        setPrice(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Menghapus pemisah ribuan dari price sebelum submit
        const formattedPrice = price.replace(/,/g, '');

        try {
            // Melakukan permintaan POST ke API
            const response = await axios.post('/api/products', {
                title: title,
                price: Number(formattedPrice),
                brandId: Number(brand)
            });

            // Jika berhasil, lakukan sesuatu, misalnya menampilkan pesan sukses
            if (response.status === 201 || response.status === 200) {
                isAdded = true;

                // Reset form input
                setTitle("");
                setPrice("");
                setBrand("");

                // Refresh halaman atau data setelah berhasil
                router.refresh();
                setIsOpen(false);
            }
        } catch (error) {
            // Jika gagal, tampilkan pesan kesalahan
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data);
                alert("Gagal menambahkan produk. Silakan coba lagi.");
            } else {
                console.error("Unexpected error:", error);
                alert("Terjadi kesalahan tak terduga.");
            }
        }
    }

    return (
        <div>
            {isAdded ? <SuccessNotif icon={<FaCheckCircle className="size-8 text-success" />} title="Success" subtitle="You added 1 new product successfully!" state={true} /> : null}
            <button type="button" className="btn btn-neutral" onClick={handleModal}>
                <RiAddLargeLine className='inline-block me-2' />
                Add New
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered" placeholder="Enter product name..." />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-orange bg-neutral border border-neutral border-e-0 rounded-s-md">
                                    Rp
                                </span>
                                <input type="text" value={price} onChange={handlePriceChange} className="input input-bordered w-full rounded-s-none" placeholder="Enter price..." />
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select select-bordered">
                                <option value="" disabled>Select a Brand</option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-neutral">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
export { isAdded };