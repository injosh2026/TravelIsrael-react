export type AllPlacesType = {
    id: number;
    name: string;
    itemType: string;
    creator: string;
    email: string;
    image: string;
    region: string | null;
    status: string;
    rejectReason: string | null;
    type: string;
    rating: number;
    saves: number;
    views: number;
    popularity: 'high' | 'medium' | 'low' | null;
    createAt: Date;
}