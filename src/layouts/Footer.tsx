import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <div className="text-xl font-semibold text-gray-900 mb-4">TravelIsrael</div>
                        <p className="text-sm text-gray-600 leading-relaxed">פלטפורמה לתכנון טיולים יומיים בישראל</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">המוצר</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                            <Link to='/trips' className="block hover:text-gray-900 transition-colors">טיולים</Link>
                            <a href="#" className="block hover:text-gray-900 transition-colors">מקומות</a>
                            <a href="#" className="block hover:text-gray-900 transition-colors">תכנון</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">החברה</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                            <a href="#" className="block hover:text-gray-900 transition-colors">אודות</a>
                            <a href="#" className="block hover:text-gray-900 transition-colors">בלוג</a>
                            <a href="#" className="block hover:text-gray-900 transition-colors">קריירה</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">תמיכה</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                            <a href="#" className="block hover:text-gray-900 transition-colors">עזרה</a>
                            <a href="#" className="block hover:text-gray-900 transition-colors">יצירת קשר</a>
                            <a href="#" className="block hover:text-gray-900 transition-colors">תנאי שימוש</a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                    © 2026 TravelIsrael כל הזכויות שמורות.
                </div>
            </div>
        </footer>
    );
}