export type AllTripType = {
    id: number;
    name: string;
    creator: string;
    email: string;
    region: string | null;
    status: string;
    rejectReason: string | null;
    type: string;
    stops: number;
    rating: number;
    saves: number;
    views: number;
    popularity: 'high'| 'medium' | 'low' | null;
}
