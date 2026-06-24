import { Clock, FileText, MapPin, Users, ArrowLeft, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AdminStatsType } from '../types/adminStats.type';
import { getAdminStats } from '../services/admin.service';
import { Paths } from '../routes/paths';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const adminCards = [
        {
            id: 2,
            title: 'ניהול כל הטיולים',
            description: 'צפה בכל הטיולים הקיימים, סנן לפי סטטוס או משתמש, וערוך במידת הצורך.',
            icon: FileText,
            buttonText: 'לצפייה בכל הטיולים',
            link: `/${Paths.admin}/${Paths.adminTrips}`,
            color: 'from-gray-600 to-gray-900',
            bgColor: 'bg-gray-200',
            iconColor: 'text-gray-700'
        },
        {
            id: 1,
            title: 'ניהול טיולים ממתינים',
            description: 'צפה בטיולים שהמשתמשים יצרו וממתינים לאישור. אפשר לאשר או לדחות טיול.',
            icon: Clock,
            buttonText: 'לניהול טיולים ממתינים',
            link: `/${Paths.admin}/${Paths.adminTripsPending}`,
            color: 'from-gray-600 to-gray-900',
            bgColor: 'bg-gray-200',
            iconColor: 'text-gray-700'
        },
        {
            id: 3,
            title: 'ניהול מקומות',
            description: 'הוסף, ערוך או מחק מקומות לטיולים.',
            icon: MapPin,
            buttonText: 'לניהול מקומות',
            link: `/${Paths.admin}/${Paths.adminPlaces}`,
            color: 'from-gray-600 to-gray-900',
            bgColor: 'bg-gray-200',
            iconColor: 'text-gray-700'
        },
        {
            id: 4,
            title: 'ניהול משתמשים',
            description: 'צפה ברשימת המשתמשים, חסום או מחק משתמש, וצפה בטיולים שיצרו.',
            icon: Users,
            buttonText: 'לניהול משתמשים',
            link: `/${Paths.admin}/${Paths.adminUsers}`,
            color: 'from-gray-600 to-gray-900',
            bgColor: 'bg-gray-200',
            iconColor: 'text-gray-700'
        }
    ];
    const [statsData, setStatsData] = useState<AdminStatsType>({
        pendingTrips: 0,
        totalTrips: 0,
        places: 0,
        users: 0
    })

    const loadStats = async () => {
        try {
            const data = await getAdminStats()
            setStatsData(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadStats()
    }, [])

    // סטטיסטיקות מהירות (אופציונלי)
    const stats = [
        {
            label: 'סך הטיולים',
            value: statsData.totalTrips,
            icon: FileText,
            color: 'text-gray-700',
            bgColor: 'bg-gray-200'
        },
        {
            label: 'טיולים ממתינים',
            value: statsData.pendingTrips,
            icon: Clock,
            color: 'text-gray-700',
            bgColor: 'bg-gray-200'
        },
        {
            label: 'מקומות במערכת',
            value: statsData.places,
            icon: MapPin,
            color: 'text-gray-700',
            bgColor: 'bg-gray-200'
        },
        {
            label: 'משתמשים רשומים',
            value: statsData.users,
            icon: Users,
            color: 'text-gray-700',
            bgColor: 'bg-gray-200'
        }
    ];

    const handleNavigation = (link: string): void => {
        navigate(link);
    };


    return (
        <div className='p-6 bg-gray-100'>
            <div className="min-h-screen bg-[#F9FAFB] rounded-3xl" dir="rtl">
                <div className="max-w-7xl mx-auto px-6 py-12">

                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-10 bg-gradient-to-b from-gray-500 to-gray-900 rounded-full"></div>
                            <h1 className="text-4xl font-bold text-[#111827]">סקירה כללית</h1>
                        </div>
                        <p className="text-[#6b7280] text-lg mr-5">ניהול מרכזי של כל המערכת</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-[#111827] mb-1">
                                        {loading ? '...' : stat.value}
                                    </div>
                                    <div className="text-sm text-[#6b7280]">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {adminCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className="group bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Icon & Title */}
                                    <div className="flex items-start gap-4 mb-4 flex-1">
                                        <div className={`flex-shrink-0 w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <Icon className={`w-7 h-7 ${card.iconColor}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-[#111827] mb-2">
                                                {card.title}
                                            </h2>
                                            <p className="text-sm text-[#6b7280] leading-relaxed">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={() => handleNavigation(card.link)}
                                        className={`w-full bg-gradient-to-r ${card.color} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3 shadow-md hover:shadow-lg`}
                                    >
                                        <span>{card.buttonText}</span>
                                        <ArrowLeft className="w-5 h-5 transition-transform" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-12 bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-300 rounded-2xl p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-[#111827] mb-2">טיפ לניהול יעיל</h3>
                                <p className="text-[#4b5563] leading-relaxed mb-3">
                                    בדוק באופן קבוע את הטיולים הממתינים לאישור כדי לשמור על חוויית משתמש טובה. משתמשים מעריכים תגובה מהירה!
                                </p>
                                {/* <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                                <span>עדכון אחרון: היום בשעה 14:23</span>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}