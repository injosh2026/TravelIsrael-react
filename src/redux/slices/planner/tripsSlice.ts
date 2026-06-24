// src/redux/slices/tripsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DayTripDetailType } from '../../../types/dayTripDetail.type';
import { getRecommendedTrips } from '../../../services/trips.service';

export interface RecommendedTrip {
    trip: DayTripDetailType;
    matchPercentage: number;
}

interface PlannerState {
    trips: RecommendedTrip[];
    loading: boolean;
    error?: string;
}

const initialState: PlannerState = {
    trips: [],
    loading: false,
    error: undefined,
};

// thunk אסינכרוני שמשתמש בפונקציה שלך
export const fetchRecommendedTrips = createAsyncThunk<
    RecommendedTrip[],
    any, // פה נשלח את planData
    { rejectValue: string }
>('trips/fetchRecommendedTrips', async (planData, { rejectWithValue }) => {
    try {
        const data = await getRecommendedTrips(planData);
        // data צריך להיות מערך של { trip: DayTripType, matchPercentage: number }
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Error fetching recommended trips');
    }
});

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        // אפשר להוסיף reducers מקומיים אם צריך, למשל לשמור trip נבחר
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRecommendedTrips.pending, state => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchRecommendedTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.trips = action.payload;
            })
            .addCase(fetchRecommendedTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tripsSlice.reducer;