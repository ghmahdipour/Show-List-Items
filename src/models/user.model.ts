export type UserType = {
    email?: string;
    username?: string;
    password?: string;
    phone?: string;
    address?: AddressType
};

export type AddressType = {
    geolocation?: LocationType;
    city?: string;
    street?: string;
    number?: number;
    zipcode?: string;
};

export type LocationType = {
    lat?: string;
    long?: string;
};