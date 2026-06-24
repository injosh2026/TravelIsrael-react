// src/redux/slices/tripsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RecommendedTripType } from '../../../types/recommendedTrip.type';
import type { PlanDataType } from '../../../pages/TripPlannerWizard';
import { getRecommendedTrips } from '../../../services/trips.service';

export type RecommendedTrip = RecommendedTripType;

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

export const fetchRecommendedTrips = createAsyncThunk<
    RecommendedTrip[],
    PlanDataType,
    { rejectValue: string }
>('trips/fetchRecommendedTrips', async (planData, { rejectWithValue }) => {
    try {
        const data = await getRecommendedTrips(planData);
        return data;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error fetching recommended trips';
        return rejectWithValue(message);
    }
});

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
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
                state.error = action.payload ?? 'Error fetching recommended trips';
            });
    },
});

export default tripsSlice.reducer;
