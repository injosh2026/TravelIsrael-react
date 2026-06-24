import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { DayTripType } from "../../types/dayTrip.type";
import type { TripFilterType } from "../../types/tripFilter.type";
import { getFilteredTrips } from "../../services/trips.service";
import { getTripById } from "../../services/trip.service";
import type { DayTripDetailType } from "../../types/dayTripDetail.type";

interface TripsState {
    trips: DayTripType[];
    currentTrip: DayTripDetailType | null;
    loading: boolean;
}

const initialState: TripsState = {
    trips: [],
    currentTrip: null,
    loading: false,
};

export const fetchTrips = createAsyncThunk(
    "trips/fetchTrips",
    async (filters: TripFilterType) => {
        const data = await getFilteredTrips(filters);
        return data;
    }
);

export const fetchTripById = createAsyncThunk(
    "trips/fetchTripById",
    async (id: number) => {
        const data = await getTripById(id);
        return data;
    }
);

const tripsSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {
        setCurrentTrip: (state, action) => {
            state.currentTrip = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.trips = action.payload;
            })
            .addCase(fetchTrips.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchTripById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTripById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTrip = action.payload;
            })
            .addCase(fetchTripById.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default tripsSlice.reducer;
export const { setCurrentTrip } = tripsSlice.actions;