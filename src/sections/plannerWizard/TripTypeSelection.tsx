import type { TypeType } from "../../types/type.type";

type Props = {
    value: number | null;
    onChange: (value: number) => void;
    options: TypeType[];
};

export default function TripTypeSelection({
    value,
    onChange,
    options
}: Props) {
    return (
        <div>
            <h2 className="text-3xl font-light text-[#111827] mb-2">
                סוג הטיול
            </h2>

            <div className="space-y-4 mt-8">
                {options.map(option => (
                    <button
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={`w-full p-6 rounded-sm border-2 transition-all text-right ${
                            value === option.id
                                ? "border-[#111827] bg-[#eef2ff] shadow-sm scale-[1.01]"
                                : "border-[#e5e7eb] hover:border-[#d1d5db]"
                        }`}
                    >
                        <div>
                            <div className="font-medium mb-1">
                                {option.typeName}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}