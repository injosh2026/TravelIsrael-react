import { useState } from "react"
import type { DayTripDetailType } from "../../types/dayTripDetail.type"

interface Props {
  trip: DayTripDetailType
}

export default function TripDescription({ trip }: Props) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-light mb-6">
          על הטיול
        </h2>

        <p className="text-gray-700 leading-relaxed ">

          {open
            ? trip.description || "אין תיאור זמין"
            : `${(trip.description || "אין תיאור זמין").substring(0, 400)}...`
          }

        </p>

        {!open && (

          <button
            onClick={() => setOpen(true)}
            className="mt-4 font-medium hover:underline"
          >
            קרא עוד
          </button>

        )}

      </section>
    </>
  )
}