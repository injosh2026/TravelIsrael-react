import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getTopTrips } from '../services/trips.service';
import DayTripCard from '../component/DayTripCard';
import type { DayTripType } from '../types/dayTrip.type';

export default function HomePage() {
    const navigate = useNavigate();

    const [featuredTrips, setFeaturedTrips] = useState<DayTripType[]>([]);
    const [selectedImage, setSelectedImage] = useState('');

    // קריאה לשרת לקבלת 3 הטיולים המובילים
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await getTopTrips();
                setFeaturedTrips(data);
            } catch (err) {
                console.error("Error fetching trips:", err);
            }
        };
        fetchTrips();
    }, []);

    return (
        <div className="min-h-screen bg-white -mt-20" dir="rtl">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                            תכנון טיולים<br />במבט אחד
                        </h1>
                        <p className="text-xl text-white/90 mb-12 font-light leading-relaxed">
                            גלו מסלולים מתוכננים, מקומות מומלצים וטיולים<br />שמתאימים בדיוק לצרכים שלכם
                        </p>
                        {/* <button onClick={() => navigate("/tripPlan")} className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-sm text-sm font-medium hover:bg-gray-50 transition-all">
                            תכנן לי מסלול
                            <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button> */}
                        <div className="flex flex-col gap-4">
                            {/* Primary button */}
                            <button
                                onClick={() => navigate("/tripPlan")}
                                className="group inline-flex items-center justify-center gap-3  bg-white text-gray-900 px-8 py-4 max-w-[220px] rounded-md text-sm font-medium hover:bg-gray-50 transition-all"
                            >
                                מצא לי טיול
                                <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Secondary button */}
                            <button
                                onClick={() => navigate('/buildTrip')}
                                // onClick={() => navigate('BuildTrip')}
                                className="group inline-flex items-center justify-center gap-3 bg-white/60 text-gray-800 px-8 py-4 max-w-[220px] rounded-md text-sm font-medium border border-gray-300 hover:bg-white hover:text-gray-900 transition-all"
                            >
                                תכנן טיול אישי
                                <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Trips */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <p className="text-sm text-gray-500 mb-2 font-medium">טיולים נבחרים</p>
                            <h2 className="text-4xl font-light text-gray-900">מומלצים השבוע</h2>
                        </div>
                        <Link to='/trips' className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block">
                            צפה בכל הטיולים
                        </Link>
                    </div>

                    {/* Trips Grid */}
                    <div className="grid grid-cols-1 sm2:grid-cols-2 md2:grid-cols-3 gap-6">
                        {featuredTrips.map((trip, index) => (
                            <div
                                key={trip.id}
                                className={`${index === 2 ? 'sm2:col-span-2' : 'col-span-1'} md2:col-span-1 h-full`}
                            >
                                <DayTripCard trip={trip} />
                            </div>
                        ))}
                    </div>

                </div>
                {/* Lightbox */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage('')}
                    >
                        <img
                            src={selectedImage}
                            alt="תמונה מוגדלת"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}
            </section >

            {/* Stats */}
            < section className="py-24 bg-gray-900" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                        <div>
                            <div className="text-5xl font-light text-white mb-3">500+</div>
                            <div className="text-gray-400 text-md font-medium">מקומות לטיול</div>
                        </div>
                        <div>
                            <div className="text-5xl font-light text-white mb-3">200+</div>
                            <div className="text-gray-400 text-md font-medium">טיולים מתוכננים</div>
                        </div>
                        <div>
                            <div className="text-5xl font-light text-white mb-3">10,000+</div>
                            <div className="text-gray-400 text-md font-medium">משתמשים</div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Features */}
            < section className="py-32 bg-white" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-4xl font-light text-gray-900 mb-6">
                            תכנון פשוט ומדויק
                        </h2>
                        <p className="text-lg text-gray-600 font-light leading-relaxed">
                            כלי התכנון שלנו מאפשר לכם לבנות מסלול טיול מותאם אישית בקלות,
                            עם כל המידע החשוב במקום אחד
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-light text-gray-900 mb-4">מאגר מקומות</h3>
                            <p className="text-gray-600 leading-relaxed">
                                מאות מקומות מומלצים מכל רחבי הארץ עם פרטים מלאים
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-light text-gray-900 mb-4">תכנון חכם</h3>
                            <p className="text-gray-600 leading-relaxed">
                                בנו מסלול יומי מותאם לזמן ולצרכים שלכם
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <Star className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-light text-gray-900 mb-4">דירוגים אמיתיים</h3>
                            <p className="text-gray-600 leading-relaxed">
                                ביקורות והמלצות מקהילת המשתמשים
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA */}
            < section className="py-32 bg-gray-50" >
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-light text-gray-900 mb-6">
                        מוכנים להתחיל?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 font-light">
                        צרו חשבון והתחילו לתכנן את הטיול הבא שלכם היום
                    </p>
                    <button className="bg-gray-900 text-white px-10 py-4 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
                        הצטרף עכשיו
                    </button>
                </div>
            </section >
        </div >
    );
}
