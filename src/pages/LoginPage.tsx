import { useState } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService } from "../services/auth.service"
import { setSession } from "../auth/auth.utils"
import { useAuthContext } from "../auth/useAuthContext"

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { setUser } = useAuthContext()
    const handleSubmit = async () => {

        try {

            const response = await loginService({
                email: formData.email,
                password: formData.password
            })
            
            setSession(response.accessToken, response.refreshToken)

            setUser({
                id: response.user.id,
                firstName: response.user.firstName,
                lastName: response.user.lastName,
                email: response.user.email,
                role: response.user.role
            })

            if(response.user.role === "Admin") {
                navigate("/admin/dashboard")
                return
            }
            navigate("/home")

        } catch (error) {
            console.error(error)
            alert("שגיאה בהתחברות")
        }

    }

    return (
        <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4" dir="rtl">
            {/* Background Image - Optional */}
            <div
                className="fixed inset-0 bg-cover bg-center opacity-15"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')"
                }}
            />

            {/* Main Card */}
            <div className="relative w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-[#111827] mb-2">טיולון</h1>
                    <div className="w-12 h-0.5 bg-[#111827] mx-auto"></div>
                </div>

                {/* Login Card */}
                <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-sm p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-light text-[#111827] mb-2">
                            ברוכים השבים
                        </h2>
                        <p className="text-[#6b7280] text-sm">
                            המשיכו לתכנן את הטיול הבא שלכם
                        </p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                        className="space-y-6">
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
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-[#4b5563] cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border-[#d1d5db] rounded-sm"
                                />
                                זכור אותי
                            </label>
                            <a href="#" className="text-[#4b5563] hover:text-[#111827] transition-colors">
                                שכחתי סיסמה
                            </a>
                        </div>

                        <button type="submit"
                            className="w-full bg-[#111827] text-[#ffffff] py-3.5 rounded-sm text-sm font-medium hover:bg-[#1f2937] transition-colors"
                        >
                            התחברות
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-[#6b7280]">
                            אין לך חשבון?{' '}
                            <Link to='/register' className="text-[#111827] font-medium hover:underline">
                                להרשמה
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div className="mt-8 text-center">
                    <Link to='/home'
                        className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        חזרה לדף הבית
                    </Link>
                </div>
            </div>
        </div>
    );
}
