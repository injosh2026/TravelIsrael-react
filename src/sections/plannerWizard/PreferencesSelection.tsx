import type { PlanDataType } from "../../pages/TripPlannerWizard";

type Props = {
    planData: PlanDataType;
    setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>;
};

export default function PreferencesSection({
    planData,
    setPlanData
}: Props) {
    return (
        <div>
            <h2 className="text-3xl font-light text-[#111827] mb-2">העדפות מיוחדות</h2>
            <p className="text-[#6b7280] mb-8">הגדירו דרישות נוספות לטיול (אופציונלי)</p>


            <div className="space-y-6">

                {/* יום גשום */}
                <label className="flex items-center gap-4 p-6 border-2 border-[#e5e7eb] rounded-sm hover:border-[#d1d5db] cursor-pointer transition-all">
                    <input
                        type="checkbox"
                        checked={planData.isRainyDay}
                        onChange={(e) =>
                            setPlanData({
                                ...planData,
                                isRainyDay: e.target.checked
                            })
                        }
                        className="w-5 h-5"
                    />
                    <div className="flex items-center gap-3">
                        <span className="text-[#111827] font-medium">
                            מתאים ליום גשום
                        </span>
                    </div>
                </label>

                {/* מחיר מקסימלי */}
                <div className="p-6 border-2 border-[#e5e7eb] rounded-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#111827] font-medium">
                            תקציב מקסימלי: {planData.maxPrice}
                        </span>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={1000}
                        step={10}
                        value={planData.maxPrice ?? 0}
                        onChange={(e) =>
                            setPlanData({
                                ...planData,
                                maxPrice: Number(e.target.value)
                            })
                        }
                        className="w-full p-3 border border-[#d1d5db] rounded-sm"
                        placeholder="הכנס סכום"
                    />
                    <div className="flex justify-between text-sm text-[#6b7280] mt-2">
                        <span>0</span>
                        <span>1000</span>
                    </div>
                </div>

                {/* משך זמן */}
                <div className="p-6 border-2 border-[#e5e7eb] rounded-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#111827] font-medium">
                            משך זמן הטיול (בשעות)
                        </span>
                    </div>

                    <input
                        type="number"
                        min={1}
                        value={planData.availableHours ?? 0}
                        onChange={(e) =>
                            setPlanData({
                                ...planData,
                                availableHours: Number(e.target.value)
                            })
                        }
                        className="w-full p-3 border-2 border-[#e5e7eb] rounded-sm focus:border-[#d1d5db] outline-none transition-all"
                        placeholder="הכנס מספר שעות"
                    />
                </div>

            </div>
        </div>
    );
}