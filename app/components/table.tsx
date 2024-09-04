import { Brand, Product } from '@prisma/client';
import ViewProduct from "../products/view_product";
import UpdateProduct from "../products/update_product";
import DeleteProduct from "../products/delete_product";
import { getProducts } from '@/lib/data';

const Table = async ({
    currentPage
}: {
    currentPage: number
}) => {
    const products: Product[] = await getProducts(currentPage);

    return (
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
                    <tr key={product.id} className="hover text-center">
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td>Rp {product.price.toLocaleString('en-US')}</td>
                        <td>{product.brand?.name}</td>
                        <td className="flex justify-center">
                            <ViewProduct product={product} />
                            <UpdateProduct brands={brands} product={product} />
                            <DeleteProduct product={product} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;