// redux/filtersSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TripFilterType } from "../../types/tripFilter.type";

const initialState: TripFilterType = {
  search: "",
  region: null,
  difficulty: null,
  accessibility: null,
  duration: 0,
  lengthKM: 0,
  dayTripType: null,
  price: 0,
  stopsCount: 0,
  skip: 0,
  take: 20,
  sortBy: "createAt",
  sortDirection: "asc",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (_state, action: PayloadAction<TripFilterType>) => {
      return action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;