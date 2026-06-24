import type { DayTripDetailType } from "../../types/dayTripDetail.type"

interface Props {
  trip: DayTripDetailType
}

export default function TripReviwes({ trip }: Props) {

  function formatDate(dateStr: string) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <h2 className="text-3xl font-light text-[#111827] mb-6">ביקורות</h2>
        <div className="space-y-6">
          {trip.reviews && Array.isArray(trip.reviews) && trip.reviews.length > 0 ? (
            trip.reviews.map((review, index) => (
              <div key={index} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#111827] text-[#ffffff] flex items-center justify-center font-bold text-lg">
                      {review.user.firstName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#111827]">{review.user.firstName} {review.user.lastName}</span>
                        {/* {review.verified && (
                                <div className="flex items-center gap-1 bg-[#dbeafe] text-[#2563eb] text-xs font-bold px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  מאומת
                                </div>
                              )} */}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {/* {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#d1d5db]'}`}
                                  />
                                ))} */}
                        </div>
                        <span className="text-sm text-[#6b7280]">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[#4b5563] leading-relaxed mb-3">{review.comment}</p>
                {/* <button className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">
                        👍 מועיל ({review.helpful})
                      </button> */}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-[#6b7280]">
              אין ביקורות עדיין. היה הראשון להוסיף ביקורת!
            </div>
          )}
        </div>
        <button className="mt-6 w-full bg-[#f9fafb] hover:bg-[#f3f4f6] border-2 border-[#e5e7eb] text-[#111827] py-3 rounded-sm font-medium transition-colors">
          הוסף ביקורת
        </button>
      </section>
    </>

  )
}


