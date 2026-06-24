import { configureStore } from "@reduxjs/toolkit"
import tripsReducer from "./slices/tripsSlice"
import filtersReducer from "./slices/filtersSlice"
import lookupsReducer from "./slices/lookups/lookups.slice"
import plannerReducer from "./slices/planner/tripsSlice"

export const store = configureStore({
    reducer: {
        trips: tripsReducer,
        filters: filtersReducer,
        lookups: lookupsReducer,
        planner: plannerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch