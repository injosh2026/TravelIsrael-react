export type PendingTripType = {
    id: number;
    name: string;
    creator: string;
    email: string;
    region: string;
    difficulty: 'קל' | 'קל-בינוני' | 'בינוני' | 'בינוני-קשה' | 'קשה' | 'ללא';
    type: string;
    stops: number;
    submittedDate: Date;
};