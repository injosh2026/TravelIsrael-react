// import { Link, Outlet } from "react-router-dom";
// import { useAuthContext } from "../auth/useAuthContext";

// export default function AdminLayout() {

//         const { user } = useAuthContext();
//     return (
//         <div className="min-h-screen flex" dir="rtl">

//             {/* Sidebar */}
//             <div className="w-64 bg-gray-900 text-white">
//                 <div className="p-4 font-bold">
//                     Admin Panel
//                 </div>
//                 <nav className="flex flex-col p-4 gap-2">
//                     <Link to="/admin/dashboard">Dashboard</Link>
//                     <Link to="/admin/trips">Trips</Link>
//                     <Link to="/admin/trips/pending">Pending</Link>
//                     <Link to="/admin/places">Places</Link>
//                     <Link to="/admin/users">Users</Link>
//                     {user?.role === 'Admin' && (
//                             <Link to="/home">
//                                 אזור מנהל
//                             </Link>
//                     )}
//                 </nav>
//                 {/* פה בהמשך תשים לינקים */}
//             </div>

//             {/* Main content */}
//             <div className="flex-1 bg-gray-100 p-6">
//                 <Outlet />
//             </div>

//         </div>
//     );
// }

import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../auth/useAuthContext";
import { LayoutDashboard, Users, MapPin, FileText, Clock, LogOut, Home } from "lucide-react";
import logo from "../assets/TransparentRectangularLogo.png"; // שים לב לנתיב לפי הקובץ שלך

export default function AdminLayout() {
    const { user, logout } = useAuthContext();

    const navItems = [
        { to: "/admin/dashboard", label: "סקירה כללית", icon: LayoutDashboard },
        { to: "/admin/trips", label: "סך הטיולים", icon: FileText },
        { to: "/admin/trips/pending", label: "טיולים ממתינים", icon: Clock },
        { to: "/admin/places", label: "מקומות", icon: MapPin },
        { to: "/admin/users", label: "משתמשים", icon: Users },
    ];

    return (
        <div className="min-h-screen flex" dir="rtl">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-l border-gray-800 text-gray-100 flex flex-col sticky top-0 h-screen">

                {/* Logo */}
                <div className="p-5 text-lg border-b border-gray-800">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-10 object-contain cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)"
                    />
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1 sticky top-0">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom actions */}
                <div className="p-3 border-t border-gray-800 space-y-2">

                    {user?.role === "Admin" && (
                        <Link
                            to="/home"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                        >
                            <Home size={18} />
                            אתר ראשי
                        </Link>
                    )}

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                    >
                        <LogOut size={18} />
                        התנתקות
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1">
                <Outlet />
            </main>

        </div>
    );
}