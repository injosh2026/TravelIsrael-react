import type { DayTripDetailType } from "../../types/dayTripDetail.type"

interface Props {
  trip: DayTripDetailType
}

export default function TripStopsTimeline({ trip }: Props) {

  const items = [...trip.dayTripItems]
    .sort((a,b)=>a.orderInTrip-b.orderInTrip)

  return (
    <div className="max-w-5xl mx-auto px-4 mb-12">

      <h2 className="text-xl font-semibold mb-6">
        מסלול הטיול
      </h2>

      <div className="space-y-6">

        {items.map(item => {

          const data = item.place ?? item.route

          return (
            <div
              key={item.id}
              className="border rounded p-4 flex gap-4"
            >

              <div className="text-sm text-gray-500">
                #{item.orderInTrip}
              </div>

              <div>

                <div className="font-medium">
                  {data?.name}
                </div>

                <div className="text-sm text-gray-500">
                  {data?.description}
                </div>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}