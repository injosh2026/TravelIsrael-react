import { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Save, Send, Undo, Redo, MapPin, Clock, Search, Filter, X, Map } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { createTrip, getTripById } from '../services/trip.service';
import type { DayTripDetailType } from '../types/dayTripDetail.type';
import type { DayTripItemType } from '../types/dayTripItem.type';
import { calculateTotalTripMinutes, formatDuration } from '../utils/calculateTimeTrip';
import { getTypeStyle } from '../utils/getTypeColor';
import { getDifficultyColor } from '../utils/getDifficultyColor';
import type { TypeType } from '../types/type.type';
import { getTripTypes } from '../services/type.service';
import type { SuggestedStopType } from '../types/suggestedStop.type';
import { getSuggestedStops } from '../services/suggestedStops.service';

export default function BuildTripPage() {
    const { tripId } = useParams();
    const isEditMode = !!tripId;

    const [trip, setTrip] = useState<DayTripDetailType | null>(null);
    const [tripStops, setTripStops] = useState<DayTripItemType[]>([]);
    const [tripMeta, setTripMeta] = useState({
        name: '',
        description: '',
        image: '',
        imageUrl: null as File | null,
        type: null as TypeType | null,
        startTime: ''
    });
    const [tripTypes, setTripTypes] = useState<TypeType[]>([]);
    const [suggestedStops, setSuggestedStops] = useState<SuggestedStopType[]>([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    const [showAddPanel, setShowAddPanel] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    //   const [history, setHistory] = useState([]);
    //   const [historyIndex, setHistoryIndex] = useState(-1);

    const loadSuggestions = async (search?: string) => {
        try {

            setLoadingSuggestions(true);

            const result = await getSuggestedStops({

                currentStops: tripStops.map(stop => ({
                    itemId:
                        stop.itemType === 1
                            ? stop.place!.id
                            : stop.route!.id,

                    itemType: stop.itemType,
                    orderInTrip: stop.orderInTrip
                })),
                search,
                limit: 10
            });
            setSuggestedStops(result);
        } catch (err) {
            console.error("Error loading suggestions", err);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    useEffect(() => {

        if (!showAddPanel)
            return;

        const timeout = setTimeout(() => {

            loadSuggestions(searchTerm);

        }, 400);

        return () => clearTimeout(timeout);

    }, [searchTerm, showAddPanel]);

    useEffect(() => {
        fetchTripTypes();
    }, []);

    useEffect(() => {
        console.log("📍 TRIP META:");
        console.log(tripMeta);

        console.log("📍 TRIP STOPS:");
        console.log(tripStops);

        console.log("📍 FULL STRUCTURE:");
        console.log({
            meta: tripMeta,
            stops: tripStops
        });
    }, [tripStops, tripMeta]);

    const fetchTripTypes = async () => {
        try {
            const res = await getTripTypes();
            setTripTypes(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isEditMode) {
            fetchTrip();
        } else {
            setTripStops([]); // יצירה חדשה
        }
    }, [tripId]);

    const fetchTrip = async () => {
        try {
            const res = await getTripById(Number(tripId));
            setTripStops(res.dayTripItems);
            setTrip(res);
            setTripMeta({
                name: res.name,
                description: res.description,
                image: res.image,
                imageUrl: null,
                type: res.type?.typeName,
                startTime: res.startTime
            });
        } catch (err) {
            console.error('Error loading trip', err);
        }
    };
    // console.log('Current trip stops:', tripStops);
    // console.log('Current trip:', trip);

    const normalizeModes = (stops: DayTripItemType[], defaultMode: number = 1) => {
        return stops.map((stop, index) => {
            const isLast = index === stops.length - 1;

            return {
                ...stop,
                mode: isLast ? null : stop.mode ?? defaultMode
            };
        });
    };

    const removeStop = (id: any) => {
        setTripStops(tripStops.filter(stop => stop.id !== id));
    };

    const moveUp = (index: any) => {
        if (index === 0) return;
        const newStops = [...tripStops];
        [newStops[index], newStops[index - 1]] = [newStops[index - 1], newStops[index]];
        setTripStops(normalizeModes(newStops));
    };

    const moveDown = (index: any) => {
        if (index === tripStops.length - 1) return;
        const newStops = [...tripStops];
        [newStops[index], newStops[index + 1]] = [newStops[index + 1], newStops[index]];
        setTripStops(normalizeModes(newStops));
    };

    const getTypeColor = (type: string) => {
        const style = getTypeStyle(type);
        return `${style.bg} ${style.text}`;
    };

    // const totalDuration = tripStops.reduce((acc, stop) => {
    //     const hours = parseFloat(stop.duration);
    //     return formatTripDuration(acc + hours);
    // }, 0);

    const addSuggestedStop = (stop: SuggestedStopType) => {
        console.log(stop);

        const newStop: DayTripItemType = {
            id: Date.now(), // יצירת ID זמני, יש להחליף ב-ID מהשרת לאחר השמירה

            dayTripId: Number(tripId) || 0,

            itemType: stop.itemType,

            orderInTrip: Math.max(...tripStops.map(s => s.orderInTrip), 0) + 1,

            estimatedDuration: stop.estimatedDuration,

            mode: 1,

            place:
                stop.itemType === 1
                    ? {
                        id: stop.itemId,
                        name: stop.name,
                        latitude: stop.latitude,
                        longitude: stop.longitude,
                        endLatitude: stop.endLatitude ?? null,
                        endLongitude: stop.endLongitude ?? null,
                        images: [
                            {
                                image: stop.mainImage,
                                isMain: true
                            }
                        ],
                        region: {
                            regionName: stop.regionName
                        },
                        type: {
                            typeName: stop.typeName
                        }
                    } as any
                    : null,

            route:
                stop.itemType === 0
                    ? {
                        id: stop.itemId,
                        name: stop.name,
                        latitude: stop.latitude,
                        longitude: stop.longitude,
                        endLatitude: stop.endLatitude ?? null,
                        endLongitude: stop.endLongitude ?? null,
                        images: [
                            {
                                image: stop.mainImage,
                                isMain: true
                            }
                        ],
                        region: {
                            regionName: stop.regionName
                        },
                        type: {
                            typeName: stop.typeName
                        },
                        difficulty: {
                            name: stop.difficulty
                        }
                    } as any
                    : null
        };
        console.log("Adding new stop:", newStop);
        setTripStops(prev => {

            const updated = [...prev, newStop];

            setTimeout(() => {
                loadSuggestions(searchTerm);
            }, 0);

            return updated;
        });

        setShowAddPanel(false)
    };

    const saveTrip = async (sendForApproval: boolean) => {
        if (!tripMeta.name.trim()) {
            alert("יש להזין שם לטיול");
            return;
        }

        if (!tripMeta.description.trim()) {
            alert("יש להזין תיאור");
            return;
        }

        if (!tripMeta.type?.id) {
            alert("יש לבחור סוג טיול");
            return;
        }

        if (!tripMeta.startTime) {
            alert("יש לבחור שעת התחלה");
            return;
        }

        if (tripStops.length === 0) {
            alert("יש להוסיף לפחות תחנה אחת");
            return;
        }

        if (!tripMeta.imageUrl && !tripMeta.image) {
            alert("יש להעלות תמונה לטיול");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("Name", tripMeta.name);

            formData.append("Description", tripMeta.description);

            formData.append(
                "TypeId",
                String(tripMeta.type.id)
            );

            formData.append(
                "StartTime", 
                `${tripMeta.startTime}`
            );

            formData.append(
                "SendForApproval",
                String(sendForApproval)
            );

            if (tripMeta.imageUrl) {

                formData.append(
                    "FileImage",
                    tripMeta.imageUrl
                );
            }

            tripStops.forEach((stop, index) => {

                formData.append(
                    `Items[${index}].ItemType`,
                    String(stop.itemType)
                );

                if (stop.itemType === 1 && stop.place?.id) {

                    formData.append(
                        `Items[${index}].PlaceId`,
                        String(stop.place.id)
                    );
                }

                if (stop.itemType === 0 && stop.route?.id) {

                    formData.append(
                        `Items[${index}].RouteId`,
                        String(stop.route.id)
                    );
                }

                formData.append(
                    `Items[${index}].OrderInTrip`,
                    String(index + 1)
                );

                formData.append(
                    `Items[${index}].EstimatedDuration`,
                    String(stop.estimatedDuration)
                );

                formData.append(
                    `Items[${index}].Mode`,
                    String(index === tripStops.length - 1
                        ? 1
                        : stop.mode ?? 1)
                );
            });

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const result = await createTrip(formData);

            console.log("TRIP CREATED:", result);

            alert(
                sendForApproval
                    ? "הטיול נשלח לאישור!"
                    : "הטיול נשמר כטיוטה!"
            );

        } catch (err) {

            console.error("Error saving trip", err);

            alert("שגיאה בשמירת הטיול");
        }
    };


    return (
        <div className="min-h-screen bg-[#f9fafb]" dir="rtl">
            {/* Header */}
            <div className="bg-[#ffffff] border-b border-[#e5e7eb] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-light text-[#111827] mb-1">בניית טיול מותאם אישית</h1>
                            <p className="text-[#6b7280]">הוסף, הסר ושנה את סדר התחנות כרצונך</p>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
                                <Undo className="w-4 h-4" />
                                <span className="hidden md:inline">ביטול</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-[#e5e7eb] rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
                                <Redo className="w-4 h-4" />
                                <span className="hidden md:inline">חזרה</span>
                            </button>
                        </div>
                    </div>

                    {/* Trip Summary */}
                    <div className="mt-6 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#6b7280]" />
                            <span className="text-[#6b7280]">תחנות:</span>
                            <span className="font-bold text-[#111827]">{tripStops.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#6b7280]" />
                            <span className="text-[#6b7280]">זמן כולל:</span>
                            <span className="font-bold text-[#111827]">
                                {formatDuration(
                                    calculateTotalTripMinutes(
                                        {
                                            ...trip,
                                            dayTripItems: tripStops
                                        } as DayTripDetailType)
                                )}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Trip Builder */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">פרטי הטיול</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* צד שמאל - טופס */}
                                <div className="md:col-span-2 space-y-4">

                                    {/* שם */}
                                    <input
                                        type="text"
                                        placeholder="שם הטיול"
                                        value={tripMeta.name}
                                        onChange={(e) => setTripMeta({ ...tripMeta, name: e.target.value })}
                                        className="border p-3 rounded-lg w-full"
                                    />

                                    {/* סוג */}
                                    <select
                                        value={tripMeta.type?.id || ''}
                                        onChange={(e) => {
                                            const selectedType = tripTypes.find(t => t.id === Number(e.target.value));
                                            setTripMeta({ ...tripMeta, type: selectedType || null });
                                        }}
                                        className="border p-3 rounded-lg w-full text-gray-900"
                                    >
                                        <option value="">בחר סוג טיול</option>
                                        {tripTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>

                                    {/* שעת התחלה */}
                                    <input
                                        type="time"
                                        value={tripMeta.startTime}
                                        onChange={(e) => setTripMeta({ ...tripMeta, startTime: e.target.value })}
                                        className="border p-3 rounded-lg w-full"
                                    />

                                    {/* העלאת תמונה */}
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            setTripMeta({ ...tripMeta, imageUrl: file });
                                        }}
                                        className="border p-3 rounded-lg w-full"
                                    />

                                </div>

                                {/* צד ימין - preview */}
                                <div className="flex flex-col items-center justify-start">
                                    <div className="w-full aspect-square border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">

                                        {tripMeta.image && !tripMeta.imageUrl && (
                                            <img
                                                src={`data:image/jpeg;base64,${tripMeta.image}`}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {tripMeta.imageUrl && (
                                            <img
                                                src={URL.createObjectURL(tripMeta.imageUrl)}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {!tripMeta.image && !tripMeta.imageUrl && (
                                            <span className="text-gray-400 text-sm">תצוגה מקדימה</span>
                                        )}

                                    </div>
                                </div>
                            </div>

                            {/* תיאור */}
                            <textarea
                                placeholder="תיאור הטיול"
                                value={tripMeta.description}
                                onChange={(e) => setTripMeta({ ...tripMeta, description: e.target.value })}
                                className="mt-6 w-full border p-4 rounded-lg min-h-[140px] resize-none"
                            />
                        </div>

                        {/* Stops List */}
                        <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#111827]">תחנות המסלול</h2>
                                <button
                                    onClick={() => setShowAddPanel(true)}
                                    className="flex items-center gap-2 bg-[#111827] text-[#ffffff] px-4 py-2 rounded-lg font-medium hover:bg-[#1f2937] transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    הוסף תחנה
                                </button>
                            </div>

                            {tripStops.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-[#e5e7eb] rounded-lg">
                                    <MapPin className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
                                    <p className="text-[#6b7280] mb-4">עדיין אין תחנות במסלול</p>
                                    <button
                                        onClick={async () => {
                                            setShowAddPanel(true)
                                            await loadSuggestions()
                                        }}
                                        className="bg-[#111827] text-[#ffffff] px-6 py-3 rounded-lg font-medium hover:bg-[#1f2937] transition-colors"
                                    >
                                        התחל להוסיף תחנות
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {tripStops.map((stop, index) => (
                                        <div
                                            key={`${stop.itemType}-${stop.place?.id ?? stop.route?.id}-${index}`}
                                            className="border border-[#e5e7eb] rounded-lg p-4 hover:border-[#d1d5db] transition-all"
                                        >
                                            <div className="flex gap-4">
                                                {/* Drag Handle & Order Controls */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <button className="p-1 text-[#6b7280] hover:text-[#111827] cursor-grab">
                                                        <GripVertical className="w-5 h-5" />
                                                    </button>
                                                    <div className="w-8 h-8 rounded-full bg-[#111827] text-[#ffffff] flex items-center justify-center font-bold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            onClick={() => moveUp(index)}
                                                            disabled={index === 0}
                                                            className={`p-1 ${index === 0 ? 'text-[#d1d5db]' : 'text-[#6b7280] hover:text-[#111827]'}`}
                                                        >
                                                            <ChevronUp className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => moveDown(index)}
                                                            disabled={index === tripStops.length - 1}
                                                            className={`p-1 ${index === tripStops.length - 1 ? 'text-[#d1d5db]' : 'text-[#6b7280] hover:text-[#111827]'}`}
                                                        >
                                                            <ChevronDown className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Stop Image */}
                                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={`data:image/jpeg;base64,${stop.itemType === 1 ? stop.place?.images.find(p => p.isMain)?.image : stop.route?.images.find(r => r.isMain)?.image}`}
                                                        alt={stop.itemType === 1 ? stop.place?.name : stop.route?.name}
                                                        className="w-full h-full object-cover" />
                                                </div>

                                                {/* Stop Info */}
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-[#111827] mb-2">{stop.itemType === 1 ? stop.place?.name : stop.route?.name}</h3>
                                                    <div className="flex items-center gap-3 text-sm text-[#6b7280] mb-2">
                                                        <span>
                                                            {stop.itemType === 1
                                                                ? stop.place?.region?.regionName ?? "ללא"
                                                                : stop.route?.region?.regionName ?? "ללא"}
                                                        </span>
                                                        <span>•</span>
                                                        <span className={`inline-block px-2 py-1 rounded text-xs ${getDifficultyColor(stop.itemType === 1 ? "ללא" : stop.route?.difficulty.name)}`}>
                                                            {stop.itemType === 1 ? "ללא" : stop.route?.difficulty.name}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{formatDuration(stop.estimatedDuration)}</span>
                                                    </div>
                                                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(stop.itemType === 1 ? stop.place?.type.typeName : stop.route?.type.typeName)}`}>
                                                        {stop.itemType === 1 ? stop.place?.type.typeName : stop.route?.type.typeName}
                                                    </span>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeStop(stop.id)}
                                                    className="p-2 text-[#dc2626] hover:bg-[#fee2e2] rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>


                                            </div>
                                            {index < tripStops.length - 1 && (
                                                <div className="mt-4 flex items-center gap-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-3 py-2 w-fit">

                                                    <span className="text-xs text-[#6b7280] font-medium">
                                                        מעבר ליעד הבא:
                                                    </span>

                                                    <select
                                                        value={stop.mode ?? 1}
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value);

                                                            setTripStops(prev => {
                                                                const updated = [...prev];
                                                                updated[index] = {
                                                                    ...updated[index],
                                                                    mode: value
                                                                };
                                                                return updated;
                                                            });
                                                        }}
                                                        className="bg-transparent text-sm font-medium text-[#111827] outline-none cursor-pointer"
                                                    >
                                                        <option value={1}> רכב</option>
                                                        <option value={0}> הליכה</option>
                                                        <option value={2}> אופניים</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                    ))}

                                </div>

                            )}
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg p-6">
                            <h2 className="text-xl font-bold text-[#111827] mb-4">מפת המסלול</h2>
                            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg aspect-video flex items-center justify-center">
                                <div className="text-center">
                                    <Map className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
                                    <div className="text-[#6b7280]">מפה אינטראקטיבית - עדכון בזמן אמת</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions */}
                    <div className="space-y-6">
                        {/* Save Actions */}
                        <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-[#111827] mb-4">פעולות</h3>
                            <div className="space-y-3">
                                {/* תצוגה מקדימה */}
                                <button
                                    className="w-full flex items-center justify-center gap-2 bg-[#f3f4f6] text-[#111827] py-3 rounded-lg font-bold hover:bg-[#e5e7eb] transition-colors border border-[#d1d5db]"
                                >
                                    <Map className="w-4 h-4" />
                                    תצוגה מקדימה
                                </button>
                                <button
                                    className="w-full flex items-center justify-center gap-2 bg-[#111827] text-[#ffffff] py-3 rounded-lg font-bold hover:bg-[#1f2937] transition-colors"
                                    onClick={() => saveTrip(false)}
                                >
                                    <Save className="w-4 h-4" />
                                    שמור אצלי
                                </button>
                                <button
                                    className="w-full flex items-center justify-center gap-2 border-2 border-[#111827] text-[#111827] py-3 rounded-lg font-bold hover:bg-[#f9fafb] transition-colors"
                                    onClick={() => saveTrip(true)}
                                >
                                    <Send className="w-4 h-4" />
                                    שלח לאישור
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
                                <h4 className="text-sm font-bold text-[#6b7280] mb-3">טיפים</h4>
                                <ul className="space-y-2 text-sm text-[#6b7280]">
                                    <li>• גרור תחנות לשינוי הסדר</li>
                                    <li>• השתמש בחצים למעלה/למטה</li>
                                    <li>• הוסף תחנות מהרשימה</li>
                                    <li>• שמור לעיתים קרובות</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Stop Panel */}
            {
                showAddPanel && (
                    <div className="fixed inset-0 bg-[#000000]/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-[#ffffff] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                            {/* Panel Header */}
                            <div className="p-6 border-b border-[#e5e7eb]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-[#111827]">הוסף תחנה למסלול</h2>
                                    <button
                                        onClick={() => setShowAddPanel(false)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-[#f3f4f6] rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-[#111827]" />
                                    </button>
                                </div>

                                {/* Search & Filter */}
                                <div className="flex gap-3">
                                    <div className="flex-1 relative">
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                                        <input
                                            type="text"
                                            placeholder="חפש לפי שם או אזור..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pr-10 px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
                                        />
                                    </div>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
                                    >
                                        <option value="">כל הסוגים</option>
                                        <option value="תצפית">תצפית</option>
                                        <option value="מים">מים</option>
                                        <option value="הליכה">הליכה</option>
                                        <option value="אוכל">אוכל</option>
                                        <option value="תרבות">תרבות</option>
                                    </select>
                                </div>
                            </div>

                            {/* Places List */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {loadingSuggestions && (
                                        <div className="text-center py-8 text-gray-500">
                                            טוען המלצות...
                                        </div>
                                    )}
                                    {suggestedStops.map(stop => (
                                        <div
                                            key={`${stop.itemId}-${stop.itemType}`}
                                            className="border border-[#e5e7eb] rounded-lg p-4 hover:border-[#d1d5db] transition-all"
                                        >
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={`data:image/jpeg;base64,${stop.mainImage}`}
                                                        alt={stop.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-[#111827] mb-2">{stop.name}</h3>
                                                    <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-2">
                                                        <span>{stop.regionName}</span>
                                                        <span>•</span>
                                                        <span className={`inline-block px-2 py-1 rounded text-xs ${stop.difficulty != null ? getDifficultyColor(stop.difficulty as any) : getDifficultyColor("ללא")}`}>
                                                            {stop.difficulty || "ללא"}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{formatDuration(stop.estimatedDuration)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(stop.typeName)}`}>
                                                            {stop.typeName}
                                                        </span>
                                                        <button
                                                            onClick={() => addSuggestedStop(stop)}
                                                            className="flex items-center gap-1 text-[#111827] hover:bg-[#f3f4f6] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                            הוסף
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {!loadingSuggestions && suggestedStops.length === 0 && (
                                    <div className="text-center py-12">
                                        <Filter className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
                                        <p className="text-[#6b7280]">לא נמצאו תוצאות</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}