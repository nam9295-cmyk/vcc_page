import { useEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
    const { pathname, hash } = useLocation();
    const navigationType = useNavigationType();
    const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');

    useEffect(() => {
        // 새 페이지는 상단에서 시작하고, 뒤로 가기와 페이지 내 앵커는 유지합니다.
        if (navigationType !== 'POP' && !hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash, navigationType]);

    return (
        <>
            <Header />
            <Outlet />
            {!isAdminRoute && <Footer />}
        </>
    );
}

export default Layout;
