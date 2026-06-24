import type { DayTripDetailType } from "../types/dayTripDetail.type"

type Location = {
  lat: number
  lng: number
}

type TravelMode = 0 | 1 | 2

// פונקציה שמקבלת מספר מהשרת ומחזירה TravelMode בטוח
function toTravelMode(mode: number): TravelMode {
  if (mode === 0 || mode === 1 || mode === 2) return mode
  return 0 // ברירת מחדל אם משהו לא תקין
}

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371

  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function getTravelMinutes(distanceKm: number, mode: TravelMode) {

  const speeds: Record<TravelMode, number> = {
    0: 5,   // הליכה km/h
    1: 60,  // רכב
    2: 15   // אופניים
  }

  const speed = speeds[mode] ?? 5

  const hours = distanceKm / speed

  return hours * 60
}

function getStopLocation(stop: any): Location | null {

  if (stop.place) {
    return {
      lat: stop.place.latitude,
      lng: stop.place.longitude
    }
  }

  if (stop.route) {
    return {
      lat: stop.route.startLatitude,
      lng: stop.route.startLongitude
    }
  }

  return null
}

//פונקציה לעיגול שעה
function roundToHalfHour(date: Date) {
  const newDate = new Date(date)

  const minutes = newDate.getMinutes()

  if (minutes < 15) {
    newDate.setMinutes(0)
  } else if (minutes < 45) {
    newDate.setMinutes(30)
  } else {
    newDate.setHours(newDate.getHours() + 1)
    newDate.setMinutes(0)
  }

  date.setSeconds(0)
  return newDate
}

//פורמט השעה
function formatTime(date: Date) {
  return date.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit"
  })
}

//פורמט משך זמן
export function formatDuration(minutes: number) {
  const hours = minutes / 60

  if (hours === 1) return "שעה"
  if (hours === 2) return "שעתיים"
  if (Number.isInteger(hours)) return `${hours} שעות`
  if (hours < 1) return `${minutes} דקות`

  return `${hours.toFixed(1)} שעות`
}

export function calculateStopsTimes(trip: DayTripDetailType) {

  // בדיקה דיפנסיבית - אם אין dayTripItems או זה לא מערך, החזר מערך ריק
  if (!trip.dayTripItems || !Array.isArray(trip.dayTripItems)) {
    return []
  }

  const stops = [...trip.dayTripItems]
    .sort((a, b) => a.orderInTrip - b.orderInTrip)

  let currentTime = new Date(`2000-01-01T${trip.startTime}`)

  const result: string[] = []

  for (let i = 0; i < stops.length; i++) {

    const stop = stops[i]

    const roundedTime = roundToHalfHour(new Date(currentTime))

    result.push(formatTime(roundedTime))

    currentTime = new Date(
      currentTime.getTime() +
      stop.estimatedDuration * 60000
    )

    const next = stops[i + 1]

    if (next) {

      const loc1 = getStopLocation(stop)
      const loc2 = getStopLocation(next)

      if (!loc1 || !loc2) continue

      const distance = getDistanceKm(
        loc1.lat,
        loc1.lng,
        loc2.lat,
        loc2.lng
      )

      const safeMode = toTravelMode(stop.mode || 1)

      const travelMinutes = getTravelMinutes(
        distance,
        safeMode
      )

      currentTime = new Date(
        currentTime.getTime() +
        travelMinutes * 60000
      )
    }

  }

  return result
}



//פורמט מרחק + אופן הגעה
function formatDistance(distanceKm: number, mode: number) {
  const rounded = Math.round(distanceKm * 10) / 10

  const modeText: Record<TravelMode, string> = {
    0: "הליכה",
    1: "נסיעה",
    2: "אופניים"
  }

  const safeMode = toTravelMode(mode)
  return `${rounded} ק\"מ ${modeText[safeMode] ?? ""}`
}

export function calculateDistances(trip: DayTripDetailType) {
  // בדיקה דיפנסיבית - אם אין dayTripItems או זה לא מערך, החזר מערך ריק
  if (!trip.dayTripItems || !Array.isArray(trip.dayTripItems)) {
    return []
  }

  const stops = [...trip.dayTripItems]
    .sort((a, b) => a.orderInTrip - b.orderInTrip)

  const result: (string | null)[] = []

  for (let i = 0; i < stops.length; i++) {
    const current = stops[i]
    const next = stops[i + 1]

    if (!next) {
      result.push(null)
      continue
    }

    const loc1 = getStopLocation(current)
    const loc2 = getStopLocation(next)

    if (!loc1 || !loc2) continue

    const distance = getDistanceKm(
      loc1.lat,
      loc1.lng,
      loc2.lat,
      loc2.lng
    )

    result.push(formatDistance(distance, current.mode || 1))
  }

  return result
}

export function calculateTotalTripMinutes(trip: DayTripDetailType) {

  if (!trip.dayTripItems || !Array.isArray(trip.dayTripItems)) {
    return 0
  }

  const stops = [...trip.dayTripItems]
    .sort((a, b) => a.orderInTrip - b.orderInTrip)

  let totalMinutes = 0

  for (let i = 0; i < stops.length; i++) {



    const current = stops[i]

    // זמן התחנה עצמה
    totalMinutes += current.estimatedDuration

    console.log(current.estimatedDuration);
    console.log(totalMinutes);


    const next = stops[i + 1]

    console.log("STOP DEBUG:", {
      index: i,
      type: current.place ? "place" : "route",
      estimatedDuration: current.estimatedDuration,
      estimatedDurationType: typeof current.estimatedDuration,
      mode: current.mode,
      exit: getExitLocation(current),
      nextExit: next ? getEntryLocation(next) : null
    })

    // אם אין תחנה הבאה → אין זמן מעבר
    if (!next) continue

    const loc1 = getExitLocation(current)
    const loc2 = getEntryLocation(next)

    if (!loc1 || !loc2) continue

    const distance = getDistanceKm(
      loc1.lat,
      loc1.lng,
      loc2.lat,
      loc2.lng
    )

    const safeMode = toTravelMode(current.mode ?? 1)

    const travelMinutes = getTravelMinutes(
      distance,
      safeMode
    )

    totalMinutes += travelMinutes
  }

  return Math.round(totalMinutes)
}

function getEntryLocation(stop: any): Location | null {

  if (stop.place) {
    return {
      lat: stop.place.latitude,
      lng: stop.place.longitude
    }
  }

  if (stop.route) {
    return {
      lat: stop.route.latitude,
      lng: stop.route.longitude
    }
  }

  return null
}

function getExitLocation(stop: any): Location | null {

  if (stop.place) {
    return {
      lat: stop.place.latitude,
      lng: stop.place.longitude
    }
  }

  if (stop.route) {
    return {
      lat: stop.route.endLatitude,
      lng: stop.route.endLongitude
    }
  }

  return null
}