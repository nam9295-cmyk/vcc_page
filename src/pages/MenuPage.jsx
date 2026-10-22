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

            <section className="menu-page-hero" aria-labelledby="menu-page-title">
                <h1 id="menu-page-title" className="billboard-word menu-page-word">MENU</h1>
                <p>베리굿초콜릿 전체 메뉴</p>
            </section>

            <div className="menu-section-groups">
                {menuSections.map((section) => (
                    <section className={`menu-group-section menu-group-section-${section.id}`} key={section.id} aria-labelledby={`menu-${section.id}`}>
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
