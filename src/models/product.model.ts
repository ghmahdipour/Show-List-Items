export type ProductType = {
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    image?: string;
    rating?: RateType
};

export type RateType = {
    rate?: number;
    count?: number;
};