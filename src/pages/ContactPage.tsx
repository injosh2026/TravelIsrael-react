import { useState } from 'react';
import { Mail, Clock, MessageCircle, Send, CheckCircle2, Sparkles, HeartHandshake, Zap } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'אימייל',
            description: 'support@trip-site.com',
            detail: 'שלחו לנו הודעה ונחזור אליכם בהקדם',
            color: 'from-gray-600 to-gray-900'
        },
        {
            icon: Clock,
            title: 'זמן תגובה',
            description: 'תוך 24 שעות',
            detail: 'בדרך כלל אנחנו עונים אפילו מהר יותר',
            color: 'from-gray-600 to-gray-900'
        },
        {
            icon: MessageCircle,
            title: 'טופס פנייה',
            description: 'מלא את הטופס למטה',
            detail: 'הדרך הכי מהירה לקבל תשובה מפורטת',
            color: 'from-gray-600 to-gray-900'
        }
    ];

    const benefits = [
        {
            icon: HeartHandshake,
            text: 'אנחנו קוראים כל פנייה באופן אישי'
        },
        {
            icon: Zap,
            text: 'תגובה מהירה ומקצועית'
        },
        {
            icon: Sparkles,
            text: 'שירות לקוחות שבאמת אכפת לו'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
            {/* Hero Section */}
            <div className="relative h-[55vh] md:h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop')"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-800/40 to-black/70"></div>
                </div>

                <div className="relative h-full flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full mb-6">
                            <Mail className="w-5 h-5" />
                            <span className="text-sm font-medium">צור קשר</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                            רוצים ליצור איתנו קשר?<br />
                            <span className="font-medium">אנחנו כאן כדי לעזור</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            בין אם יש לכם שאלה, הצעה או צורך בעזרה – נשמח לשמוע מכם ולחזור אליכם בהקדם.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-20">

                {/* Trust Indicators */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-900 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">{benefit.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact Methods */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-full"></div>
                            <Sparkles className="w-6 h-6 text-gray-600" />
                            <div className="w-12 h-1 bg-gradient-to-l from-gray-500 to-gray-900 rounded-full"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">אפשרויות יצירת קשר</h2>
                        <p className="text-gray-600">בחרו את הדרך הנוחה לכם ביותר</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <div className={`inline-flex w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                                    <p className="text-gray-700 font-medium mb-2">{method.description}</p>
                                    <p className="text-sm text-gray-500">{method.detail}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-full"></div>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900">טופס פנייה</h2>
                    </div>

                    {isSubmitted ? (
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-12 text-center">
                            <div className="inline-flex w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full items-center justify-center mb-6 shadow-lg">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">ההודעה נשלחה בהצלחה! </h3>
                            <p className="text-gray-600 text-lg">תודה שיצרתם קשר. נחזור אליכם בהקדם האפשרי.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">שם מלא</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                        placeholder="איך קוראים לך?"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">אימייל</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">נושא</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                    placeholder="על מה תרצו לדבר?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">הודעה</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none"
                                    placeholder="כתבו לנו כל מה שבא לכם... אנחנו מקשיבים "
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
                                <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-800">
                                    <span className="font-semibold">טיפ:</span> ככל שתספקו יותר פרטים, כך נוכל לעזור לכם טוב יותר ומהר יותר
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="group w-full bg-gradient-to-r from-gray-500 to-gray-800 hover:from-gray-600 hover:to-gray-900 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <span>שלח הודעה</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}
                </section>

                {/* Personal Message */}
                <section className="mb-20">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 md:p-10">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-900 rounded-xl flex items-center justify-center">
                                    <HeartHandshake className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">המחויבות שלנו אליכם</h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    חשוב לנו להעניק לכם חוויית שימוש מצוינת, ולכן כל פנייה מטופלת ברצינות ובמהירות. אנחנו קוראים כל הודעה באופן אישי ומשתדלים להגיב בצורה המקיפה ביותר.
                                </p>
                                <p className="text-gray-600 italic">
                                    <span>
                                        האתר שלנו נבנה בשבילכם, וכל משוב, שאלה או הצעה עוזרים לנו להשתפר ולהפוך את הפלטפורמה למקום טוב יותר לכולם.
                                    </span>
                                    <span className="not-italic">🩶</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section>
                    <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gray-100 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl mb-6 shadow-lg">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                                יש לכם רעיון לשיפור?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                נשמח לשמוע! כל הצעה, גדולה או קטנה, עוזרת לנו לבנות פלטפורמה טובה יותר עבורכם.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:support@trip-site.com"
                                    className="group bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-5 h-5" />
                                    שלחו לנו אימייל
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}