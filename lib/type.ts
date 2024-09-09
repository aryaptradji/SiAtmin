export interface ProductWithBrand {
    id: number;
    title: string;
    price: number;
    brandId: number;
    brand: {
        id: number;
        name: string;
    };
}

export interface Brand {
    id: number;
    name: string;
}