import { Accessibility, MapPin, Search, TrendingUp } from "lucide-react"
import { FaRoute } from "react-icons/fa"
import { MdHiking } from "react-icons/md"
import type { TripFilterType } from "../types/tripFilter.type"
import type { LookupsType } from "../types/lookups.type"

type Props = {
    filters: TripFilterType
    lookups?: LookupsType | null
    clearFilters: () => void
    onFiltersChange: (newFilters: TripFilterType) => void
    onApply: () => void
    setShowFilters: (value: boolean) => void
}

export default function FilterPanel({
    filters,
    lookups,
    clearFilters,
    onFiltersChange,
    onApply,
    setShowFilters
}: Props) {

    return (       

        <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg p-6">

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-[#111827]">סינון</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
                >
                    נקה הכל
                </button>
            </div>

            <div className="space-y-5">
                {/* Search */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">חיפוש</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={filters.search!}
                            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                            placeholder="חפש טיול..."
                            className="w-full px-4 py-2.5 pr-10 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                    </div>
                </div>

                {/* Region */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        <MapPin className="inline w-4 h-4 text-gray-600 ml-1" />
                        אזור
                    </label>
                    <select
                        value={filters.region!}
                        onChange={(e) => onFiltersChange({ ...filters, region: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
                    >
                        <option value="">כל האזורים</option>

                        {lookups?.regions.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.regionName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        <TrendingUp className="inline w-4 h-4 text-gray-600 ml-1" />
                        רמת קושי
                    </label>
                    <select
                        value={filters.difficulty!}
                        onChange={(e) => onFiltersChange({ ...filters, difficulty: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
                    >
                        <option value="">כל הרמות</option>

                        {lookups?.difficulties.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Accessibility */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        <Accessibility className="inline w-4 h-4 text-gray-600 ml-1" />
                        נגישות
                    </label>
                    <select
                        value={filters.accessibility!}
                        onChange={(e) => onFiltersChange({ ...filters, accessibility: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
                    >
                        <option value="">הכל</option>

                        {lookups?.accessibilities.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        <MdHiking className="inline w-4 h-4 text-gray-600 ml-1" />
                        סוג טיול
                    </label>
                    <select
                        value={filters.dayTripType!}
                        onChange={(e) => onFiltersChange({ ...filters, dayTripType: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
                    >
                        <option value="">הכל</option>

                        {lookups?.tripTypes.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.typeName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Distance Slider */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        <FaRoute className="inline w-3 h-3 text-gray-600 ml-1" />
                        מספר תחנות
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="15"
                        value={filters.stopsCount!}
                        onChange={(e) => onFiltersChange({ ...filters, stopsCount: parseInt(e.target.value) })}
                        className="w-full pr-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        משך זמן: עד {filters.duration} שעות
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={filters.duration!}
                        onChange={(e) => onFiltersChange({ ...filters, duration: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Distance Slider */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        אורך מסלול: עד {filters.lengthKM} ק"מ
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="500"
                        value={filters.lengthKM!}
                        onChange={(e) => onFiltersChange({ ...filters, lengthKM: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Distance Slider */}
                <div>
                    <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                        מחיר: עד {filters.price} ₪
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="500"
                        value={filters.price!}
                        onChange={(e) => onFiltersChange({ ...filters, price: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>


            <button
                onClick={() => {
                    onApply();
                    setShowFilters(false);
                }}
                className="w-full mt-6 bg-[#111827] text-[#ffffff] py-2.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
            >
                החל סינון
            </button>

        </div>
    )
}









// import { Accessibility, MapPin, Search, TrendingUp } from "lucide-react"
// import { FaRoute } from "react-icons/fa"
// import { MdHiking } from "react-icons/md"
// import type { TripFilterType } from "../types/tripFilter.type"
// import type { LookupsType } from "../types/lookups.type"

// type Props = {
//     filters: TripFilterType
//     setFilters: React.Dispatch<React.SetStateAction<TripFilterType>>
//     lookups?: LookupsType
//     clearFilters: () => void
//     applyFilters: () => void
//     setShowFilters: (value: boolean) => void
// }

// export default function FilterPanel({
//     filters,
//     setFilters,
//     lookups,
//     clearFilters,
//     applyFilters,
//     setShowFilters
// }: Props) {

//     return (       

//         <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg p-6">

//             <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-medium text-[#111827]">סינון</h3>
//                 <button
//                     onClick={clearFilters}
//                     className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
//                 >
//                     נקה הכל
//                 </button>
//             </div>

//             <div className="space-y-5">
//                 {/* Search */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">חיפוש</label>
//                     <div className="relative">
//                         <input
//                             type="text"
//                             value={filters.search!}
//                             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                             placeholder="חפש טיול..."
//                             className="w-full px-4 py-2.5 pr-10 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
//                         />
//                         <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
//                     </div>
//                 </div>

//                 {/* Region */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         <MapPin className="inline w-4 h-4 text-gray-600 ml-1" />
//                         אזור
//                     </label>
//                     <select
//                         value={filters.region!}
//                         onChange={(e) => setFilters({ ...filters, region: parseInt(e.target.value) })}
//                         className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
//                     >
//                         <option value="">כל האזורים</option>

//                         {lookups?.regions.map(d => (
//                             <option key={d.id} value={d.id}>
//                                 {d.regionName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Difficulty */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         <TrendingUp className="inline w-4 h-4 text-gray-600 ml-1" />
//                         רמת קושי
//                     </label>
//                     <select
//                         value={filters.difficulty!}
//                         onChange={(e) => setFilters({ ...filters, difficulty: parseInt(e.target.value) })}
//                         className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
//                     >
//                         <option value="">כל הרמות</option>

//                         {lookups?.difficulties.map(d => (
//                             <option key={d.id} value={d.id}>
//                                 {d.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Accessibility */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         <Accessibility className="inline w-4 h-4 text-gray-600 ml-1" />
//                         נגישות
//                     </label>
//                     <select
//                         value={filters.accessibility!}
//                         onChange={(e) => setFilters({ ...filters, accessibility: parseInt(e.target.value) })}
//                         className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
//                     >
//                         <option value="">הכל</option>

//                         {lookups?.accessibilities.map(d => (
//                             <option key={d.id} value={d.id}>
//                                 {d.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Type */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         <MdHiking className="inline w-4 h-4 text-gray-600 ml-1" />
//                         סוג טיול
//                     </label>
//                     <select
//                         value={filters.dayTripType!}
//                         onChange={(e) => setFilters({ ...filters, dayTripType: parseInt(e.target.value) })}
//                         className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
//                     >
//                         <option value="">הכל</option>

//                         {lookups?.tripTypes.map(d => (
//                             <option key={d.id} value={d.id}>
//                                 {d.typeName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Distance Slider */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         <FaRoute className="inline w-3 h-3 text-gray-600 ml-1" />
//                         מספר תחנות
//                     </label>
//                     <input
//                         type="number"
//                         min="1"
//                         max="15"
//                         value={filters.stopsCount!}
//                         onChange={(e) => setFilters({ ...filters, stopsCount: parseFloat(e.target.value) })}
//                         className="w-full pr-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
//                     />
//                 </div>

//                 {/* Duration */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         משך זמן: עד {filters.duration} שעות
//                     </label>
//                     <input
//                         type="range"
//                         min="1"
//                         max="100"
//                         value={filters.duration!}
//                         onChange={(e) => setFilters({ ...filters, duration: parseFloat(e.target.value) })}
//                         className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
//                     />
//                 </div>

//                 {/* Distance Slider */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         אורך מסלול: עד {filters.lengthKM} ק"מ
//                     </label>
//                     <input
//                         type="range"
//                         min="1"
//                         max="500"
//                         value={filters.lengthKM!}
//                         onChange={(e) => setFilters({ ...filters, lengthKM: parseFloat(e.target.value) })}
//                         className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
//                     />
//                 </div>

//                 {/* Distance Slider */}
//                 <div>
//                     <label className="block text-sm text-[#4b5563] mb-2 font-medium">
//                         מחיר: עד {filters.price} ₪
//                     </label>
//                     <input
//                         type="range"
//                         min="1"
//                         max="500"
//                         value={filters.price!}
//                         onChange={(e) => setFilters({ ...filters, price: parseFloat(e.target.value) })}
//                         className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
//                     />
//                 </div>
//             </div>


//             <button
//                 onClick={() => {
//                     applyFilters();
//                     setShowFilters(false);
//                 }}
//                 className="w-full mt-6 bg-[#111827] text-[#ffffff] py-2.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
//             >
//                 החל סינון
//             </button>

//         </div>
//     )
// }






// <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg p-6">
        //     <div className="flex items-center justify-between mb-6">
        //         <h3 className="text-lg font-medium text-[#111827]">סינון</h3>
        //         <button
        //             onClick={clearFilters}
        //             className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
        //         >
        //             נקה הכל
        //         </button>
        //     </div>

        //     <div className="space-y-5">
        //         {/* Search */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">חיפוש</label>
        //             <div className="relative">
        //                 <input
        //                     type="text"
        //                     value={filters.search!}
        //                     onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        //                     placeholder="חפש טיול..."
        //                     className="w-full px-4 py-2.5 pr-10 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
        //                 />
        //                 <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
        //             </div>
        //         </div>

        //         {/* Region */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 <MapPin className="inline w-4 h-4 text-gray-600 ml-1" />
        //                 אזור
        //             </label>
        //             <select
        //                 value={filters.region!}
        //                 onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        //                 className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
        //             >
        //                 <option value="">כל האזורים</option>

        //                 {lookups?.regions.map(d => (
        //                     <option key={d.id} value={d.regionName}>
        //                         {d.regionName}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>

        //         {/* Difficulty */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 <TrendingUp className="inline w-4 h-4 text-gray-600 ml-1" />
        //                 רמת קושי
        //             </label>
        //             <select
        //                 value={filters.difficulty!}
        //                 onChange={(e) => setFilters({ ...filters, difficulty: parseInt(e.target.value) })}
        //                 className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
        //             >
        //                 <option value="">כל הרמות</option>

        //                 {lookups?.difficulties.map(d => (
        //                     <option key={d.id} value={d.id}>
        //                         {d.name}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>

        //         {/* Accessibility */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 <Accessibility className="inline w-4 h-4 text-gray-600 ml-1" />
        //                 נגישות
        //             </label>
        //             <select
        //                 value={filters.accessibility!}
        //                 onChange={(e) => setFilters({ ...filters, accessibility: parseInt(e.target.value) })}
        //                 className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
        //             >
        //                 <option value="">הכל</option>

        //                 {lookups?.accessibilities.map(d => (
        //                     <option key={d.id} value={d.id}>
        //                         {d.name}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>

        //         {/* Type */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 <MdHiking className="inline w-4 h-4 text-gray-600 ml-1" />
        //                 סוג טיול
        //             </label>
        //             <select
        //                 value={filters.dayTripType!}
        //                 onChange={(e) => setFilters({ ...filters, dayTripType: e.target.value })}
        //                 className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
        //             >
        //                 <option value="">הכל</option>
                        
        //                 {lookups?.tripTypes.map(d => (
        //                     <option key={d.id} value={d.typeName}>
        //                         {d.typeName}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>

        //         {/* Distance Slider */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                <FaRoute className="inline w-3 h-3 text-gray-600 ml-1" />
        //                 מספר תחנות
        //             </label>
        //             <input
        //                 type="number"
        //                 min="1"
        //                 max="15"
        //                 value={filters.stopsCount!}
        //                 onChange={(e) => setFilters({ ...filters, stopsCount: parseFloat(e.target.value) })}
        //                 className= "w-full pr-4 py-2.5 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors text-sm"
        //             />
        //         </div>

        //         {/* Duration */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 משך זמן: עד {filters.duration} שעות
        //             </label>
        //             <input
        //                 type="range"
        //                 min="1"
        //                 max="100"
        //                 value={filters.duration!}
        //                 onChange={(e) => setFilters({ ...filters, duration: parseFloat(e.target.value) })}
        //                 className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
        //             />
        //         </div>

        //         {/* Distance Slider */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 אורך מסלול: עד {filters.lengthKM} ק"מ
        //             </label>
        //             <input
        //                 type="range"
        //                 min="1"
        //                 max="500"
        //                 value={filters.lengthKM!}
        //                 onChange={(e) => setFilters({ ...filters, lengthKM: parseFloat(e.target.value) })}
        //                 className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
        //             />
        //         </div>

        //         {/* Distance Slider */}
        //         <div>
        //             <label className="block text-sm text-[#4b5563] mb-2 font-medium">
        //                 מחיר: עד {filters.price} ₪
        //             </label>
        //             <input
        //                 type="range"
        //                 min="1"
        //                 max="500"
        //                 value={filters.price!}
        //                 onChange={(e) => setFilters({ ...filters, price: parseFloat(e.target.value) })}
        //                 className="w-full h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer"
        //             />
        //         </div>

        //         {/* Family Friendly
        //         <div>
        //             <label className="flex items-center gap-2 text-sm text-[#4b5563] cursor-pointer">
        //                 <input
        //                     type="checkbox"
        //                     checked={filters.familyFriendly}
        //                     onChange={(e) => setFilters({ ...filters, familyFriendly: e.target.checked })}
        //                     className="w-4 h-4 border-[#d1d5db] rounded-sm"
        //                 />
        //                 מתאים למשפחות
        //             </label>
        //         </div> */}
        //     </div>

        //     <button
        //         onClick={() => (
        //             setShowFilters(false)
        //             // fetchTrips();
        //         )}
        //         className="w-full mt-6 bg-[#111827] text-[#ffffff] py-2.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
        //     >
        //         החל סינון
        //     </button>
        // </div>