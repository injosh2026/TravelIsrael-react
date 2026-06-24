import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchTripById } from "../redux/slices/tripsSlice"
import TripHero from "../sections/trip/TripHero"
import TripHighlights from "../sections/trip/TripHighlights"
import TripDescription from "../sections/trip/TripDescription"
import TripGallery from "../sections/trip/TripGallery"
// import TripStopsTimeline from "../sections/trip/TripStopsTimeline"
import Nisuy from "../sections/trip/Nisuy"
import TripReviwes from "../sections/trip/TripReviwes"

export default function TripDetailsPage() {

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { currentTrip, loading } = useAppSelector(state => state.trips)

    useEffect(() => {

        if (!id) return

        const tripId = Number(id)

        // תמיד שחזור טיול מפורט מהשרת כדי להיות בטוחים שיש dayTripItems
        dispatch(fetchTripById(tripId))

    }, [id, dispatch])

    if (loading) {
        return <div className="min-h-screen bg-[#f9fafb] pt-20">Loading...</div>
    }

    if (!currentTrip) {
        return <div className="min-h-screen bg-[#f9fafb] pt-20">Trip not found</div>
    }

    return (
        <div className="min-h-screen bg-[#ffffff]>" dir="rtl">

            <TripHero trip={currentTrip} />

            <TripHighlights trip={currentTrip} />

            <TripDescription trip={currentTrip} />

            {/* <TripStopsTimeline trip={currentTrip}/> */}

            <Nisuy trip={currentTrip}/>

            <TripGallery trip={currentTrip} />

            <TripReviwes trip={currentTrip}/>

        </div>
    )
}

// import { useState } from 'react';
// import { Heart, Share2, MapPin, Clock, TrendingUp, Users, Accessibility, Navigation, Download, AlertCircle, BookOpen, Compass } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function TripDetailsPage() {
//   const [isSaved, setIsSaved] = useState(false);
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   const tripData = {
//     name: 'טיול יומי בגליל העליון',
//     shortDescription: 'יום שלם של טבע, מעיינות, תצפיות ואוכל מקומי - חוויה מושלמת למשפחה',
//     image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=800&fit=crop',
//     region: 'גליל עליון',
//     difficulty: 'בינוני',
//     duration: 'יום שלם (8-9 שעות)',
//     totalDistance: '25 ק"מ נסיעה + 5 ק"מ הליכה',
//     accessibility: 'חלקי',
//     audience: 'משפחות, זוגות',
//     stops: 6,
//     description: 'טיול יומי מושלם בגליל העליון המשלב טבע מרהיב, מעיינות מרעננים, תצפיות עוצרות נשימה וחוויות קולינריות מקומיות. הטיול מתחיל בשעות הבוקר המוקדמות עם טיפוס קל לתצפית הר מירון, ממשיך למעיין קריר לרחצה ומסתיים בארוחת ערב באחת המסעדות הטובות באזור. הטיול מתאים במיוחד לאביב ולסתיו, כאשר הטבע בשיאו והטמפרטורות נעימות.',
//     highlights: [
//       { icon: Clock, label: 'משך זמן', value: '8-9 שעות' },
//       { icon: MapPin, label: 'תחנות', value: '6 תחנות' },
//       { icon: Navigation, label: 'מרחק כולל', value: '25 ק"מ נסיעה' },
//       { icon: Accessibility, label: 'נגישות', value: 'רוב התחנות נגישות' },
//       { icon: Users, label: 'מתאים ל', value: 'משפחות וזוגות' },
//       { icon: TrendingUp, label: 'קושי', value: 'בינוני' }
//     ],
//     itinerary: [
//       {
//         itemType: 'Place',
//         time: '08:00',
//         duration: '1.5 שעות',
//         name: 'תצפית הר מירון',
//         type: 'טבע',
//         description: 'התחלה מרעננת עם טיפוס קל לנקודת התצפית הגבוהה ביותר בצפון. נוף פנורמי של כל הגליל, הכנרת והחרמון.',
//         image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
//         distance: '2 ק"מ הליכה',
//         difficulty: 'קל-בינוני',
//         tips: 'הגיעו מוקדם להימנע מהמון וליהנות מאור הבוקר'
//       },
//       {
//         itemType: 'Place',
//         time: '10:00',
//         duration: '1 שעה',
//         name: 'מעיין ברכת רם',
//         type: 'מים',
//         description: 'מעיין טבעי קריר ומרענן. אפשרות לשחייה ומשחקי מים. המקום מוצל ונעים במיוחד בימי קיץ.',
//         image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop',
//         distance: '8 ק"מ נסיעה',
//         difficulty: 'קל',
//         tips: 'הביאו בגדי ים ומגבת'
//       },
//       {
//         itemType: 'Route',
//         time: '11:30',
//         duration: '2 שעות',
//         name: 'מסלול הליכה ביער ברעם',
//         type: 'הליכה',
//         description: 'מסלול מוצל ונעים דרך יער אורנים עתיק. מעברים ליד נקודות תצפית, עצי אלון מרשימים וצמחייה עשירה.',
//         image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
//         distance: '3 ק"מ הליכה',
//         difficulty: 'קל',
//         tips: 'מסלול מתאים לכל המשפחה'
//       },
//       {
//         itemType: 'Place',
//         time: '13:30',
//         duration: '1.5 שעות',
//         name: 'ארוחת צהריים - דרוזי בפקיעין',
//         type: 'אוכל',
//         description: 'ארוחה מסורתית בבית דרוזי מקומי. תבשילי בית, לחם טאבון טרי וקפה בהל. חוויה אותנטית של אירוח דרוזי.',
//         image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&h=400&fit=crop',
//         distance: '5 ק"מ נסיעה',
//         difficulty: 'ללא',
//         tips: 'מומלץ להזמין מקום מראש'
//       },
//       {
//         itemType: 'Place',
//         time: '15:30',
//         duration: '1.5 שעות',
//         name: 'מרפסת תצפית מצפה הילה',
//         type: 'תצפית',
//         description: 'תצפית מרהיבה על הגליל המערבי, עכו והים. מקום מושלם לצילומים ולהפסקת קפה.',
//         image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop',
//         distance: '7 ק"מ נסיעה',
//         difficulty: 'קל',
//         tips: 'שעת הזהב לצילום - האור מדהים'
//       },
//       {
//         itemType: 'Place',
//         time: '17:00',
//         duration: '1.5 שעות',
//         name: 'סיור ביקב בוטיק',
//         type: 'תרבות',
//         description: 'סיור ביקב קטן ומשפחתי, טעימת יינות מקומיים ולימוד על תהליך הייצור. אפשרות לקניית בקבוקים.',
//         image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop',
//         distance: '5 ק"מ נסיעה',
//         difficulty: 'ללא',
//         tips: 'יש לתאם מראש, לא מתאים לילדים קטנים'
//       }
//     ],
//     equipment: [
//       { icon: '💧', text: 'מים - לפחות 2 ליטר לאדם' },
//       { icon: '🥾', text: 'נעלי הליכה נוחות' },
//       { icon: '🧢', text: 'כובע להגנה מהשמש' },
//       { icon: '🧴', text: 'קרם הגנה' },
//       { icon: '🎒', text: 'תיק גב קטן' },
//       { icon: '🩱', text: 'בגדי ים ומגבת' },
//       { icon: '📸', text: 'מצלמה או טלפון טעון' },
//       { icon: '🍎', text: 'חטיפים לדרך' }
//     ],
//     nature: {
//       animals: [
//         { name: 'נחליאלי', description: 'ניתן לפגוש בשעות הבוקר ביער' },
//         { name: 'עיט חורף', description: 'עף מעל העמקים והפסגות' },
//         { name: 'שועל', description: 'לעיתים נראה בשעות הערב' }
//       ],
//       plants: [
//         { name: 'אלון מצוי', description: 'עצים עתיקים ביער ברעם' },
//         { name: 'רקפת מצויה', description: 'פורחת בחורף באדום עז' },
//         { name: 'לוטם קוצני', description: 'שיח ריחני עם פרחים צהובים' }
//       ],
//       facts: [
//         'הגליל העליון הוא האזור הירוק ביותר בישראל',
//         'באזור יותר מ-50 מעיינות זורמים',
//         'היערות ניטעו על ידי קק"ל בשנות ה-50 וה-60',
//         'האזור מאכלס קהילות דרוזיות עתיקות'
//       ]
//     },
//     tips: [
//       { type: 'warning', text: 'המסלולים כוללים מעברי מים - התכוננו להירטב' },
//       { type: 'time', text: 'התחילו מוקדם (8:00) כדי להספיק את כל התחנות' },
//       { type: 'season', text: 'הכי יפה באביב (מרץ-מאי) ובסתיו (ספטמבר-נובמבר)' },
//       { type: 'parking', text: 'חניה בכל התחנות - מומלץ להגיע מוקדם בסופי שבוע' },
//       { type: 'food', text: 'מומלץ להזמין מראש במסעדה ובכפר הדרוזי' },
//       { type: 'budget', text: 'תקציב משוער ליום: 200-300 ש"ח למשפחה (כולל אוכל)' }
//     ],
//     budget: {
//       total: '200-300 ש"ח למשפחה',
//       breakdown: [
//         { item: 'חניונות', cost: '20-40 ש"ח' },
//         { item: 'ארוחת צהריים', cost: '120-180 ש"ח' },
//         { item: 'כניסה ליקב', cost: '40-60 ש"ח' },
//         { item: 'חטיפים ומים', cost: '20-40 ש"ח' }
//       ]
//     }
//   };

//   type Type = 'טבע' | 'תצפית' | 'מים' | 'הליכה' | 'אוכל' | 'פעילות' | 'תרבות';

//   const getTypeColor = (type:string) => {
//     const colors = {
//       'טבע': 'bg-[#d1fae5] text-[#059669]',
//       'תצפית': 'bg-[#e0e7ff] text-[#6366f1]',
//       'מים': 'bg-[#dbeafe] text-[#2563eb]',
//       'הליכה': 'bg-[#fef3c7] text-[#d97706]',
//       'אוכל': 'bg-[#fee2e2] text-[#dc2626]',
//       'פעילות': 'bg-[#fce7f3] text-[#db2777]',
//       'תרבות': 'bg-[#fce7f3] text-[#db2777]'
//     };
//     return colors[type as Type] || 'bg-[#f3f4f6] text-[#6b7280]';
//   };


//   const getLink = (stop:any) => {
//     if (stop.itemType === 'Route') {
//       // return `/trails/${stop.id}`;
//       return `/trailDetails`;
//     }

//     // return `/locations/${stop.id}`;
//     return `/placeDetails`;

//   };

//   return (
//     <div className="min-h-screen bg-[#ffffff]" dir="rtl">
//       {/* Hero Section */}
//       <div className="relative h-[70vh] md:h-[80vh]">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url('${tripData.image}')` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/20 to-[#000000]/60"></div>
//         </div>

//         {/* Action Buttons */}
//         <div className="absolute top-6 left-6 flex gap-3 z-10">
//           <button className="w-11 h-11 bg-[#ffffff]/90 backdrop-blur-sm hover:bg-[#ffffff] rounded-full flex items-center justify-center transition-all">
//             <Share2 className="w-5 h-5 text-[#111827]" />
//           </button>
//           <button
//             onClick={() => setIsSaved(!isSaved)}
//             className={`w-11 h-11 backdrop-blur-sm rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-[#ef4444] text-[#ffffff]' : 'bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#111827]'
//               }`}
//           >
//             <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="relative h-full flex flex-col justify-end">
//           <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full">
//                 {tripData.region}
//               </span>
//               <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full">
//                 {tripData.difficulty}
//               </span>
//               <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full">
//                 {tripData.stops} תחנות
//               </span>
//             </div>
//             <h1 className="text-4xl md:text-6xl font-light text-[#ffffff] mb-4">
//               {tripData.name}
//             </h1>
//             <p className="text-xl text-[#ffffff]/90 max-w-2xl">
//               {tripData.shortDescription}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Info Cards */}
//       <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-10 mb-12">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {tripData.highlights.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <div key={index} className="bg-[#ffffff] border border-[#e5e7eb] rounded-sm p-4 text-center">
//                 <Icon className="w-5 h-5 text-[#6b7280] mx-auto mb-2" />
//                 <div className="text-xs text-[#6b7280] mb-1">{item.label}</div>
//                 <div className="text-sm font-medium text-[#111827]">{item.value}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       

//       {/* Fixed Bottom CTA */}
//       <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e7eb] py-4 z-20">
//         <div className="max-w-7xl mx-auto px-4 md:px-6">
//           <div className="flex items-center gap-3">
//             <button className="flex-1 bg-[#111827] text-[#ffffff] py-3.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2">
//               <Compass className="w-4 h-4" />
//               שמור ותכנן את הטיול
//             </button>
//             <button className="px-6 py-3.5 border-2 border-[#111827] text-[#111827] rounded-sm text-sm font-medium hover:bg-[#f9fafb] transition-colors">
//               התחל ניווט
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }