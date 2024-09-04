import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

// Fungsi untuk mendapatkan daftar produk berdasarkan pagination
export const getProducts = async (
  page: number,
  itemsPerPage: number = ITEMS_PER_PAGE
) => {
  const skip = (page - 1) * itemsPerPage;
  const products = await prisma.product.findMany({
    skip: skip,
    take: itemsPerPage,
    orderBy: {
      id: "asc", // Mengurutkan produk berdasarkan ID secara ascending
    },
    select: {
      id: true, // Mengambil ID produk
      title: true, // Mengambil judul produk
      price: true, // Mengambil harga produk
      brandId: true, // Mengambil ID merek produk
      brand: {
        // Mengambil informasi merek terkait
        select: {
          id: true,
          name: true,
        },
      },
    },
    include: {
        brand: true
    }
  });
  return products;
};

// Fungsi untuk menghitung jumlah halaman yang diperlukan berdasarkan jumlah produk
export const getProductPages = async () => {
  const productsCount = await prisma.product.count();
  const totalPages = Math.ceil(productsCount / ITEMS_PER_PAGE);
  return totalPages;
};
