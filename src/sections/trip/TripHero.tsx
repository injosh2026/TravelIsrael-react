import { Heart, Share2 } from "lucide-react"
import { useState } from "react"
import type { DayTripDetailType } from "../../types/dayTripDetail.type"
import RatingStars from "../RatingStars"

interface Props {
  trip: DayTripDetailType
}

export default function TripHero({ trip }: Props) {

  const [saved, setSaved] = useState(false)

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('data:image/jpeg;base64,${trip.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/20 to-[#000000]/60"></div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 left-6 flex gap-3 z-10">
          <button className="w-11 h-11 bg-[#ffffff]/90 backdrop-blur-sm hover:bg-[#ffffff] rounded-full flex items-center justify-center transition-all">
            <Share2 className="w-5 h-5 text-[#111827]" />
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`w-11 h-11 backdrop-blur-sm rounded-full flex items-center justify-center transition-all ${saved ? 'bg-[#ffffff]/90 text-[#ef4444]' : 'bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#111827]'
              }`}
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full">
                {trip.region?.regionName || 'ישראל'}
              </span>
              <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full">
                {trip.difficulty?.name || 'לא צוין'}
              </span>
              <span className="px-3 py-1 bg-[#ffffff]/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full">
                {trip.stopsCount} תחנות
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-[#ffffff] mb-4">
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
    </>
  )
}