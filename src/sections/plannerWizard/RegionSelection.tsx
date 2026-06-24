import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import type { AppDispatch, RootState } from '../../redux/store';
import { fetchLookups } from '../../redux/slices/lookups/lookups.thunk';

type Props = {
    value: number | null;
    onChange: (value: number) => void;
};

export default function RegionSelection({ value, onChange }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const lookups = useSelector((state: RootState) => state.lookups.data);
    const isLoaded = useSelector((state: RootState) => state.lookups.isLoaded);

    const [expandedRegions, setExpandedRegions] = useState<number[]>([]);

    useEffect(() => {
        dispatch(fetchLookups());
    }, [dispatch]);

    useEffect(() => {
        if (lookups?.regions) {
            const rootIds = lookups.regions
                .filter(r => !r.parentRegionId)
                .map(r => r.id);

            setExpandedRegions(rootIds);
        }
    }, [lookups]);

    if (!isLoaded)
        return <div className="min-h-screen bg-[#f9fafb] pt-20">טוען...</div>;

    const getBorderColor = (level: number) => {
        switch (level) {
            case 0:
                return 'border-[#e5e7eb]'; // הכי בהיר
            case 1:
                return 'border-[#d1d5db]';
            case 2:
                return 'border-[#9ca3af]';
            default:
                return 'border-[#6b7280]'; // עמוק יותר
        }
    };

    const getBackgroundByLevel = (level: number) => {
        switch (level) {
            case 0:
                return 'bg-white';
            case 1:
                return 'bg-[#f9fafb]';
            case 2:
                return 'bg-[#f3f4f6]';
            default:
                return 'bg-[#e5e7eb]';
        }
    };

    const toggleRegion = (id: number) => {
        setExpandedRegions(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const renderRegions = (parentId: number | null, level = 0) => {
        const isRoot = parentId === null;
        return lookups?.regions
            .filter(r => r.parentRegionId === parentId)
            .map(region => {
                const hasChildren = lookups?.regions.some(
                    r => r.parentRegionId === region.id
                );

                const isExpanded = expandedRegions.includes(region.id);

                return (
                    <div key={region.id}>
                        <div
                            className={`flex items-center justify-between p-4 border-2 rounded-sm cursor-pointer transition-all mb-1
                        ${value === region.id
                                    ? 'border-[#111827] bg-[#eef2ff] shadow-sm scale-[1.01]'
                                    : `${getBackgroundByLevel(level)} ${getBorderColor(level)}`
                                }
                        hover:shadow-sm`}
                            style={{ marginRight: level * 20 }}
                            onClick={() => onChange(region.id)}
                        >
                            {region.regionName}

                            {hasChildren && !isRoot && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleRegion(region.id);
                                    }}
                                >
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                            )}
                        </div>

                        {hasChildren && isExpanded && (
                            <div className="mt-2">
                                {renderRegions(region.id, level + 1)}
                            </div>
                        )}
                    </div>
                );
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-light text-[#111827] mb-2">באיזה אזור תרצו לטייל?</h2>
            <p className="text-[#6b7280] mb-8">בחרו את האזור המועדף עליכם</p>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                <div className="w-full space-y-3">
                    {renderRegions(null)}
                </div>
            {/* </div> */}
        </div>
    );
}