import { Search, Map, MapPin, Heart, User, Compass, Mountain, Route, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    const features = [
        {
            icon: Search,
            title: 'חיפוש טיולים חכם',
            description: 'חיפוש לפי אזור, סוג ופרמטרים נוספים'
        },
        {
            icon: Map,
            title: 'יצירת טיול מותאם אישית',
            description: 'בנה את הטיול המושלם בדיוק לפי הטעם שלך'
        },
        {
            icon: MapPin,
            title: 'שילוב מסלולים ואתרים',
            description: 'צור חוויה ייחודית המשלבת מקומות מעניינים'
        },
        {
            icon: Heart,
            title: 'שמירת מועדפים',
            description: 'שמור טיולים שאהבת לצפייה מהירה בעתיד'
        },
        {
            icon: User,
            title: 'אזור אישי',
            description: 'נהל את הפעילות והטיולים שלך במקום אחד'
        }
    ];

    const benefits = [
        'מערכת חכמה ונוחה לשימוש',
        'מידע מגוון ועדכני',
        'התאמה אישית מלאה',
        'חוויית משתמש מודרנית ונעימה'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
                </div>

                <div className="relative h-full flex items-center justify-center">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full mb-6">
                            <Compass className="w-5 h-5" />
                            <span className="text-sm font-medium">אודות הפרויקט</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                            המקום שבו כל טיול<br />
                            <span className="font-medium">מתחיל להתגשם</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            ברוכים הבאים לפלטפורמת הטיולים שלנו – המקום שבו כל אחד יכול לגלות, לתכנן וליצור טיולים מותאמים אישית בקלות ובנוחות.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-20">

                {/* About Section */}
                <section className="mb-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-full"></div>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900">מי אנחנו</h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Mountain className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    האתר נבנה מתוך <span className="font-semibold text-gray-800">אהבה לטיולים</span> ורצון להנגיש לכל אחד את האפשרות לתכנן יום טיול מושלם.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    המערכת משלבת מידע על מסלולים ומקומות, ומאפשרת ליצור חוויות ייחודיות לפי העדפות אישיות.
                                </p>
                                <p className="text-gray-600 leading-relaxed italic border-r-4 border-gray-300 pr-4">
                                    הפרויקט נבנה כחלק מתהליך למידה והתפתחות בעולם הפיתוח – עם מטרה ברורה להפוך את החוויה של תכנון טיולים למשהו פשוט, נגיש ומהנה.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-full"></div>
                            <Sparkles className="w-6 h-6 text-gray-600" />
                            <div className="w-12 h-1 bg-gradient-to-l from-gray-500 to-gray-900 rounded-full"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">מה אפשר לעשות באתר</h2>
                        <p className="text-gray-600">גלה את כל האפשרויות שהפלטפורמה מציעה</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="w-6 h-6 text-gray-900" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Vision Section */}
                <section className="mb-24">
                    <div className="bg-gradient-to-br from-gray-600 to-gray-900 rounded-3xl shadow-xl p-8 md:p-12 text-white overflow-hidden relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <Route className="w-8 h-8" />
                                <h2 className="text-3xl md:text-4xl font-light">החזון שלנו</h2>
                            </div>
                            <p className="text-xl md:text-2xl leading-relaxed mb-6 text-white/95">
                                אנחנו מאמינים שטיול טוב מתחיל בתכנון חכם.
                            </p>
                            <p className="text-lg leading-relaxed text-white/90">
                                המטרה שלנו היא להפוך את תהליך התכנון לפשוט, נגיש ומהנה – כך שכל אחד יוכל לצאת לטיול שמתאים בדיוק לו. בין אם אתם מטיילים מנוסים או מחפשים השראה ראשונית, הפלטפורמה שלנו כאן כדי ללוות אתכם בכל שלב.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-full"></div>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900">למה לבחור בנו</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-300 transition-all"
                            >
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-gray-900" />
                                </div>
                                <span className="text-gray-700 font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section>
                    <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gray-100 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl mb-6 shadow-lg">
                                <Compass className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                                מוכנים להתחיל?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                הצטרפו אלינו וגלו עולם של טיולים חדשים – הכל במקום אחד.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="group bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    התחל לחקור טיולים
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-white/20 backdrop-blur-sm">
                                    צור קשר
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}