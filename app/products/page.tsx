import { PrismaClient } from "@prisma/client";
import AddProduct from "./add_product";
import DeleteProduct from "./delete_product";
import UpdateProduct from "./update_product";
import ViewProduct from "./view_product";
import Image from "next/image";

const prisma = new PrismaClient();

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true
        }
    });
    return res;
}

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
}

const Product = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()]);

    return (
        <div>
            <div className="mb-10 ml-8 mr-28 flex justify-between items-center">
                <AddProduct brands={brands} />
                <Image src="/img/SiAtmin_logo.png" alt="Logo_SiAtmin.png" width={100} height={100}></Image>
            </div>
            <table className="table table-lg">
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
                    {products.map((product, index) => (
                        <>
                            <tr key={product.id} className="hover text-center">
                                <td>{index + 1}</td>
                                <td>{product.title}</td>
                                <td>Rp {product.price.toLocaleString('en-US')}</td>
                                <td>{product.brand.name}</td>
                                <td className="flex justify-center">
                                    <ViewProduct product={product} />
                                    <UpdateProduct brands={brands} product={product} />
                                    <DeleteProduct product={product} />
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;