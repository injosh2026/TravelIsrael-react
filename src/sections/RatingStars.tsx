import { Star } from "lucide-react";

type Props = {
  rating: number;
};

export default function RatingStars({ rating }: Props) {
  
  return (
  <div dir="rtl" className="flex items-center gap-1">

    {[1,2,3,4,5].map((star) => {

      const fillPercent = Math.max(
        0,
        Math.min(1, rating - (star - 1))
      ) * 100;

      return (
        <div key={star} className="relative w-5 h-5">

          {/* כוכב אפור בסיס */}
          <Star className="absolute w-5 h-5 text-gray-300" />

          {/* מילוי מדויק */}
          <div
            className="absolute top-0 right-0 overflow-hidden"
            style={{ width: `${fillPercent}%` }}
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform hover:scale-110" />
          </div>

        </div>
      );
    })}

      {/* <span className="ml-1 text-gray-800 font-semibold">
        {rating.toFixed(1)}
      </span> */}
    </div>
  );
}