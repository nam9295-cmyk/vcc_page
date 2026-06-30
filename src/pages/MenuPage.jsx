import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { menuSections } from '../data/menuGroups';
import './MenuPage.css';

function MenuPage() {
    const renderMenuCard = (group, index) => {
        const cardContent = (
            <>
                <span className={`menu-card-word ${index % 2 === 1 ? 'is-yellow' : ''}`}>
                    {group.displayWord}
                </span>
                <img src={group.repImage} alt={group.label} loading="lazy" />
                <strong>{group.label}</strong>
                <p>{group.desc}</p>
                <em>{group.products.length} ITEMS</em>
            </>
        );

        if (group.href) {
            return (
                <a
                    className="menu-category-card"
                    href={group.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={group.id}
                >
                    {cardContent}
                </a>
            );
        }

        return (
            <Link
                className="menu-category-card"
                to={`/menu/${group.id}`}
                key={group.id}
            >
                {cardContent}
            </Link>
        );
    };

    return (
        <main className="menu-page">
            <Helmet>
                <title>전체 메뉴 | 베리굿초콜릿</title>
                <meta
                    name="description"
                    content="베리굿초콜릿의 핫초콜릿, 커피, 디톡스 티, 디저트, 케이크 예약 메뉴를 한눈에 확인하세요."
                />
            </Helmet>

            <section className="menu-page-hero" aria-labelledby="menu-page-title">
                <h1 id="menu-page-title" className="billboard-word menu-page-word">MENU</h1>
                <p>베리굿초콜릿 전체 메뉴</p>
            </section>

            <div className="menu-section-groups">
                {menuSections.map((section) => (
                    <section className="menu-group-section" key={section.id} aria-labelledby={`menu-${section.id}`}>
                        <h2 id={`menu-${section.id}`}>{section.label}</h2>
                        <div
                            className={`menu-category-grid ${section.groups.length === 1 ? 'is-single' : ''}`}
                            aria-label={`${section.label} 메뉴`}
                        >
                            {section.groups.map(renderMenuCard)}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}

export default MenuPage;
