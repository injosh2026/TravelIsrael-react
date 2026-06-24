import { useState } from 'react';
import { Bookmark, RefreshCw, Edit3, Heart, Share2, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { type RecommendedTrip } from '../redux/slices/planner/tripsSlice';
import TripHighlights from '../sections/trip/TripHighlights';
import TripDescription from '../sections/trip/TripDescription';
import Nisuy from '../sections/trip/Nisuy';
import TripGallery from '../sections/trip/TripGallery';
import TripReviwes from '../sections/trip/TripReviwes';
import RatingStars from '../sections/RatingStars';


export default function PlanningResultPage() {
  const navigate = useNavigate();
  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // שליפת הטיולים מה‑Redux
  const { trips, loading, error } = useSelector((state: RootState) => state.planner);

  // בדיקות בסיסיות
  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה: {error}</div>;
  if (!trips.length) return <div>לא נמצאו טיולים</div>;


  // הטיול הנוכחי
  const current: RecommendedTrip = trips[currentTripIndex];
  const trip = current.trip;
  const match = current.matchPercentage;


  const nextTrip = () => {
    if (currentTripIndex < trips.length - 1) {
      setCurrentTripIndex(prev => prev + 1);
    }
  };

  const prevTrip = () => {
    if (currentTripIndex > 0) {
      setCurrentTripIndex(prev => prev - 1);
    }
  };

  const getMatchStyle = (match: number) => {
    if (match >= 90) {
      return {
        text: "התאמה מושלמת",
        color: "text-[#059669]",
        bgLight: "bg-[#ecfdf5]",
        bgMedium: "bg-[#a7f3d0]",
        bgStrong: "bg-[#059669]",
        border: "border-[#059669]"
      };
    }

    if (match >= 70) {
      return {
        text: "התאמה טובה",
        color: "text-[#2563eb]",
        bgLight: "bg-[#eff6ff]",
        bgMedium: "bg-[#bfdbfe]",
        bgStrong: "bg-[#2563eb]",
        border: "border-[#2563eb]"
      };
    }

    if (match >= 50) {
      return {
        text: "התאמה בינונית",
        color: "text-[#d97706]",
        bgLight: "bg-[#fffbeb]",
        bgMedium: "bg-[#fde68a]",
        bgStrong: "bg-[#d97706]",
        border: "border-[#d97706]"
      };
    }

    return {
      text: "התאמה נמוכה",
      color: "text-[#dc2626]",
      bgLight: "bg-[#fef2f2]",
      bgMedium: "bg-[#fecaca]",
      bgStrong: "bg-[#dc2626]",
      border: "border-[#dc2626]"
    };
  };

  const matchStyle = getMatchStyle(match);

  return (
    <div className="min-h-screen bg-[#f9fafb]" dir="rtl">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('data:image/jpeg;base64,${trip.image}')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 via-[#000000]/30 to-[#000000]/70"></div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 left-6 flex gap-3 z-10">
          <button className="w-11 h-11 bg-[#ffffff]/90 backdrop-blur-sm hover:bg-[#ffffff] rounded-full flex items-center justify-center transition-all">
            <Share2 className="w-5 h-5 text-[#111827]" />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`w-11 h-11 backdrop-blur-sm rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-[#ef4444] text-[#ffffff]' : 'bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#111827]'
              }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">

            <div className={`inline-flex items-center gap-2 ${matchStyle.bgLight} backdrop-blur-sm ${matchStyle.color} px-4 py-2 rounded-full text-sm font-bold mb-4`}>
              <CheckCircle2 className="w-4 h-4" />
              {matchStyle.text} - {match}%
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-[#ffffff] mb-3">
              {trip.name}
            </h1>
            <p className="text-xl text-[#ffffff]/90 max-w-2xl">
              {trip.description ? trip.description.slice(0, 48) : 'טיול מעניין'}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {trip.ratingsCount === 0 ? (
                  <span className="text-gray-500 text-sm">חדש</span>
                ) : (
                  <RatingStars rating={trip.averageRating ?? 0} />
                )}
              </div>
              <span className="text-gray-200 text-sm">({trip.reviewsCount} ביקורות)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Navigation */}
      {trips.length > 1 && (
        <div className="bg-[#ffffff] border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between bg-[#f9fafb] rounded-lg p-4">
              <button
                onClick={prevTrip}
                disabled={currentTripIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentTripIndex === 0
                  ? 'text-[#9ca3af] cursor-not-allowed'
                  : 'text-[#111827] hover:bg-[#ffffff]'
                  }`}
              >
                <ChevronRight className="w-4 h-4" />
                הקודם
              </button>

              <div className="text-sm text-[#6b7280]">
                אפשרות {currentTripIndex + 1} מתוך {trips.length}
              </div>

              <button
                onClick={nextTrip}
                disabled={currentTripIndex === trips.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentTripIndex === trips.length - 1
                  ? 'text-[#9ca3af] cursor-not-allowed'
                  : 'text-[#111827] hover:bg-[#ffffff]'
                  }`}
              >
                הבא
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="gap-8">
          {/* Trip Stats */}
          {trips.length > 1 && (
            <div className="mx-auto px-4 md:px-6 pt-20">
              <TripHighlights trip={trip} />
            </div>
          )}

          {trips.length <= 1 && (
            <TripHighlights trip={trip} />
          )}

          <TripDescription trip={trip} />

          <Nisuy trip={trip} />

          <TripGallery trip={trip} />

          <TripReviwes trip={trip} />

          {/* Right Column - Sidebar */}
          <div className="space-y-6 px-4 md:px-6 pt-6">
            {/* Why This Trip */}
            <div className={`${matchStyle.bgLight} border ${matchStyle.border} rounded-sm p-6 top-6`}>
              <h3 className="text-xl font-bold text-[#111827] mb-4 flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${matchStyle.color}`} />
                כמה זה מתאים לך?
              </h3>
              {/* <h3 className="text-xl font-bold text-[#111827] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                למה זה מתאים לך?
              </h3> */}
              <div className="space-y-3">
                {/* {trip.whyMatch.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#ffffff]" />
                    </div>
                    <span className="text-sm text-[#047857]">{reason}</span>
                  </div>
                ))} */}
              </div>


              <div className={`mt-6 pt-6 border-t ${matchStyle.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${matchStyle.color}`}>ציון התאמה</span>
                  <span className={`text-2xl font-bold ${matchStyle.color}`}>{match}%</span>
                </div>
                <div className={`h-2 ${matchStyle.bgMedium} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full ${matchStyle.bgStrong} rounded-full transition-all duration-1000`}
                    style={{ width: `${match}%` }}
                  ></div>
                </div>
              </div>
            </div>


            <div className='pb-6'>
              {/* Action Buttons */}
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-sm p-6 space-y-3">
                <button className="w-full bg-[#111827] text-[#ffffff] py-3.5 rounded-sm font-bold hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  שמור אצלי
                </button>

                <button onClick={() => navigate(`/buildTrip/${trip.id}`)} className="w-full border-2 border-[#111827] text-[#111827] py-3.5 rounded-sm font-bold hover:bg-[#f9fafb] transition-colors flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  ערוך מסלול בעצמי
                </button>

                <button onClick={() => navigate('/tripPlan')} className="w-full border-2 border-[#d1d5db] text-[#6b7280] py-3.5 rounded-sm font-bold hover:bg-[#f9fafb] transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  שנה העדפות
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}