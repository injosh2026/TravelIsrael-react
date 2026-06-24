import { useEffect, useState } from 'react';
import { Plus, Search, MapPin, Filter, X, AlertCircle, User, TrendingUp, MessageSquare, Bookmark, Eye, Star } from 'lucide-react';
import { getStatusBadge } from '../utils/getStatusBadge';
import { getActionsByStatus, getMobileActions } from '../utils/getActions';
import type { AllPlacesType } from '../types/adminPlaces.type';
import { useNavigate } from 'react-router-dom';
import { getAdminAllPlaces } from '../services/admin.service';
import { approvePlace } from '../services/place.service';
import { approveRoute } from '../services/route.service';

export default function AdminPlacesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [deleteModal, setDeleteModal] = useState<AllPlacesType | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('approved');
  const [rejectModal, setRejectModal] = useState<AllPlacesType | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [statsModal, setStatsModal] = useState<AllPlacesType | null>(null);
  const [rejectReasonModal, setRejectReasonModal] = useState<AllPlacesType | null>(null);


  const [places, setPlaces] = useState<AllPlacesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlaces = async () => {
    try {
      const data = await getAdminAllPlaces()
      setPlaces(data)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlaces()
  }, [])

  const tabs = [
    { label: 'מאושרים', value: 'approved' },
    { label: 'ממתינים לאישור', value: 'pending' },
    { label: 'נדחו', value: 'rejected' },
  ];

  const types = ['תצפית', 'מים', 'הליכה', 'מסעדה', 'אטרקציה', 'טבע', 'תרבות'];
  const regions = ['גליל עליון', 'גליל תחתון', 'נגב', 'יהודה', 'שפלה', 'ירושלים', 'מרכז'];
  const showPopularity = activeTab === 'approved';

  const filteredPlaces = places.filter(place => {
    const matchesStatus = place.status === activeTab;
    const matchesSearch = place.name.includes(searchTerm) || (place.region?.includes(searchTerm) ?? false);
    const matchesType = !filterType || place.type === filterType;
    const matchesRegion = !filterRegion || place.region === filterRegion;
    return matchesStatus && matchesSearch && matchesType && matchesRegion;
  });

  const handleEdit = (place: AllPlacesType) => console.log('edit', place.id);
  const handleRestore = (place: AllPlacesType) => console.log('restore', place.id);

  const openRejectReasonModal = (place: AllPlacesType) => {
    setRejectReasonModal(place);
  };

  const handleReject = (place: AllPlacesType) => {
    setRejectModal(place);
    setRejectReason('');
  };

  const handleViewStats = (place: AllPlacesType) => {
    setStatsModal(place);
  };

  const handleDelete = (place: AllPlacesType) => {
    setDeleteModal(place);
  };

  const handleView = (place: AllPlacesType): void => {
    if (place.itemType == "route")
      navigate(`/admin/routes/${place.id}`)
    else
      navigate(`/admin/places/${place.id}`)
  };

  const confirmDelete = () => {
    console.log('Deleting place:', deleteModal?.id);
    setDeleteModal(null);
  };

  const confirmReject = async () => {
    try {
      if (!rejectModal) return;
      if (rejectModal.itemType == "route")
        await approveRoute(rejectModal.id, { approvalStatus: 3, rejectReason });
      else
        await approvePlace(rejectModal.id, { approvalStatus: 3, rejectReason });
      setPlaces(prev => prev.map(item => item.id === rejectModal.id && item.itemType === rejectModal.itemType ? { ...item, status: "rejected", rejectReason } : item));

      console.log(`הטיול "${rejectModal.name}" נדחה בהצלחה!`);
      setRejectModal(null);
      setRejectReason('');
    } catch (err) {
      console.error(err);
      console.log('שגיאה בדחיית טיול');
    }

  };


  const handleApprove = async (place: AllPlacesType) => {
    try {
      if (place.itemType == "route")
        await approveRoute(place.id, { approvalStatus: 2, rejectReason: null });
      else
        await approvePlace(place.id, { approvalStatus: 2, rejectReason: null });

      // עדכון UI בלי ריפרש
      setPlaces(prev =>
        prev.map(item => {
          console.log("COMPARE:", item.id, place.id, item.itemType, place.itemType);

          return item.id === place.id && item.itemType === place.itemType
            ? { ...item, status: "approved", rejectReason: null }
            : item;
        })
      );
      console.log(`הטיול "${place.name}" אושר בהצלחה!`);
    } catch (err) {
      console.error(err);
      console.log('שגיאה באישור טיול');
    }
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-light text-[#111827] mb-1">ניהול מקומות</h1>
              <p className="text-[#6b7280]">נהל את כל המקומות במערכת</p>
            </div>
            <button className="flex items-center gap-2 bg-[#111827] text-[#ffffff] px-6 py-3 rounded-lg font-medium hover:bg-[#1f2937] transition-colors">
              <Plus className="w-5 h-5" />
              הוסף מקום
            </button>
          </div>
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#f0fffb] border border-[#86efac] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#059669] mb-1">
                {places.filter(p => p.status === 'approved').length}
              </div>
              <div className="text-sm text-[#047857]">מקומות מאושרים</div>
            </div>
            <div className="bg-[#fffef0] border border-[#fde68a] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#d97706] mb-1">
                {places.filter(p => p.status === 'pending').length}
              </div>
              <div className="text-sm text-[#b45309]">ממתינים לאישור</div>
            </div>
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#dc2626] mb-1">
                {places.filter(p => p.status === 'rejected').length}
              </div>
              <div className="text-sm text-[#b91c1c]">נדחו</div>
            </div>
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#2563eb] mb-1">
                {places.length}
              </div>
              <div className="text-sm text-[#1e40af]">סה"כ מקומות</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-2">
            {tabs.map(tab => {
              const count = places.filter(p => p.status === tab.value).length;

              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as any)}
                  className={`px-4 py-3 text-sm font-medium transition border-b-2
              ${activeTab === tab.value
                      ? 'border-[#111827] text-[#111827]'
                      : 'border-transparent text-[#6b7280] hover:text-[#111827]'
                    }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="חפש לפי שם או אזור..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:border-[#111827] transition-colors"
              />
            </div>

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
          </div>

          {/* Active Filters */}
          {(searchTerm || filterType || filterRegion) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[#6b7280]">סינונים פעילים:</span>
              {searchTerm && (
                <div className="flex items-center gap-1 bg-[#f3f4f6] px-3 py-1 rounded-full text-sm">
                  <span>חיפוש: {searchTerm}</span>
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3 text-[#6b7280]" />
                  </button>
                </div>
              )}
              {filterType && (
                <div className="flex items-center gap-1 bg-[#f3f4f6] px-3 py-1 rounded-full text-sm">
                  <span>סוג: {filterType}</span>
                  <button onClick={() => setFilterType('')}>
                    <X className="w-3 h-3 text-[#6b7280]" />
                  </button>
                </div>
              )}
              {filterRegion && (
                <div className="flex items-center gap-1 bg-[#f3f4f6] px-3 py-1 rounded-full text-sm">
                  <span>אזור: {filterRegion}</span>
                  <button onClick={() => setFilterRegion('')}>
                    <X className="w-3 h-3 text-[#6b7280]" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-[#6b7280]">
            מציג {filteredPlaces.length} מתוך {places.length} מקומות
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">תמונה</th>
                  <th className="text-right px-4 py-4 text-sm font-medium text-[#6b7280]">שם המקום</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-[#6b7280]">יוצר</th>
                  <th className="text-right px-10 py-4 text-sm font-medium text-[#6b7280]">אזור</th>
                  <th className="text-right px-8 py-4 text-sm font-medium text-[#6b7280]">סטטוס</th>
                  {showPopularity && (
                    <th className="text-right px-2 py-4 text-sm font-medium text-[#6b7280]">פופולריות</th>
                  )}
                  <th className="text-right px-8 py-4 text-sm font-medium text-[#6b7280]">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {filteredPlaces.map(place => (


                  <tr key={`${place.type}-${place.id}`} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden">
                        <img
                          src={`data:image/jpeg;base64,${place.image}`}
                          alt={place.name}
                          className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-[#111827] transition-colors">
                        {place.name}
                        <div className="text-xs text-[#6b7280] mt-1">{place.type}</div>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-[#6b7280] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-[#111827]">{place.creator}</div>
                          <div className="text-xs text-[#6b7280]">{place.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <MapPin className="w-4 h-4" />
                        <span>{place.region || 'לא צויין'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium">
                        {getStatusBadge(place.status)}
                      </span>
                    </td>
                    {showPopularity && (
                      <td className="px-2 py-4">
                        {place.popularity === 'high' && (
                          <div className="flex items-center gap-1 text-[#059669]">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">גבוהה</span>
                          </div>
                        )}
                        {place.popularity === 'medium' && (
                          <span className="text-sm text-[#6b7280]">בינונית</span>
                        )}
                        {place.popularity === 'low' && (
                          <span className="text-sm text-[#9ca3af]">נמוכה</span>
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getActionsByStatus(place as AllPlacesType, {
                          onView: handleView,
                          onApprove: handleApprove,
                          onReject: handleReject,
                          onEdit: handleEdit,
                          onDelete: handleDelete,
                          onRestore: handleRestore,
                          onStats: handleViewStats,
                          onViewReject: openRejectReasonModal
                        }).map((action, index) => {
                          const Icon = action.icon;

                          return (
                            <button
                              key={index}
                              onClick={action.action}
                              className={`p-2 rounded-lg transition-colors ${action.color}`}
                              title={action.label}
                            >
                              <Icon className="w-4 h-4" />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          {/* <div className="md:hidden divide-y divide-[#e5e7eb]"> */}
          <div className="lg:hidden divide-y divide-[#e5e7eb]">
            {filteredPlaces.map(place => {
              const actions = getMobileActions(place as AllPlacesType, {
                onView: handleView,
                onApprove: handleApprove,
                onReject: handleReject,
                onEdit: handleEdit,
                onDelete: handleDelete,
                onRestore: handleRestore,
                onStats: handleViewStats,
                onViewReject: openRejectReasonModal
              });
              return (
                <div key={`${place.type}-${place.id}`} className="p-4">

                  {/* 🔝 חלק עליון */}
                  <div className="flex gap-4">

                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={`data:image/jpeg;base64,${place.image}`}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="mb-3">
                        <div className="font-bold text-[#111827] mb-1">
                          <div className="font-bold text-[#111827] transition-colors flex items-center gap-2">
                            {place.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(place.status)}
                          <span className="text-xs text-[#6b7280]">{place.type}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-[#6b7280]">יוצר: </span>
                          <span className="font-medium">{place.creator}</span>
                        </div>
                        <div>
                          <span className="text-[#6b7280]">אזור: </span>
                          <span className="font-medium">{place.region || 'לא צויין'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 🔻 חלק תחתון - כפתורים */}
                  <div className="mt-3 flex items-center gap-2">

                    {actions.primary && (
                      <button
                        onClick={actions.primary.action}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${actions.primary.className}`}
                      >
                        <actions.primary.icon className="w-4 h-4" />
                        {actions.primary.label}
                      </button>
                    )}

                    <div className="flex gap-2">
                      {actions.secondary.map((action, index) => {
                        const Icon = action.icon;

                        return (
                          <button
                            key={index}
                            onClick={action.action}
                            className={`p-2 rounded-lg ${action.className}`}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        );
                      })}
                    </div>

                  </div>

                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-[#9ca3af] mx-auto mb-3" />
              <p className="text-[#6b7280]">לא נמצאו תוצאות</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-[#000000]/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-lg max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#fee2e2] rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[#dc2626]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">אישור מחיקה</h3>
                <p className="text-[#6b7280]">
                  האם אתה בטוח שברצונך למחוק את "{deleteModal.name}"?
                  <br />
                  פעולה זו לא ניתנת לביטול.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-[#dc2626] text-[#ffffff] py-3 rounded-lg font-medium hover:bg-[#b91c1c] transition-colors"
              >
                מחק
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 border-2 border-[#e5e7eb] text-[#6b7280] py-3 rounded-lg font-medium hover:bg-[#f9fafb] transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

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