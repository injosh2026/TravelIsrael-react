import { useEffect, useState } from 'react';
import { Search, CheckCircle2, Eye, MapPin, User, Calendar, MessageSquare, XCircle } from 'lucide-react';
import { getDifficultyColor } from '../utils/getDifficultyColor';
import type { PendingTripType } from '../types/adminPendingTrip.type';
import { getAdminPendingTrips } from '../services/admin.service';
import { approveDayTripWithItems } from '../services/trip.service';
import { useNavigate } from 'react-router-dom';

export default function AdminPendingTripsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterType, setFilterType] = useState('');
  const [rejectModal, setRejectModal] = useState<PendingTripType | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const [pendingTrips, setPendingTrips] = useState<PendingTripType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const regions = ['גליל עליון', 'גליל תחתון', 'נגב', 'יהודה', 'שפלה', 'ירושלים', 'מרכז'];
  const difficulties = ['קל', 'קל-בינוני', 'בינוני', 'בינוני-קשה', 'קשה'];
  const types = ['טיול יום', 'טיול לילה'];

  const loadPendingTrips = async () => {
    try {
      const data = await getAdminPendingTrips()
      setPendingTrips(data)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPendingTrips()
  }, [])

  const filteredTrips = pendingTrips.filter(trip => {
    const matchesSearch =
      trip.name.includes(searchTerm) ||
      trip.creator.includes(searchTerm) ||
      trip.email.includes(searchTerm) ||
      trip.region.includes(searchTerm);
    const matchesRegion = !filterRegion || trip.region === filterRegion;
    const matchesDifficulty = !filterDifficulty || trip.difficulty === filterDifficulty;
    const matchesType = !filterType || trip.type === filterType;
    return matchesSearch && matchesRegion && matchesDifficulty && matchesType;
  });

  const handleApprove = async (trip: PendingTripType) => {
    try {
      await approveDayTripWithItems(trip.id, { approvalStatus: 2, rejectReason: null });
      // עדכון UI בלי ריפרש
      setPendingTrips(prev => prev.filter(t => t.id !== trip.id));
    } catch (err) {
      console.error(err);
      console.log('שגיאה באישור טיול');

    }
    console.log(`הטיול "${trip.name}" אושר בהצלחה!`);
  };

  const handleReject = (trip: PendingTripType) => {
    setRejectModal(trip);
    setRejectReason('');
  };

  const confirmReject = async () => {
    try {
      if (!rejectModal) return;
      await approveDayTripWithItems(rejectModal.id, { approvalStatus: 3, rejectReason });
      setPendingTrips(prev => prev.filter(t => t.id !== rejectModal.id));
      console.log(`הטיול "${rejectModal.name}" נדחה בהצלחה!`);
      setRejectModal(null);
      setRejectReason('');
    } catch (err) {
      console.error(err);
      console.log('שגיאה בדחיית טיול');
    }

  };

  const handleNavigation = (trip: PendingTripType): void => {
    navigate(`/admin/trips/${trip.id}`)
  };

  if (loading) {
    return <div className="text-center py-10">טוען טיולים...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }


  return (
    <div className="min-h-screen bg-[#f9fafb]" dir="rtl">
      {/* Header */}
      <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 ">
          <div className="flex items-center mb-4">
            <div>
              <h1 className="text-3xl font-light text-[#111827] mb-1">טיולים ממתינים לאישור</h1>
              <p className="text-[#6b7280]">בדוק ואשר או דחה טיולים שהוגשו</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#6b7280]">ממתינים:</span>
              <span className="font-bold text-[#111827]">{pendingTrips.length}</span>
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
                placeholder="חפש לפי שם, יוצר, אזור..."
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

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
            >
              <option value="">כל רמות הקושי</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
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
        {/* Results Count */}
        <div className="mb-6 text-sm text-[#6b7280]">
          מציג {filteredTrips.length} מתוך {pendingTrips.length} טיולים
        </div>

        {/* Table */}
        <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <tr>
                  <th className="text-right px-10 py-4 text-sm font-medium text-[#6b7280]">שם הטיול</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">יוצר</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">אזור</th>
                  <th className="text-right px-4 py-4 text-sm font-medium text-[#6b7280]">קושי</th>
                  <th className="text-right px-2 py-4 text-sm font-medium text-[#6b7280]">תחנות</th>
                  <th className="text-right px-12 py-4 text-sm font-medium text-[#6b7280]">תאריך הגשה</th>
                  <th className="text-right px-4 py-4 text-sm font-medium text-[#6b7280]">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {filteredTrips.map(trip => (
                  <tr key={trip.id} className="hover:bg-[#f9fafb] transition-colors">
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
                        <span>{trip.region}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty)}`}>
                        {trip.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-[#111827]">{trip.stops}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.submittedDate.toString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleApprove(trip)}
                          className="p-2 hover:bg-[#d1fae5] text-[#059669] rounded-lg transition-colors"
                          title="אשר"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleReject(trip)}
                          className="p-2 text-[#dc2626] hover:bg-[#fee2e2] rounded-lg"
                          title="דחה"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
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

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden divide-y divide-[#e5e7eb]">
            {filteredTrips.map(trip => (
              <div key={trip.id} className="p-4">
                <div className="mb-3">
                  <div className="font-bold text-[#111827] text-lg mb-1 inline-flex items-center gap-2">
                    {trip.name}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty)}`}>
                      {trip.difficulty}
                    </span>
                    <span className="text-xs text-[#6b7280]">{trip.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-[#6b7280]">יוצר: </span>
                      <span className="font-medium">{trip.creator}</span>
                    </div>
                    <div>
                      <span className="text-[#6b7280]">אזור: </span>
                      <span className="font-medium">{trip.region || 'לא צויין'}</span>
                    </div>
                  
                  <div>
                    <span className="text-[#6b7280]">תחנות: </span>
                    <span className="font-medium">{trip.stops}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(trip)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#d1fae5] text-[#059669] rounded-lg text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    אשר
                  </button>
                  <button
                    onClick={() => handleReject(trip)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-[#dc2626] bg-[#fee2e2] rounded-lg text-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    דחה
                  </button>
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

          {/* Empty State */}
          {filteredTrips.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
              <p className="text-[#6b7280]">אין טיולים ממתינים</p>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-[#000000]/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-lg max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#fee2e2] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-[#dc2626]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#111827] mb-2">דחיית טיול</h3>
                <p className="text-[#6b7280] text-sm mb-4">
                  אתה עומד לדחות את הטיול "{rejectModal.name}"
                </p>

                <label className="block text-sm font-medium text-[#6b7280] mb-2">
                  סיבת הדחייה (אופציונלי)
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="הסבר למשתמש מדוע הטיול נדחה..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmReject}
                className="flex-1 bg-[#dc2626] text-[#ffffff] py-3 rounded-lg font-medium hover:bg-[#b91c1c] transition-colors"
              >
                דחה טיול
              </button>
              <button
                onClick={() => setRejectModal(null)}
                className="flex-1 border-2 border-[#e5e7eb] text-[#6b7280] py-3 rounded-lg font-medium hover:bg-[#f9fafb] transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}