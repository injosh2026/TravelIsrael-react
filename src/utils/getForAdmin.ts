import type { AllTripType } from "../types/adminAllTrip.type";

export const getReviewChecks = (trip: AllTripType) => {
  return [
    {
      label: 'שם טיול תקין',
      ok: !!trip.name && trip.name.length > 3
    },
    {
      label: 'אזור מוגדר',
      ok: !!trip.region
    },
    {
      label: 'יש מספיק תחנות (מינימום 3)',
      ok: (trip as any).stops ? (trip as any).stops >= 3 : false
    }
  ];
};

export const getRecommendation = (checks: any[]) => {
  const passed = checks.filter(c => c.ok).length;

  if (passed === checks.length) {
    return {
      text: 'מומלץ לאישור',
      color: 'text-green-600'
    };
  }

  if (passed >= 2) {
    return {
      text: 'אפשר לאשר אבל לבדוק ידנית',
      color: 'text-yellow-600'
    };
  }

  return {
    text: 'לא מומלץ לאישור',
    color: 'text-red-600'
  };
};
