// src/component/trips/TripCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Heart, Clock, MapPin, Accessibility } from "lucide-react";
import RatingStars from "../sections/RatingStars"; // אם יש קומפוננטת דירוג נפרדת
import { formatTripDuration } from "../utils/formatTripDuration"; // פונקציות עזר
import { getDifficultyColor } from "../utils/getDifficultyColor";
import type { DayTripType } from "../types/dayTrip.type";

interface TripCardProps {
  trip: DayTripType; // אפשר להחליף ב-type ממשי של Trip
  onImageClick?: (image: string) => void;
}

export default function DayTripCard({ trip, onImageClick }: TripCardProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className="group h-full flex flex-col bg-[#ffffff] border border-[#e5e7eb] rounded-lg overflow-hidden hover:border-[#d1d5db] transition-all duration-300">
      {/* Image */}
      <div
        className="relative w-full h-[300px] overflow-hidden bg-[#f3f4f6] cursor-pointer"
        onClick={() => {
          setSelectedImage(`data:image/jpeg;base64,${trip.image}`);
          if (onImageClick) onImageClick(trip.image);
        }}
      >
        <img
          src={`data:image/jpeg;base64,${trip.image}`}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
          {trip.region?.regionName || 'ישראל'}
        </div>
        <button className="absolute top-3 left-3 w-9 h-9 bg-[#ffffff]/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#ffffff] transition-colors">
          <Heart className="w-4 h-4 text-[#111827]" />
        </button>
      </div>

      {/* Content */}

      <div className="p-5 flex flex-col flex-grow">

        <h3 className="text-lg font-medium text-[#111827] group-hover:text-[#4b5563] transition-colors">
          {trip.name}
        </h3>

        <div className="flex-grow" />

        <div className="mt-4">
          {/* Ratings */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {trip.ratingsCount === 0 ? (
                <span className="text-gray-500 text-sm">חדש</span>
              ) : (
                <RatingStars rating={trip.averageRating ?? 0} />
              )}
            </div>
            <span className="text-gray-500 text-sm">({trip.reviewsCount} ביקורות)</span>
          </div>

          {/* Icons Row */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            <span className={`px-2 py-1 rounded ${getDifficultyColor(trip.difficulty?.name || "לא צוין")}`}>
              {trip.difficulty?.name || "לא צוין"}
            </span>
            <span className="flex items-center gap-1 text-[#6b7280]">
              <Accessibility className="w-3.5 h-3.5" />
              {trip.accessibility?.name || "לא צוין"}
            </span>
            <span className="flex items-center gap-1 text-[#6b7280]">
              <Clock className="w-3.5 h-3.5" />
              {formatTripDuration(trip.totalDurationHours)}
            </span>
            <div className="flex items-center gap-1 text-[#6b7280]">
              <MapPin className="w-3.5 h-3.5" />
              {trip.stopsCount} תחנות
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#6b7280] mb-4 line-clamp-2 truncate">
            {trip.description || "אין תיאור זמין"}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
            <button
              onClick={() => navigate(`/trips/${trip.id}`)}
              className="w-full bg-[#f9fafb] hover:bg-[#f3f4f6] text-[#111827] py-2.5 rounded-sm text-sm font-medium transition-colors border border-[#e5e7eb]"
            >
              לפרטים
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage('')}
        >
          <img
            src={selectedImage}
            alt="תמונה מוגדלת"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

// <div
//     key={trip.id}
//     className={`
//     bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group
//     ${index === 2 ? 'sm2:col-span-2' : 'col-span-1'} md2:col-span-1
//     `}
// >
//     <div
//         key={trip.id}
//         className="group bg-[#ffffff] border border-[#e5e7eb] rounded-lg overflow-hidden hover:border-[#d1d5db] transition-all duration-300"
//     >
//         {/* Image */}
//         <div className="relative w-full h-[300px] overflow-hidden bg-[#f3f4f6]  cursor-pointer"
//             onClick={() => setSelectedImage(trip.image)}
//         >
//             <img
//                 src={`data:image/jpeg;base64,${trip.image}`}
//                 alt={trip.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
//                 <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//             <div className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//                 {trip.region.regionName}
//             </div>
//             <button className="absolute top-3 left-3 w-9 h-9 bg-[#ffffff]/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#ffffff] transition-colors">
//                 <Heart className="w-4 h-4 text-[#111827]" />
//             </button>
//         </div>

//         {/* Content */}
//         <div className="p-5">
//             <div className="mb-3">
//                 <h3 className="text-lg font-medium text-[#111827] mb-1 group-hover:text-[#4b5563] transition-colors">
//                     {trip.name}
//                 </h3>
//                 {/* <p className="text-sm text-[#6b7280]">{trip.region}</p> */}
//                 <div className="flex items-center gap-2 mb-3">
//                     <div className="flex items-center">
//                         {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> */}
//                         {trip.ratingsCount === 0 ? (
//                             <span className="text-gray-500 text-sm">חדש</span>
//                         ) : (<RatingStars rating={trip.averageRating ?? 0} />
//                         )}
//                         {/* <span className="mr-1 text-gray-800 font-semibold">{trip.averageRating?.toFixed(1)}</span> */}
//                     </div>
//                     <span className="text-gray-500 text-sm">({trip.reviewsCount} ביקורות)</span>
//                 </div>
//             </div>

//             {/* Icons Row */}
//             <div className="flex items-center gap-3 mb-3 text-xs">
//                 <span className={`px-2 py-1 rounded ${getDifficultyColor(trip.difficulty.name

//                 )}`}>
//                     {trip.difficulty.name}
//                 </span>
//                 <span className="flex items-center gap-1 text-[#6b7280]">
//                     <Accessibility className="w-3.5 h-3.5" />
//                     {trip.accessibility.name}
//                 </span>
//                 <span className="flex items-center gap-1 text-[#6b7280]">
//                     <Clock className="w-3.5 h-3.5" />
//                     {formatTripDuration(trip.totalDurationHours)}
//                 </span>
//                 <div className="flex items-center gap-1 text-[#6b7280]">
//                     <MapPin className="w-3.5 h-3.5" />
//                     {trip.stopsCount} תחנות
//                 </div>
//             </div>

//             {/* Description */}
//             <p className="text-sm text-[#6b7280] mb-4 line-clamp-2 truncate">
//                 {trip.description}
//             </p>
//             <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
//                 {/* Button */}
//                 <button onClick={() => navigate("/tripDetails")} className="w-full bg-[#f9fafb] hover:bg-[#f3f4f6] text-[#111827] py-2.5 rounded-sm text-sm font-medium transition-colors border border-[#e5e7eb]">
//                     לפרטים
//                 </button>
//             </div>
//         </div>
//     </div>
// </div>








// <div
//         key={trip.id}
//         className="group bg-[#ffffff] border border-[#e5e7eb] rounded-lg overflow-hidden hover:border-[#d1d5db] transition-all duration-300"
//     >
//         {/* Image */}
//         <div className="relative w-full h-[300px] overflow-hidden bg-[#f3f4f6] cursor-pointer"
//             onClick={() => setSelectedImage(trip.image)}
//         >
//             <img
//                 src={trip.image}
//                 alt={trip.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
//                 <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//             <div className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//                 {trip.region}
//             </div>
//             <button className="absolute top-3 left-3 w-9 h-9 bg-[#ffffff]/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#ffffff] transition-colors">
//                 <Heart className="w-4 h-4 text-[#111827]" />
//             </button>
//         </div>

//         {/* Content */}
//         <div className="p-5">
//             <div className="mb-3">
//                 <h3 className="text-lg font-medium text-[#111827] mb-1 group-hover:text-[#4b5563] transition-colors">
//                     {trip.name}
//                 </h3>
//                 {/* <p className="text-sm text-[#6b7280]">{trip.region}</p> */}
//                 <div className="flex items-center gap-2 mb-3">
//                     <div className="flex items-center">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         <span className="mr-1 text-gray-800 font-semibold">{trip.rating}</span>
//                     </div>
//                     <span className="text-gray-500 text-sm">({trip.reviews} ביקורות)</span>
//                 </div>
//             </div>

//             {/* Icons Row */}
//             <div className="flex items-center gap-3 mb-3 text-xs">
//                 <span className={`px-2 py-1 rounded ${getDifficultyColor(trip.difficulty)}`}>
//                     {trip.difficulty}
//                 </span>
//                 <span className="flex items-center gap-1 text-[#6b7280]">
//                     <Accessibility className="w-3.5 h-3.5" />
//                     {trip.accessibility}
//                 </span>
//                 <span className="flex items-center gap-1 text-[#6b7280]">
//                     <Clock className="w-3.5 h-3.5" />
//                     {trip.duration}
//                 </span>
//                 <div className="flex items-center gap-1 text-[#6b7280]">
//                     <MapPin className="w-3.5 h-3.5" />
//                     {trip.stops} תחנות
//                 </div>
//             </div>

//             {/* Description */}
//             <p className="text-sm text-[#6b7280] mb-4 line-clamp-2 truncate">
//                 {trip.description}
//             </p>
//             <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
//                 {/* Button */}
//                 <button onClick={() => navigate("/tripDetails")} className="w-full bg-[#f9fafb] hover:bg-[#f3f4f6] text-[#111827] py-2.5 rounded-sm text-sm font-medium transition-colors border border-[#e5e7eb]">
//                     לפרטים
//                 </button>
//             </div>
//         </div>
//     </div>
// ))}
// {selectedImage && (
//     <div
//         className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
//         onClick={() => setSelectedImage('')}
//     >
//         <img
//             src={selectedImage}
//             alt="תמונה מוגדלת"
//             className="max-w-full max-h-full object-contain"
//         />
//     </div>