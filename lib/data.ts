import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fungsi untuk mendapatkan daftar produk berdasarkan pagination
export const getProducts = async () => {
  // const skip = (page - 1) * perPage;
  const res = await prisma.product.findMany({
    // skip: skip,
    // take: perPage,
    orderBy: {
      id: "asc", // Mengurutkan produk berdasarkan ID secara ascending
    },
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: {
        // Menggunakan select untuk menyertakan data brand
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return res;
};

// Fungsi untuk menghitung jumlah halaman yang diperlukan berdasarkan jumlah produk
export const getProductPages = async () => {
  const productsCount = await prisma.product.count();
  console.log(productsCount);
  const totalPages = Math.ceil(productsCount / 6);
  return totalPages;
};

// Fungsi untuk mendapatkan list brand
export const getBrands = async () => {
  const res = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: "asc"
    }
  });
  return res;
};

getProductPages();
