import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchTripById } from "../redux/slices/tripsSlice"
import TripHero from "../sections/trip/TripHero"
import TripHighlights from "../sections/trip/TripHighlights"
import TripDescription from "../sections/trip/TripDescription"
import TripGallery from "../sections/trip/TripGallery"
import Nisuy from "../sections/trip/Nisuy"
import TripReviwes from "../sections/trip/TripReviwes"

export default function TripDetailsPage() {

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { currentTrip, loading } = useAppSelector(state => state.trips)

    useEffect(() => {

        if (!id) return

        const tripId = Number(id)

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

            <Nisuy trip={currentTrip}/>

            <TripGallery trip={currentTrip} />

            <TripReviwes trip={currentTrip}/>

        </div>
    )
}
