import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout() {
    const location = useLocation();
    console.log('Layout - current path:', location.pathname);

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <NavBar />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}