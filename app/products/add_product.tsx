"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import NotifAlert from "../components/notif_alert";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    let response: AxiosResponse;

    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [errorEmptyTitle, setErrorEmptyTitle] = useState("");
    const [isPriceEmpty, setIsPriceEmpty] = useState(false);
    const [errorEmptyPrice, setErrorEmptyPrice] = useState("");
    const [isBrandEmpty, setIsBrandEmpty] = useState(false);
    const [errorEmptyBrand, setErrorEmptyBrand] = useState("");
    const [addedTitle, setAddedTitle] = useState("");
    const [errorTitleField, setErrorTitleField] = useState("");
    const [isErrorTitleField, setIsErrorTitleField] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsError(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isError])

    function handleIsError() {
        setIsError(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
        setTitle("");
        setPrice("");
        setBrand("");
        setErrorTitleField("");
        setIsErrorTitleField(false);
        setErrorEmptyTitle("");
        setErrorEmptyPrice("");
        setErrorEmptyBrand("");
        setIsTitleEmpty(false);
        setIsPriceEmpty(false);
        setIsBrandEmpty(false);
    };

    const handlePrice = (value: string) => {
        // Menghapus semua karakter non-digit sebelum menambahkan format pemisah ribuan
        const res = value.replace(/\D/g, '');
        // Mengatur ulang state price dengan format pemisah ribuan
        setPrice(res.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    };

    function validateTitle(value: string) {
        const regex = /^([A-Za-z]+ ?){1,3}$/; // validasi max 10 kata
        setTitle(value);

        if (!regex.test(title) && title.length > 1) {
            setErrorTitleField("This field has maximum of 10 words");
            setIsErrorTitleField(true);
        } else {
            setErrorTitleField("");
            setIsErrorTitleField(false);
        }
    }

    const handleEmptyTitle = (value: string) => {
        if (value.length === 0) {
            setErrorEmptyTitle("This field is required");
            setIsTitleEmpty(true);
        } else {
            setErrorEmptyTitle("");
            setIsTitleEmpty(false);
        }
    }

    const handleEmptyPrice = (value: string) => {
        if (value.length === 0) {
            setErrorEmptyPrice("This field is required");
            setIsPriceEmpty(true);
        } else {
            setErrorEmptyPrice("");
            setIsPriceEmpty(false);
        }
    }

    const handleEmptyBrand = (value: string) => {
        if (value == "0") {
            setErrorEmptyBrand("This field is required");
            setIsBrandEmpty(true);
        } else {
            setErrorEmptyBrand("");
            setIsBrandEmpty(false);
        }
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Menghapus pemisah ribuan dari price sebelum submit
        const formattedPrice = price.replace(/,/g, '');

        // Memastikan tidak ada empty value
        handleEmptyTitle(title);
        handleEmptyPrice(price);
        handleEmptyBrand(brand);

        if (!isTitleEmpty && !isPriceEmpty && !isBrandEmpty) {
            try {
                // Melakukan permintaan POST ke API
                response = await axios.post('/api/products', {
                    title: title,
                    price: Number(formattedPrice),
                    brandId: Number(brand)
                });

                // Jika berhasil, lakukan sesuatu, misalnya menampilkan pesan sukses
                if (response.status === 201 || response.status === 200) {
                    setIsAdded(true);
                    setAddedTitle(title);

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
                    if (error.response?.status === 409) {
                        const errorMessage = error.response?.data.error;
                        setError(errorMessage);
                        setIsError(true);
                        console.error("Error:", errorMessage);

                        // Reset form input
                        setTitle("");
                        setPrice("");
                        setBrand("");
                        setIsOpen(false);
                    }
                } else {
                    setError("An unexpected error occurred.")
                    setIsError(true);
                    console.error("Unexpected error:", error);

                    // Reset form input
                    setTitle("");
                    setPrice("");
                    setBrand("");
                }
            }
        }
    }

    return (
        <div>
            {isAdded ? (
                <NotifAlert
                    icon={<FaCheckCircle className="size-8 text-success" />}
                    title="Success"
                    subtitle={`You added ${addedTitle}!`}
                    state={true}
                />
            ) : isError ? (
                <NotifAlert
                    icon={<FaTimesCircle className="size-8 text-error" />}
                    title="Failed"
                    subtitle={error}
                    state={true}
                    whenClose={handleIsError}
                />
            ) : null}

            <button type="button" className="btn btn-neutral" onClick={handleModal}>
                <RiAddLargeLine className='inline-block me-2' />
                Add New
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box bg-[#212121]">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mb-1">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" value={title} onChange={(e) => {
                                validateTitle(e.target.value);
                                if (title.length > 1) {
                                    handleEmptyTitle(title);
                                }
                            }} className={isErrorTitleField || isTitleEmpty ? "input input-bordered input-error text-error capitalize" : "input input-bordered capitalize"} placeholder="Enter product name..." />
                            <p className="mt-2 text-sm text-error">{isErrorTitleField ? errorTitleField : isTitleEmpty ? errorEmptyTitle : null}</p>
                        </div>
                        <div className="form-control w-full mb-1">
                            <label className="label font-bold">Price</label>
                            <div className="flex">
                                <span className="flex items-center px-3 text-sm text-orange bg-neutral border border-neutral border-e-0 rounded-s-md">
                                    Rp
                                </span>
                                <input type="text" value={price} onChange={(e) => {
                                    handlePrice(e.target.value);
                                    if (price.length > 1) {
                                        handleEmptyPrice(price);
                                    }
                                }} className={isPriceEmpty ? "input input-bordered input-error text-error w-full rounded-s-none inline-block" : "input input-bordered w-full rounded-s-none inline-block"} placeholder="Enter price..." />
                            </div>
                            <p className="mt-2 text-sm text-error">{isPriceEmpty ? errorEmptyPrice : null}</p>
                        </div>
                        <div className="form-control w-full mb-1">
                            <label className="label font-bold">Brand</label>
                            <select value={brand} onChange={(e) => {
                                setBrand(e.target.value);
                                handleEmptyBrand(brand);
                                console.log(typeof e.target.value);
                                console.log(e.target.value);
                            }} className={isBrandEmpty ? "select select-bordered select-error text-error" : "select select-bordered"}>
                                <option value="" disabled>Select a Brand</option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <p className="mt-2 text-sm text-error">{isBrandEmpty ? errorEmptyBrand : null}</p>
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