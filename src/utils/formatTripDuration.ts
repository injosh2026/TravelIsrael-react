export function formatTripDuration(hours: number) {
        if (hours <= 0) return "0 שעות";
        // עיגול לשעה הקרובה
        const totalHours = Math.round(hours);

        const days = Math.floor(totalHours / 24);
        const remainingHours = totalHours % 24;

        if (days > 0) {
            const dayText = days === 1 ? "יום" : `${days} ימים`;

            if (remainingHours === 0) return `כ-${dayText}`;

            const hourText =
                remainingHours === 1
                    ? "שעה"
                    : `${remainingHours} שעות`;

            return `כ-${dayText} ו-${hourText}`;
        }

        if (totalHours === 1) return "כ-שעה";
        if (totalHours === 0) return "פחות משעה";

        return `כ-${totalHours} שעות`;
    }