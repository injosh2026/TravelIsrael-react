import { Eye, Check, X as CloseIcon, RotateCcw, BarChart3, Edit3, Trash2, AlertCircle } from 'lucide-react';
import type { AllPlacesType } from '../types/adminPlaces.type';

export const getActionsByStatus = (place: AllPlacesType, handlers: any) => {
    const { onView,
        onApprove,
        onReject,
        onEdit,
        onDelete,
        onRestore,
        onStats,
        onViewReject
    } = handlers;

    switch (place.status) {
        case 'pending':
            return [
                { icon: Eye, action: () => onView(place), label: 'צפייה', color: 'text-blue-600 hover:bg-blue-100' },
                { icon: Check, action: () => onApprove(place), label: 'אשר', color: 'text-green-600 hover:bg-green-100' },
                { icon: CloseIcon, action: () => onReject(place), label: 'דחה', color: 'text-red-600 hover:bg-red-100' },
            ];

        case 'approved':
            return [
                { icon: BarChart3, action: () => onStats(place), label: 'סטטיסטיקות', color: 'text-purple-600 hover:bg-purple-100' },
                { icon: Eye, action: () => onView(place), label: 'צפייה', color: 'text-blue-600 hover:bg-blue-100' },
                { icon: Edit3, action: () => onEdit(place), label: 'ערוך', color: 'text-indigo-600 hover:bg-indigo-100' },
                { icon: Trash2, action: () => onDelete(place), label: 'מחק', color: 'text-red-600 hover:bg-red-100' },
            ];

        case 'rejected':
            return [
                { icon: Eye, action: () => onView(place), label: 'צפייה', color: 'text-blue-600 hover:bg-blue-100' },
                { icon: RotateCcw, action: () => onRestore(place), label: 'שחזר', color: 'text-green-600 hover:bg-green-100' },
                { icon: AlertCircle, action: () => onViewReject(place), label: 'עילת הדחיה', color: 'text-red-600 hover:bg-red-100' },
            ];

        default:
            return [];
    }
};

export const getMobileActions = (place: AllPlacesType, handlers: any) => {
    const { onView,
        onApprove,
        onReject,
        onEdit,
        onDelete,
        onRestore,
        onStats,
        onViewReject
    } = handlers;

    switch (place.status) {
        case 'pending':
            return {
                primary: {
                    label: 'אשר',
                    icon: Check,
                    action: () => onApprove(place),
                    className: 'text-green-700 bg-green-100'
                },
                secondary: [
                    {
                        icon: CloseIcon,
                        action: () => onReject(place),
                        className: 'text-red-600 bg-red-100'
                    },
                    {
                        icon: Eye,
                        action: () => onView(place),
                        className: 'text-blue-600 bg-blue-100'
                    }
                ]
            };

        case 'approved':
            return {
                primary: {
                    label: 'סטטיסטיקות',
                    icon: BarChart3,
                    action: () => onStats(place),
                    className: 'text-purple-700 bg-purple-100'
                },
                secondary: [
                    {
                        icon: Eye,
                        action: () => onView(place),
                        className: 'text-blue-600 bg-blue-100'
                    },
                    {
                        icon: Edit3,
                        action: () => onEdit(place),
                        className: 'text-indigo-600 bg-indigo-100'
                    },
                    {
                        icon: Trash2,
                        action: () => onDelete(place),
                        className: 'text-red-600 bg-red-100'
                    }
                ]
            };

        case 'rejected':
            return {
                primary: {
                    label: 'שחזר',
                    icon: RotateCcw,
                    action: () => onRestore(place),
                    className: 'text-green-700 bg-green-100'
                },
                secondary: [
                    {
                        icon: AlertCircle,
                        action: () => onViewReject(place),
                        className: 'text-red-600 bg-red-100'
                    },
                    {
                        icon: Eye,
                        action: () => onView(place),
                        className: 'text-blue-600 bg-blue-100'
                    }
                ]
            };

        default:
            return { primary: null, secondary: [] };
    }
};