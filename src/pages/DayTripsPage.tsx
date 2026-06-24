import { useEffect, useState } from 'react';
import { Search, X, SlidersHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import DayTripCard from '../component/DayTripCard';
import FilterPanel from '../sections/FilterPanel';
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchTrips } from "../redux/slices/tripsSlice";
import { resetFilters, setFilters } from '../redux/slices/filtersSlice';
import type { TripFilterType } from '../types/tripFilter.type';
import { fetchLookups } from '../redux/slices/lookups/lookups.thunk';

export default function TripsPage() {
    const [showFilters, setShowFilters] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const trips = useSelector((state: RootState) => state.trips.trips);
    const filters = useSelector((state: RootState) => state.filters);
    const lookups = useSelector((state: RootState) => state.lookups.data);
    const isLoaded = useSelector((state: RootState) => state.lookups.isLoaded);

    useEffect(() => {
        dispatch(fetchLookups());
        dispatch(fetchTrips(filters));
    }, []);

    if (!isLoaded)
        return <div className="min-h-screen bg-[#f9fafb] pt-20">טוען...</div>;

    const handleFiltersChange = (updatedFilters: TripFilterType) => {
        dispatch(setFilters(updatedFilters));
    };

    const applyFiltersHandler = () => {
        dispatch(fetchTrips(filters));
    };

    const clearFilters = () => {
        dispatch(resetFilters());
        dispatch(fetchTrips({
            ...filters,
            search: '',
        }));
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]" dir="rtl">
            <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                    <h1 className="text-4xl font-light text-[#111827] mb-3">
                        מצא את הטיול הבא שלך
                    </h1>
                    <p className="text-[#6b7280] text-sm">
                        סינון טיולים לפי אזור, רמת קושי, נגישות, משך זמן ועוד
                    </p>
                </div>
            </div>

            <div className="w-full px-6 py-8 xl:px-12 2xl:px-20">
                <div className="flex gap-8">
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-8">
                            <FilterPanel
                                filters={filters}
                                lookups={lookups}
                                clearFilters={clearFilters}
                                onFiltersChange={handleFiltersChange}
                                onApply={applyFiltersHandler}
                                setShowFilters={setShowFilters}
                            />
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="flex items-center gap-3 mb-6 justify-end">
                            <span className="text-sm text-gray-600">
                                מיין לפי
                            </span>

                            <select
                                value={filters.sortBy}
                                onChange={(e) => {
                                    const updatedFilters = { ...filters, sortBy: e.target.value };
                                    setFilters(updatedFilters);
                                    dispatch(fetchTrips(updatedFilters));
                                }}
                                className="border border-gray-300 rounded-sm px-3 py-2 text-sm"
                            >
                                <option value="createAt">תאריך יצירה</option>
                                <option value="name">שם</option>
                                <option value="price">מחיר</option>
                                <option value="duration">משך זמן</option>
                                <option value="lengthKM">אורך מסלול</option>
                                <option value="numberOfViews">מספר צפיות</option>
                            </select>

                            <button
                                onClick={() => {
                                    const newDirection: "asc" | "desc" = filters.sortDirection === "asc" ? "desc" : "asc";
                                    const updatedFilters = { ...filters, sortDirection: newDirection };
                                    setFilters(updatedFilters);
                                    dispatch(fetchTrips(updatedFilters));
                                }}
                                className="border border-gray-300 rounded-sm px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                            >
                                {filters.sortDirection === "asc" ? (
                                    <ArrowUp className="w-4 h-4 text-black inline" />
                                ) : (
                                    <ArrowDown className="w-4 h-4 text-black inline" />
                                )}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-[#111827] text-[#ffffff] py-3 rounded-sm text-sm font-medium"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            סינון
                        </button>

                        <div className="mb-6 text-sm text-[#6b7280]">
                            נמצאו {trips.length} טיולים
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6">
                            {trips.map((trip) => (
                                <div key={trip.id}>
                                    <DayTripCard trip={trip} />
                                </div>
                            ))}
                        </div>

                        {trips.length !== 0 && (
                            <div className="text-center pt-6">
                                <button
                                    onClick={() => {
                                        const updatedFilters = { ...filters, skip: trips.length < 20 ? 0 : filters.skip + filters.take };
                                        setFilters(updatedFilters);
                                        dispatch(fetchTrips(updatedFilters));
                                    }}
                                    className="bg-[#111827] text-[#ffffff] px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
                                >
                                    טען עוד...
                                </button>
                            </div>
                        )}

                        {trips.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-[#9ca3af]" />
                                </div>
                                <h3 className="text-lg font-medium text-[#111827] mb-2">
                                    לא נמצאו טיולים
                                </h3>
                                <p className="text-sm text-[#6b7280] mb-6">
                                    לא נמצאו טיולים לפי הסינון שבחרת
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-[#111827] text-[#ffffff] px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
                                >
                                    איפוס סינון
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {showFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-[#000000]/50"
                        onClick={() => setShowFilters(false)}
                    />
                    <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#ffffff] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-[#111827]">סינון</h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-[#f3f4f6] rounded transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#111827]" />
                                </button>
                            </div>
                            <FilterPanel
                                filters={filters}
                                lookups={lookups}
                                clearFilters={clearFilters}
                                onFiltersChange={handleFiltersChange}
                                onApply={applyFiltersHandler}
                                setShowFilters={setShowFilters}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
