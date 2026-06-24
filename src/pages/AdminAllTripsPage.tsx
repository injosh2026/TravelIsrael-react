import { useEffect, useState } from 'react';
import { Plus, Search, BarChart3, Eye, MapPin, User, CheckCircle2, XCircle, AlertCircle, Star, Bookmark, TrendingUp, X } from 'lucide-react';
import type { AllTripType } from '../types/adminAllTrip.type';
import { getAdminAllTrips } from '../services/admin.service';
import { useNavigate } from 'react-router-dom';
import { getRecommendation, getReviewChecks } from '../utils/getForAdmin';
import { getStatusBadge } from '../utils/getStatusBadge';

export default function AdminAllTripsPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRegion, setFilterRegion] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [statsModal, setStatsModal] = useState<AllTripType | null>(null);
    const [reviewModal, setReviewModal] = useState<AllTripType | null>(null);
    const [rejectReasonModal, setRejectReasonModal] = useState<AllTripType | null>(null);

    const [trips, setTrips] = useState<AllTripType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTrips = async () => {
        try {
            const data = await getAdminAllTrips()
            setTrips(data)
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTrips()
    }, [])

    const regions = ['גליל עליון', 'גליל תחתון', 'נגב', 'יהודה', 'שפלה', 'ירושלים', 'מרכז'];
    const statuses = [
        { value: 'approved', label: 'מאושר' },
        { value: 'rejected', label: 'נדחה' },
        { value: 'pending', label: 'ממתין' }
    ];
    const types = ['משפחתי', 'אתגרי', 'קולינרי', 'טבע', 'ספורט', 'תרבות'];

    const filteredTrips = trips.filter(trip => {
        const matchesSearch =
            trip.name.includes(searchTerm) ||
            trip.creator.includes(searchTerm) ||
            trip.region?.includes(searchTerm);
        const matchesRegion = !filterRegion || trip.region === filterRegion;
        const matchesStatus = !filterStatus || trip.status === filterStatus;
        const matchesType = !filterType || trip.type === filterType;
        return matchesSearch && matchesRegion && matchesStatus && matchesType;
    });

    const getRowBackground = (trip: AllTripType) => {
        if (trip.status === 'approved') return 'bg-[#f0fffb]';
        if (trip.status === 'rejected') return 'bg-[#fef2f2]';
        if (trip.status === 'pending') return 'bg-[#fffef0]';
        return '';
    };

    type ActionMode = 'disabled' | 'review' | 'rejected';

    const getActionMode = (trip: AllTripType): ActionMode => {
        if (trip.status === 'approved') return 'disabled';
        if (trip.status === 'pending') return 'review';
        if (trip.status === 'rejected') return 'rejected';
        return 'review';
    };

    const getActionIcon = (trip: AllTripType) => {
        const mode = getActionMode(trip);

        if (mode === 'disabled') return CheckCircle2; // מאושר
        if (mode === 'review') return AlertCircle;     // ממתין
        if (mode === 'rejected') return XCircle;       // נדחה

        return AlertCircle;
    };

    const handleClick = ({ trip }: { trip: AllTripType }) => {
        const mode = getActionMode(trip);

        if (mode === 'disabled') return;

        if (mode === 'review') {
            openReviewModal(trip);
        }

        if (mode === 'rejected') {
            openRejectReasonModal(trip);
        }
    };

    const openReviewModal = (trip: AllTripType) => {
        setReviewModal(trip);
    };

    const openRejectReasonModal = (trip: AllTripType) => {
        setRejectReasonModal(trip);
    };

    const handleViewStats = (trip: AllTripType) => {
        setStatsModal(trip);
    };


    const handleNavigation = (trip: AllTripType): void => {
        navigate(`/admin/trips/${trip.id}`)
    };

    if (loading) {
        return <div className="p-10 text-center">טוען...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-[#f9fafb]" dir="rtl">
            {/* Header */}
            <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 ">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-light text-[#111827] mb-1">כל הטיולים</h1>
                            <p className="text-[#6b7280]">נהל את כל הטיולים במערכת</p>
                        </div>
                        <button className="flex items-center gap-2 bg-[#111827] text-[#ffffff] px-6 py-3 rounded-lg font-medium hover:bg-[#1f2937] transition-colors">
                            <Plus className="w-5 h-5" />
                            הוסף טיול
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#f0fffb] border border-[#86efac] rounded-lg p-4">
                            <div className="text-2xl font-bold text-[#059669] mb-1">
                                {trips.filter(t => t.status === 'approved').length}
                            </div>
                            <div className="text-sm text-[#047857]">טיולים מאושרים</div>
                        </div>
                        <div className="bg-[#fffef0] border border-[#fde68a] rounded-lg p-4">
                            <div className="text-2xl font-bold text-[#d97706] mb-1">
                                {trips.filter(t => t.status === 'pending').length}
                            </div>
                            <div className="text-sm text-[#b45309]">ממתינים לאישור</div>
                        </div>
                        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
                            <div className="text-2xl font-bold text-[#dc2626] mb-1">
                                {trips.filter(t => t.status === 'rejected').length}
                            </div>
                            <div className="text-sm text-[#b91c1c]">נדחו</div>
                        </div>
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4">
                            <div className="text-2xl font-bold text-[#2563eb] mb-1">
                                {trips.length}
                            </div>
                            <div className="text-sm text-[#1e40af]">סה"כ טיולים</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            <input
                                type="text"
                                placeholder="חפש טיול..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
                            />
                        </div>

                        {/* Region Filter */}
                        <select
                            value={filterRegion}
                            onChange={(e) => setFilterRegion(e.target.value)}
                            className="px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
                        >
                            <option value="">כל האזורים</option>
                            {regions.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
                        >
                            <option value="">כל הסטטוסים</option>
                            {statuses.map(status => (
                                <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                        </select>

                        {/* Type Filter */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
                        >
                            <option value="">כל הסוגים</option>
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="mb-6 text-sm text-[#6b7280]">
                    מציג {filteredTrips.length} מתוך {trips.length} טיולים
                </div>

                {/* Table */}
                <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg overflow-hidden">
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                                <tr>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">שם הטיול</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">יוצר</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">אזור</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">סטטוס</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">פופולריות</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">פעולות</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e5e7eb]">
                                {filteredTrips.map(trip => (
                                    <tr key={trip.id} className={`hover:bg-[#f9fafb] transition-colors ${getRowBackground(trip)}`}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#111827] transition-colors flex items-center gap-2">
                                                {trip.name}
                                            </div>
                                            <div className="text-xs text-[#6b7280] mt-1">{trip.type}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-2">
                                                <User className="w-4 h-4 text-[#6b7280] mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium text-[#111827]">{trip.creator}</div>
                                                    <div className="text-xs text-[#6b7280]">{trip.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-[#6b7280]">
                                                <MapPin className="w-4 h-4" />
                                                <span>{trip.region || 'לא צויין'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(trip.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {trip.popularity === 'high' && (
                                                <div className="flex items-center gap-1 text-[#059669]">
                                                    <TrendingUp className="w-4 h-4" />
                                                    <span className="text-sm font-medium">גבוהה</span>
                                                </div>
                                            )}
                                            {trip.popularity === 'medium' && (
                                                <span className="text-sm text-[#6b7280]">בינונית</span>
                                            )}
                                            {trip.popularity === 'low' && (
                                                <span className="text-sm text-[#9ca3af]">נמוכה</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewStats(trip)}
                                                    className="p-2 text-[#7c3aed] hover:bg-[#ede9fe] rounded-lg transition-colors"
                                                    title="סטטיסטיקות"
                                                >
                                                    <BarChart3 className="w-4 h-4" />
                                                </button>
                                                {/* <button className="p-2 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg transition-colors" title="ערוך">
                                                    <Eye className="w-4 h-4" />
                                                </button> */}
                                                {/* <ActionButton trip={trip} /> */}
                                                {(() => {
                                                    const ActionIcon = getActionIcon(trip);
                                                    return (
                                                        <button
                                                            onClick={() => handleClick({ trip })}
                                                            disabled={getActionMode(trip) === 'disabled'}
                                                            className={`p-2 rounded-lg transition-colors ${getActionMode(trip) === 'disabled'
                                                                ? 'text-gray-400 cursor-not-allowed'
                                                                : 'text-[#6b7280] hover:bg-[#e5e7eb]'
                                                                }`}
                                                            title="התרעות מערכת"
                                                        >
                                                            <ActionIcon className="w-4 h-4" />
                                                        </button>
                                                    );
                                                })()}
                                                <button
                                                    onClick={() => handleNavigation(trip)}
                                                    className="p-2 text-[#2563eb] hover:bg-[#dbeafe] rounded-lg"
                                                    title="צפה בפרטי הטיול"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden divide-y divide-[#e5e7eb]">
                        {filteredTrips.map(trip => (
                            <div key={trip.id} className={`p-4 ${getRowBackground(trip)}`}>
                                
                                <div className="mb-3">

                                    
                                    <div className="font-bold text-[#111827] mb-1">
                                        <div className="font-bold text-[#111827] transition-colors flex items-center gap-2">
                                            {trip.name}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getStatusBadge(trip.status)}
                                        <span className="text-xs text-[#6b7280]">{trip.type}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                    <div>
                                        <span className="text-[#6b7280]">יוצר: </span>
                                        <span className="font-medium">{trip.creator}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#6b7280]">אזור: </span>
                                        <span className="font-medium">{trip.region || 'לא צויין'}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewStats(trip)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-[#7c3aed] bg-[#ede9fe] rounded-lg text-sm"
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                        סטטיסטיקות
                                    </button>
                                    {(() => {
                                        const ActionIcon = getActionIcon(trip);
                                        return (
                                            <button
                                                onClick={() => handleClick({ trip })}
                                                disabled={getActionMode(trip) === 'disabled'}
                                                className={`px-3 py-2 rounded-lg transition-colors ${getActionMode(trip) === 'disabled'
                                                    ? 'text-gray-400 bg-[#f3f4f6] cursor-not-allowed'
                                                    : 'text-[#6b7280] bg-[#f3f4f6]'
                                                    }`}
                                            >
                                                <ActionIcon className="w-4 h-4" />
                                            </button>
                                        );
                                    })()}
                                    <button
                                        onClick={() => handleNavigation(trip)}
                                        className="px-3 py-2 text-[#2563eb] bg-[#dbeafe] rounded-lg"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Modal */}
            {statsModal && (
                <div className="fixed inset-0 bg-[#000000]/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#ffffff] rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-[#111827]">סטטיסטיקות טיול</h3>
                            <button
                                onClick={() => setStatsModal(null)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-[#f3f4f6] rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-[#111827]" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-[#111827] mb-2">{statsModal.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                <MapPin className="w-4 h-4" />
                                <span>{statsModal.region || 'לא צוין'}</span>
                                <span>•</span>
                                <span>{statsModal.type}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-[#fffef0] border border-[#fde68a] rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-[#d97706]" />
                                    <span className="text-sm text-[#78350f]">דירוג</span>
                                </div>
                                <div className="text-3xl font-bold text-[#d97706]">
                                    {statsModal.rating > 0 ? statsModal.rating : '-'}
                                </div>
                                <div className="text-xs text-[#78350f] mt-1">ממוצע ביקורות</div>
                            </div>

                            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bookmark className="w-5 h-5 text-[#2563eb]" />
                                    <span className="text-sm text-[#1e3a8a]">שמירות</span>
                                </div>
                                <div className="text-3xl font-bold text-[#2563eb]">{statsModal.saves}</div>
                                <div className="text-xs text-[#1e3a8a] mt-1">משתמשים שמרו</div>
                            </div>

                            <div className="bg-[#f0fffb] border border-[#86efac] rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Eye className="w-5 h-5 text-[#059669]" />
                                    <span className="text-sm text-[#065f46]">צפיות</span>
                                </div>
                                <div className="text-3xl font-bold text-[#059669]">{statsModal.views}</div>
                                <div className="text-xs text-[#065f46] mt-1">סה"כ צפיות</div>
                            </div>
                        </div>

                        <div className="bg-[#f9fafb] rounded-lg p-4">
                            <h5 className="font-bold text-[#111827] mb-3">פופולריות</h5>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-[#6b7280]">רמת פופולריות</span>
                                        <span className="font-bold text-[#111827]">
                                            {statsModal.popularity === 'high' ? 'גבוהה' :
                                                statsModal.popularity === 'medium' ? 'בינונית' : 'נמוכה'}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${statsModal.popularity === 'high' ? 'bg-[#059669] w-full' :
                                                statsModal.popularity === 'medium' ? 'bg-[#d97706] w-2/3' : 'bg-[#dc2626] w-1/3'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {reviewModal && (() => {
                const checks = getReviewChecks(reviewModal);
                const recommendation = getRecommendation(checks);

                return (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
                            <div className="flex items-center justify-between mb-6 w-full bg-gray-50 p-5 border-b">
                                <div >
                                    <h2 className="text-xl font-bold text-gray-800">
                                        בדיקת טיול
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {reviewModal.name}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setReviewModal(null)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-[#f3f4f6] rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#111827]" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">

                                {/* Basic Info */}
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p><b>יוצר:</b> {reviewModal.creator}</p>
                                    <p><b>אזור:</b> {reviewModal.region || 'לא צוין'}</p>
                                    <p><b>סוג:</b> {reviewModal.type}</p>
                                    <p><b>מספר תחנות:</b> {reviewModal.stops}</p>
                                </div>

                                {/* Checks */}
                                <div className="border rounded-lg p-4 space-y-2">
                                    <p className="font-semibold text-gray-700 mb-2">
                                        בדיקות מערכת
                                    </p>

                                    {checks.map((c, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span>{c.label}</span>
                                            <span className={c.ok ? 'text-green-600' : 'text-red-500'}>
                                                {c.ok ? '✔' : '✖'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Recommendation */}
                                <div className={`p-3 rounded-lg bg-gray-50 ${recommendation.color}`}>
                                    <b>המלצה:</b> {recommendation.text}
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })()}

            {rejectReasonModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-[500px]">
                        <div className="flex items-center rounded-lg justify-between mb-6 w-full bg-gray-50 p-5 border-b">
                            <h2 className="text-xl font-bold mb-4">
                                סיבת הדחייה
                            </h2>
                            <button
                                onClick={() => setRejectReasonModal(null)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-[#f3f4f6] rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-[#111827]" />
                            </button>
                        </div>


                        {/* Body */}
                        <div className="p-5 space-y-4">

                            {/* Info box */}
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><b>יוצר:</b> {rejectReasonModal.creator}</p>
                                <p><b>אזור:</b> {rejectReasonModal.region || 'לא צוין'}</p>
                                <p><b>סוג:</b> {rejectReasonModal.type}</p>
                                <p><b>מספר תחנות:</b> {rejectReasonModal.stops}</p>
                            </div>

                            {/* Reason box */}
                            <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                                <p className="text-sm font-semibold text-red-600 mb-2">
                                    סיבת הדחייה
                                </p>

                                <p className="text-gray-700">
                                    {rejectReasonModal.rejectReason || 'לא צוינה סיבה'}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}