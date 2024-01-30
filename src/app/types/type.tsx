export type Products = {
    id: number,
    name: string,
    price: number,
    type: 0 | 1 | null,
    created_at: string,
    updated_at: string,
    productImages: ImageArray[],
    productLocations: LocaitonArray[],
}

export type ImageArray = {
    created_at: string,
    id: number
    image: string,
    productId: number,
    updated_at: string
}

export type LocaitonArray = {
    created_at: string,
    id: number,
    locationId: number,
    productId: number,
    qty: number,
    updated_at: string,
}

export type Locations = {
    id: number,
    location_name: string,
    created_at: string,
    updated_at: string
}