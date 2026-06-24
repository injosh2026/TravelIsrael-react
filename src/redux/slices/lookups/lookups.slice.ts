// redux/lookups/lookups.slice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type LookupsType } from "../../../types/lookups.type";

type LookupsState = {
    data: LookupsType | null;
    isLoaded: boolean;
};

const initialState: LookupsState = {
    data: null,
    isLoaded: false
};

const lookupsSlice = createSlice({
    name: "lookups",
    initialState,
    reducers: {
        setLookups(state, action: PayloadAction<LookupsType>) {
            state.data = action.payload;
            state.isLoaded = true;
        }
    }
});

export const { setLookups } = lookupsSlice.actions;
export default lookupsSlice.reducer;