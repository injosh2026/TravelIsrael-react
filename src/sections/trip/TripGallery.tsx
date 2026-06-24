import { useState } from "react"
import type { DayTripDetailType } from "../../types/dayTripDetail.type"
import { ChevronLeft, ChevronRight } from "lucide-react"

function collectImages(trip: DayTripDetailType) {
    const images: string[] = []

    // images.push(trip.image)

    // בדיקה דיפנסיבית - אם אין dayTripItems או זה לא מערך
    if (!trip.dayTripItems || !Array.isArray(trip.dayTripItems)) {
        return images
    }

    trip.dayTripItems.forEach(item => {
        item.place?.images?.forEach(img => images.push(img.image))
        item.route?.images?.forEach(img => images.push(img.image))
    })

    return images
}

interface Props {
    trip: DayTripDetailType
}

export default function TripGallery({ trip }: Props) {

    const images = collectImages(trip)

    const [isOpen, setIsOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const visibleImages = images.slice(0, 8)
    const extraCount = images.length - 8

    const openGallery = (index: number) => {
        setCurrentIndex(index)
        setIsOpen(true)
    }

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">

            <h2 className="text-3xl font-light mb-4">
                תמונות מהטיול
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {visibleImages.map((img, i) => (
                    <div
                        key={i}
                        className="relative cursor-pointer"
                        onClick={() => openGallery(i)}
                    >
                        <img
                            src={`data:image/jpeg;base64,${img}`}
                            className="w-full h-40 object-cover rounded"
                        />

                        {i === 7 && extraCount > 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded text-white text-lg font-medium">
                                +{extraCount} תמונות נוספות
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative max-w-4xl w-full px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={`data:image/jpeg;base64,${images[currentIndex]}`}
                            className="w-full max-h-[80vh] object-contain rounded"
                        />

                        {/* כפתורי ניווט */}
                        <button
                            onClick={prev}
                            className="absolute right-4 top-1/2 -translate-y-1/2
                            bg-black/40 hover:bg-black/60
                            text-white text-xl
                            w-11 h-11
                            rounded-full
                            flex items-center justify-center
                            backdrop-blur-sm
                            shadow-lg
                            transition"
                        >
                            <ChevronRight size={28} className="text-white" />
                        </button>

                        <button
                            onClick={next}
                            className="absolute left-4 top-1/2 -translate-y-1/2
                            bg-black/40 hover:bg-black/60
                            text-white text-xl
                            w-11 h-11
                            rounded-full
                            flex items-center justify-center
                            backdrop-blur-sm
                            shadow-lg
                            transition"
                        >
                            <ChevronLeft size={28} className="text-white" />
                        </button>

                        {/* כפתור סגירה */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-0 right-4
                            bg-black/40 hover:bg-black/60
                            text-white text-xl
                            w-10 h-10
                            rounded-full
                            flex items-center justify-center
                            backdrop-blur-sm
                            shadow-lg
                            transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}