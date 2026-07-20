import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
    const { pathname } = useLocation();
    const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');

    return (
        <>
            <Header />
            <Outlet />
            {!isAdminRoute && <Footer />}
        </>
    );
}

export default Layout;
