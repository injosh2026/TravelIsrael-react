import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout() {
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