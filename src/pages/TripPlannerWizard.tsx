import React, { useEffect, useState } from 'react';
import { MapPin, TrendingUp, Clock, Settings, FileText, Check, ArrowRight, ArrowLeft, Compass, Accessibility, CloudRain, DollarSign } from 'lucide-react';
import { Map } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { fetchLookups } from '../redux/slices/lookups/lookups.thunk';
import DifficultySelection from '../sections/plannerWizard/DifficultySelection';
import AccessibilitySelection from '../sections/plannerWizard/AccessibilitySelection';
import TripTypeSelection from '../sections/plannerWizard/TripTypeSelection';
import { MdHiking } from "react-icons/md"
import PreferencesSection from '../sections/plannerWizard/PreferencesSelection';
import RegionSelection from '../sections/plannerWizard/RegionSelection';
import { fetchRecommendedTrips } from '../redux/slices/planner/tripsSlice';


export type PlanDataType = {
    regionId: number | null,
    difficulty: number | null,
    accessibility: number | null,
    typeId: number | null,
    isRainyDay: boolean;
    maxPrice: number | null;
    availableHours: number | null;

}

export default function TripPlannerWizard() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    const dispatch = useDispatch<AppDispatch>();
    const lookups = useSelector((state: RootState) => state.lookups.data);
    const isLoaded = useSelector((state: RootState) => state.lookups.isLoaded);

    useEffect(() => {
        dispatch(fetchLookups());
    }, [dispatch]);

    const [planData, setPlanData] = useState<PlanDataType>({
        regionId: null,
        difficulty: null,
        accessibility: null,
        typeId: null,
        isRainyDay: false,
        maxPrice: null,
        availableHours: null,
    });

    const steps = [
        { id: 0, title: 'אזור הטיול', icon: MapPin },
        { id: 1, title: 'רמת קושי', icon: TrendingUp },
        { id: 2, title: 'רמת נגישות', icon: Accessibility },
        { id: 3, title: 'סוג הטיול', icon: MdHiking },
        { id: 4, title: 'העדפות מיוחדות', icon: Settings },
        { id: 5, title: 'סיכום', icon: FileText }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFindTrips = async () => {
        try {
            await dispatch(fetchRecommendedTrips(planData)).unwrap();
            navigate('/planningResultPage');
        } catch (error) {
            console.error("שגיאה בקבלת טיולים", error);
        }
    };

    if (!isLoaded)
        return <div className="min-h-screen bg-[#f9fafb] pt-20">טוען...</div>;

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <RegionSelection
                        value={planData.regionId}
                        onChange={(regionId) =>
                            setPlanData(prev => ({
                                ...prev,
                                regionId: regionId
                            }))
                        }
                    />
                );

            case 1:
                return (
                    <DifficultySelection
                        value={planData.difficulty}
                        onChange={(val) =>
                            setPlanData({ ...planData, difficulty: val })
                        }
                        options={lookups?.difficulties || []}
                    />
                );

            case 2:
                return (
                    <AccessibilitySelection
                        value={planData.accessibility}
                        onChange={(val) =>
                            setPlanData({
                                ...planData,
                                accessibility: val
                            })
                        }
                        options={lookups?.accessibilities || []}
                    />
                );

            case 3:
                return (
                    <TripTypeSelection
                        value={planData.typeId}
                        onChange={(val) =>
                            setPlanData({ ...planData, typeId: val })
                        }
                        options={lookups?.tripTypes || []}
                    />
                );

            case 4:
                return (
                    <PreferencesSection
                        planData={planData}
                        setPlanData={setPlanData}
                    />
                );

            case 5:
                return (
                    <div>
                        <h2 className="text-3xl font-light text-[#111827] mb-2">סיכום התכנון</h2>
                        <p className="text-[#6b7280] mb-8">בדקו את הבחירות שלכם</p>

                        <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-sm p-8 space-y-6">

                            {/* אזור */}
                            {planData.regionId && (
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">אזור</div>
                                        <div className="text-[#111827] font-medium">
                                            {
                                                lookups?.regions?.find(r => r.id === planData.regionId)
                                                    ?.regionName
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* רמת קושי */}
                            {planData.difficulty !== null && (
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">רמת קושי</div>
                                        <div className="text-[#111827] font-medium">
                                            {
                                                lookups?.difficulties?.find(d => d.id === planData.difficulty)
                                                    ?.name
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* רמת נגישות */}
                            {planData.accessibility !== null && (
                                <div className="flex items-start gap-4">
                                    <Accessibility className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">רמת נגישות</div>
                                        <div className="text-[#111827] font-medium">
                                            {
                                                lookups?.accessibilities?.find(d => d.id === planData.accessibility)
                                                    ?.name
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* סוג טיול */}
                            {planData.typeId && (
                                <div className="flex items-start gap-4">
                                    <MdHiking className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">סוג טיול</div>
                                        <div className="text-[#111827] font-medium">
                                            {
                                                lookups?.tripTypes?.find(t => t.id === planData.typeId)
                                                    ?.typeName
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* יום גשום */}
                            {planData.isRainyDay === true && (
                                <div className="flex items-start gap-4">
                                    <CloudRain className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">תנאי מזג אוויר</div>
                                        <div className="text-[#111827] font-medium">
                                            {planData.isRainyDay
                                                ? 'מותאם ליום גשום'
                                                : 'לא נדרש התאמה לגשם'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* מחיר מקסימלי */}
                            {planData.maxPrice && (
                                <div className="flex items-start gap-4">
                                    <DollarSign className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">תקציב מקסימלי</div>
                                        <div className="text-[#111827] font-medium">
                                            עד {planData.maxPrice} ₪
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* משך זמן */}
                            {planData.availableHours && (
                                <div className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-[#6b7280] mt-0.5" />
                                    <div>
                                        <div className="text-sm text-[#6b7280] mb-1">משך זמן</div>
                                        <div className="text-[#111827] font-medium">
                                            {planData.availableHours} שעות
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* קריאה לפעולה */}
                        <div className="mt-8 p-6 bg-[#f0fdf4] border border-[#86efac] rounded-sm">
                            <div className="flex items-start gap-3">
                                <Compass className="w-5 h-5 text-[#059669] mt-0.5" />
                                <div>
                                    <div className="font-medium text-[#059669] mb-1">מוכנים לצאת לדרך!</div>
                                    <div className="text-sm text-[#059669]/80">
                                        לחצו על "מצא לי טיול" וקבלו המלצה מותאמת אישית
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-6 bg-[#f0fdf4] border border-[#86efac] rounded-sm">
                            <div className="flex items-start gap-3">
                                <Map className="w-5 h-5 text-[#059669] mt-0.5" />
                                <div>
                                    <div className="font-medium text-[#059669] mb-1">רוצה חוויה מותאמת אישית?</div>
                                    <div className="text-sm text-[#059669]/80">
                                        לחצו על "תכנן טיול אישי" ותכננו את הטיול לפי ההעדפות שלכם
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#ffffff]" dir="rtl">
            {/* Hero Header */}
            <div className="bg-gradient-to-b from-[#f0fdf4] to-[#ffffff] border-b border-[#e5e7eb]">
                <div className="max-w-5xl mx-auto px-4 py-16 text-center">
                    <div className="w-16 h-16 bg-[#111827] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Compass className="w-8 h-8 text-[#ffffff]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light text-[#111827] mb-4">
                        נתכנן את המסלול המושלם עבורך
                    </h1>
                    <p className="text-lg text-[#6b7280]">
                        בחר העדפות, ואנחנו נדאג לשאר
                    </p>
                </div>
            </div>

            {/* Stepper */}
            <div className="bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] sticky top-20 z-10">
                <div className="max-w-5xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = index < currentStep;
                            const isActive = index === currentStep;

                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted
                                                ? 'bg-[#111827] text-[#ffffff]'
                                                : isActive
                                                    ? 'bg-[#111827] text-[#ffffff]'
                                                    : 'bg-[#f3f4f6] text-[#9ca3af]'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <Icon className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div
                                            className={`mt-2 text-xs font-medium md:block whitespace-nowrap ${isActive ? 'text-[#111827]' : 'text-[#9ca3af]'
                                                }`}
                                        >
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 h-0.5 bg-[#e5e7eb] mx-2">
                                            <div
                                                className={`h-full transition-all ${isCompleted ? 'bg-[#111827]' : 'bg-transparent'
                                                    }`}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {renderStepContent()}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e7eb] py-6 z-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium transition-colors ${currentStep === 0
                                ? 'text-[#9ca3af] cursor-not-allowed'
                                : 'text-[#111827] hover:bg-[#f9fafb]'
                                }`}
                        >
                            <ArrowRight className="w-4 h-4" />
                            הקודם
                        </button>

                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 bg-[#111827] text-[#ffffff] px-8 py-3 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
                            >
                                הבא
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                {/* כפתור משני - תכנן טיול אישי */}
                                <button
                                    onClick={() => navigate('/buildTrip')}
                                    className="flex items-center gap-2 border border-[#059669] text-[#059669] px-6 py-3 rounded-sm text-sm font-medium hover:bg-[#d1fae5] transition-colors"
                                >
                                    תכנן טיול אישי
                                    <Map className="w-4 h-4" />
                                </button>

                                {/* כפתור ראשי - מצא לי טיול */}
                                <button
                                    onClick={handleFindTrips}
                                    className="flex items-center gap-2 bg-[#059669] text-[#ffffff] px-6 py-3 rounded-sm text-sm font-medium hover:bg-[#047857] transition-colors"
                                >
                                    מצא לי טיול
                                    <Compass className="w-4 h-4" />
                                </button>
                            </div>

                        )}
                    </div>
                </div>
            </div>

            {/* Spacer for fixed bottom nav */}
            <div className="h-24" />
        </div>
    );
}

