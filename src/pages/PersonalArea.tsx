import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";
import { changePassword, getUserStatistics, updateProfile, type PasswordType } from "../services/auth.service";

type InputFieldProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    rightElement?: React.ReactNode;
};

type StatCardProps = {
    label: string;
    value: string | number;
};

type ShowPasswordState = {
    current: boolean;
    newPass: boolean;
    confirm: boolean;
};

type ProfileState = {
    firstName: string;
    lastName: string;
    email: string;
};

type PasswordState = {
    current: string;
    newPass: string;
    confirm: string;
};

type EyeIconProps = {
    open: boolean;
};

type AlertProps = {
    message: string;
    type: "success" | "error";
};

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
);

const ErrorIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10 3a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Z" />
        <circle cx="10" cy="15" r="1" />
    </svg>
);

const EyeIcon = ({ open }: EyeIconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        )}
    </svg>
);

const AlertMessage = ({ message, type }: AlertProps) => {
    const styles =
        type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-red-50 border-red-200 text-red-700";

    const Icon = type === "success" ? CheckIcon : ErrorIcon;
    return (
        <div
            style={{ animation: "fadeIn 0.3s ease" }}
            className={`flex items-center gap-2 border px-4 py-3 rounded-xl text-sm font-medium ${styles}`}
        >
            <Icon />
            {message}
        </div>
    );
};

const InputField = ({ label, type = "text", value, onChange, placeholder, rightElement }: InputFieldProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-500">{label}</label>
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all bg-gray-50/60 hover:bg-white"
            />
            {rightElement && (
                <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {rightElement}
                </button>
            )}
        </div>
    </div>
);

const StatCard = ({ label, value }: StatCardProps) => (
    <div className="flex flex-col items-center gap-1 px-5">
        <span className="text-2xl font-bold text-gray-900 tabular-nums leading-none">{value}</span>
        <span className="text-xs text-gray-400 text-center leading-tight">{label}</span>
    </div>
);

export default function PersonalArea() {
    const { user, setUser } = useAuthContext()
    const [profile, setProfile] = useState<ProfileState>({ firstName: "", lastName: "", email: "" });
    const [passwords, setPasswords] = useState<PasswordState>({ current: "", newPass: "", confirm: "" });
    const [showPw, setShowPw] = useState<ShowPasswordState>({ current: false, newPass: false, confirm: false });
    const [alert, setAlert] = useState<{
        message: string;
        type: "success" | "error";
        section: "profile" | "password";
    } | null>(null);
    const [stats, setStats] = useState({
        joinDate: "",
        trips: 0,
        views: 0
    });

    useEffect(() => {
        if (!user) return;

        setProfile({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    }, [user]);

    useEffect(() => {
        if (!alert) return;

        const timer = setTimeout(() => {
            setAlert(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [alert]);

    useEffect(() => {

    const loadStats = async () => {
        try {

            const data = await getUserStatistics();

            setStats({
                joinDate: new Date(data.joinDate).toLocaleDateString("he-IL", {
                    month: "short",
                    year: "2-digit"
                }),
                trips: data.tripsCreated,
                views: data.tripsViews
            });

        } catch (err) {
            console.error(err);
        }
    };

    loadStats();

}, []);

    const handleProfileSave = async () => {
        try {
            const updatedUser = await updateProfile(profile) // ניצור כזה endpoint
            setUser(updatedUser) // לעדכן קונטקסט
            setAlert({
                message: "הפרטים עודכנו בהצלחה",
                type: "success",
                section: "profile",
            });
        } catch {
            setAlert({
                message: "עדכון הפרטים נכשל",
                type: "error",
                section: "profile",
            });
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwords.newPass.length < 6) {
            setAlert({
                message: "הסיסמה חייבת להכיל לפחות 6 תווים",
                type: "error",
                section: "password",
            });
            return;
        }

        if (passwords.newPass !== passwords.confirm) {
            setAlert({
                message: "הסיסמאות אינן תואמות",
                type: "error",
                section: "password",
            });
            return;
        }

        try {
            const password: PasswordType = {
                currentPassword: passwords.current,
                newPassword: passwords.newPass,
            }
            await changePassword(password)
            setPasswords({ current: "", newPass: "", confirm: "" });
            setAlert({
                message: "הסיסמה עודכנה בהצלחה",
                type: "success",
                section: "password",
            });
        } catch {
            setAlert({
                message: "עדכון הסיסמה נכשל",
                type: "error",
                section: "password",
            });
        }
    };

    const statistics = [
        { label: "תאריך הצטרפות", value: stats.joinDate  },
        { label: "טיולים שנוצרו", value: stats.trips  },
        { label: "צפיות בטיולים", value: stats.views },
    ];

    return (
        <div className="" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", background: "linear-gradient(145deg, #f5f6f8 0%, #eef0f4 100%)", minHeight: "100vh" }}>
            <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />


            <div className="max-w-3xl mx-auto px-4 py-12">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">האזור האישי שלי</h1>
                    <p className="text-gray-400 text-sm font-light">כאן ניתן לצפות ולעדכן את הפרטים האישיים שלך ולנהל את הגדרות החשבון</p>
                </div>
                <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .btn-primary {
          background: #111827;
          color: white;
          padding: 10px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .btn-primary:hover {
          background: #374151;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .btn-primary:active {
          transform: translateY(0);
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .stat-divider { width: 1px; background: #e5e7eb; height: 36px; align-self: center; }
      `}</style>

                {/* Profile Hero Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border-2 border-gray-200">
                            <UserIcon />
                        </div>

                        {/* Name & Email */}
                        <div className="flex-1 min-w-0">
                            <p className="text-2xl font-bold text-gray-900 leading-tight">{profile.firstName} {profile.lastName}</p>
                            <p className="text-sm text-gray-400 mt-1">{profile.email}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-0 border-t sm:border-t-0 sm:border-r border-gray-100 pt-5 sm:pt-0 sm:pr-6 w-full sm:w-auto">
                            {statistics.map((s, i) => (
                                <div key={s.label} className="flex items-center">
                                    {i > 0 && <div className="stat-divider mx-1" />}
                                    <StatCard label={s.label} value={s.value} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Personal Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-4">
                    <h2 className="text-base font-semibold text-gray-800 mb-6">פרטים אישיים</h2>

                    {alert?.section === "profile" && (
                        <AlertMessage message={alert.message} type={alert.type} />
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <InputField
                            label="שם פרטי"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            placeholder="שם פרטי"
                        />
                        <InputField
                            label="שם משפחה"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            placeholder="שם משפחה"
                        />
                    </div>

                    <div className="mb-7">
                        <InputField
                            label="כתובת מייל"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            placeholder="your@email.com"
                        />
                    </div>
                    <div dir="ltr" className="flex justify-start">

                        <button className="btn-primary" onClick={handleProfileSave}>שמור שינויים</button>
                    </div>
                </div>

                {/* Password Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-base font-semibold text-gray-800 mb-6">שינוי סיסמה</h2>

                    {alert?.section === "password" && (
                        <AlertMessage message={alert.message} type={alert.type} />
                    )}
                    
                    <div className="flex flex-col gap-5 mb-4">
                        <InputField
                            label="סיסמה נוכחית"
                            type={showPw.current ? "text" : "password"}
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                            placeholder="הזן סיסמה נוכחית"
                            rightElement={<span onClick={() => setShowPw({ ...showPw, current: !showPw.current })}><EyeIcon open={showPw.current} /></span>}
                        />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-6" />

                    <div className="flex flex-col gap-5 mb-7">
                        <InputField
                            label="סיסמה חדשה"
                            type={showPw.newPass ? "text" : "password"}
                            value={passwords.newPass}
                            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                            placeholder="הזן סיסמה חדשה"
                            rightElement={<span onClick={() => setShowPw({ ...showPw, newPass: !showPw.newPass })}><EyeIcon open={showPw.newPass} /></span>}
                        />
                        <InputField
                            label="אימות סיסמה חדשה"
                            type={showPw.confirm ? "text" : "password"}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            placeholder="הזן שוב את הסיסמה החדשה"
                            rightElement={<span onClick={() => setShowPw({ ...showPw, confirm: !showPw.confirm })}><EyeIcon open={showPw.confirm} /></span>}
                        />
                    </div>

                    <div dir="ltr" className="flex justify-start">
                        <button className="btn-primary" onClick={handlePasswordUpdate}>
                            עדכן סיסמה
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}