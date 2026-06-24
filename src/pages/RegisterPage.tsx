import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/useAuthContext';
import { setSession } from '../auth/auth.utils';
import { register as registerService } from "../services/auth.service"

export default function RegisterPage() {
    
    const navigate = useNavigate();
    const { setUser } = useAuthContext();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

     const handleSubmit = async () => {

        if (formData.password !== formData.confirmPassword) {
            alert("הסיסמאות אינן תואמות");
            return;
        }
        try {

            const response = await registerService({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            setSession(response.accessToken, response.refreshToken);
            setUser({
                id: response.user.id,
                firstName: response.user.firstName,
                lastName: response.user.lastName,
                email: response.user.email,
                role: response.user.role
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("שגיאה בהרשמה");
        }
    };


    return (
        <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4" dir="rtl">
            {/* Background Image - Optional */}
            <div
                className="fixed inset-0 bg-cover bg-center opacity-15"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&h=1080&fit=crop')"
                }}
            />

            {/* Main Card */}
            <div className="relative w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-[#111827] mb-2">טיולון</h1>
                    <div className="w-12 h-0.5 bg-[#111827] mx-auto"></div>
                </div>

                {/* Sign Up Card */}
                <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-sm p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-light text-[#111827] mb-2">
                            מתחילים לטייל חכם
                        </h2>
                        <p className="text-[#6b7280] text-sm">
                            הרשמה קצרה ויוצאים לדרך
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                                שם פרטי
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 pr-11 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors"
                                    placeholder="השם הפרטי"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                                שם משפחה
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 pr-11 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors"
                                    placeholder="השם משפחה"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                                אימייל
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 pr-11 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors"
                                    placeholder="your@email.com"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                                סיסמה
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 pr-11 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors"
                                    placeholder="לפחות 8 תווים"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#4b5563] mb-2 font-medium">
                                אימות סיסמה
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-3 pr-11 bg-[#ffffff] border border-[#d1d5db] rounded-sm text-[#111827] focus:outline-none focus:border-[#111827] transition-colors"
                                    placeholder="חזור על הסיסמה"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#111827] text-[#ffffff] py-3.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors mt-6"
                        >
                            יצירת חשבון
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-[#6b7280]">
                            כבר יש לך חשבון?{' '}
                            <Link to="/login" className="text-[#111827] font-medium hover:underline">
                                להתחברות
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div className="mt-8 text-center">
                    <Link to="/"
                        className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        חזרה לדף הבית
                    </Link>
                </div>

                {/* Terms */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                        בהרשמה אתם מסכימים ל
                        <a href="#" className="underline hover:text-[#6b7280]">תנאי השימוש</a>
                        {' '}
                        <a href="#" className="underline hover:text-[#6b7280]">מדיניות הפרטיות</a>
                    </p>
                </div>
            </div>
        </div>
    );
}