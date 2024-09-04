import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (page: number, itemsPerPage: number) => {
    const skip = (page - 1) * itemsPerPage;
    const res = await prisma.product.findMany({
        skip: skip,
        take: itemsPerPage,
        orderBy: {
            id: 'asc',
        },
        include: {
            brand: true, // Menggunakan include untuk menyertakan data brand
        },
    });

    return res;
};

// Definisikan tipe yang dihasilkan Prisma berdasarkan query di atas
export type ProductWithBrand = Prisma.PromiseReturnType<typeof getProducts>[number];