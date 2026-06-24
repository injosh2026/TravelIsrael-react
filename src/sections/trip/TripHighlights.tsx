import { Accessibility, CircleDollarSign, Clock,  MapPin, Navigation, TrendingUp,  } from "lucide-react"
// import { Coins, Tag, Wallet } from "lucide-react"
import type { DayTripDetailType } from "../../types/dayTripDetail.type"
import { formatTripDuration } from "../../utils/formatTripDuration"

interface Props {
  trip: DayTripDetailType
}
export default function TripHighlights({ trip }: Props) {
  const highlights = [

    {
      icon: Clock,
      label: 'משך זמן',
      value: formatTripDuration(trip.totalDurationHours)
    },
    { 
      icon: MapPin,
      label: 'תחנות', 
      value: `${trip.stopsCount} תחנות`
    },

    {
      icon: Navigation,
      label: 'מרחק כולל',
      value: `${trip.totalLengthKM} ק״מ`
    },

    {
      icon: Accessibility,
      label: "נגישות",
      value: trip.accessibility?.name || "לא צוין"
    },

    { 
      // icon: Wallet ,
      // icon: Tag,
      icon: CircleDollarSign ,
      label: 'מחיר משוער לנפש',
       value: `${trip.price} ₪`
    },

    {
      icon: TrendingUp,
      label: "קושי",
      value: trip.difficulty?.name || "לא צוין"
    }

  ]

  return (
      // {/* Quick Info Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 relative z-10 -mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-[#ffffff] border border-[#e5e7eb] rounded-sm p-4 text-center">
                <Icon className="w-5 h-5 text-[#6b7280] mx-auto mb-2" />
                <div className="text-xs text-[#6b7280] mb-1">{item.label}</div>
                <div className="text-sm font-medium text-[#111827]">{item.value}</div>
              </div>
            );
          })}
        </div>
      </div>
  )
}



