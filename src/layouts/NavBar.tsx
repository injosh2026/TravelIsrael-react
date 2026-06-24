import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { IoHeartOutline } from 'react-icons/io5';
import { useAuthContext } from '../auth/useAuthContext';
import logo from "../assets/TransparentRectangularLogo.png";

export default function NavBar() {
    const navigate = useNavigate();
    const { user, logout} = useAuthContext();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <Link to="/home" className="flex items-center bg-gray-900 px-2 py-1 rounded">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-10 object-contain cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)"
                    />
                </Link>

                <div className="flex md:flex items-center gap-12 text-sm">
                    <Link to='/trips' className="text-gray-600 hover:text-gray-900 transition-colors">טיולים</Link>
                    <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">אודות</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">יצירת קשר</Link>
                    {user?.role === 'Admin' && (
                            <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                                אזור מנהל
                            </Link>
                    )}
                </div>

                {user ? (
                    <div className="relative" ref={menuRef}>
                        <div
                            onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                            className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center cursor-pointer select-none"
                        >
                            {user.firstName ? user.firstName.charAt(0) : <User className="w-6 h-6 text-white" />}
                        </div>

                        {open && (
                            <div className="absolute top-full mt-2 left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <div className="flex flex-col items-center py-3 px-2 mt-2">
                                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb">
                                        {user.firstName ? user.firstName.charAt(0) : <User className="w-6 h-6 text-white" />}
                                    </div>
                                    <span className="mt-2 text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                                </div>

                                <div className="border-t border-gray-200 my-2"></div>

                                <button
                                    onClick={() => { navigate("/me"); setOpen(false); }}
                                    className="w-full flex items-center justify-between text-right px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    האזור האישי <User className="w-5 h-5 text-gray-500" />
                                </button>

                                <button
                                    onClick={() => { navigate("/my-trips"); setOpen(false); }}
                                    className="w-full flex items-center justify-between text-right px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    הטיולים שלי <IoHeartOutline className="w-5 h-5 text-gray-500" />
                                </button>

                                <div className="border-t my-1"></div>

                                <button
                                    onClick={() => { logout(); setOpen(false); }}
                                    className="w-full flex items-center justify-between text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    התנתקות <LogOut className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="group inline-flex items-center gap-3 bg-white/90 text-gray-900 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 hover:shadow-lg hover:scale-105 transition-all"
                    >
                        התחבר
                    </button>
                )}
            </div>
        </nav>
    );
}
