import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { findMenuGroup, menuGroups } from '../data/menuGroups';
import AdeMenuPage from './AdeMenuPage';
import ChocolateMenuPage from './ChocolateMenuPage';
import './MenuPage.css';

function MenuDetailPage() {
    const { categoryId } = useParams();
    const group = findMenuGroup(categoryId);
    const productList = group?.products || [];
    const groupIndex = menuGroups.findIndex((item) => item.id === group?.id);
    const isYellow = groupIndex % 2 === 1 || group?.section === 'dessert';

    if (!group) {
        return (
            <main className="menu-page menu-not-found">
                <Helmet>
                    <title>메뉴를 찾을 수 없습니다 | 베리굿초콜릿</title>
                </Helmet>
                <h1 className="billboard-word menu-page-word">MENU</h1>
                <p>요청한 메뉴 카테고리를 찾을 수 없습니다.</p>
                <Link className="outline-button" to="/menu">전체 메뉴 보기</Link>
            </main>
        );
    }

    if (group.id === 'chocolate') {
        return <ChocolateMenuPage group={group} />;
    }

    if (group.id === 'ade') {
        return <AdeMenuPage group={group} />;
    }

    return (
        <main className="menu-page menu-detail-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="menu-detail-hero" aria-labelledby="menu-detail-title">
                <h1
                    id="menu-detail-title"
                    className={`billboard-word menu-detail-word ${isYellow ? 'is-yellow' : ''}`}
                >
                    {group.displayWord}
                </h1>

                <div className="menu-detail-feature">
                    <img src={group.repImage} alt={group.label} />
                    <div className="menu-detail-copy">
                        <Link className="menu-back-link" to="/menu">전체 메뉴</Link>
                        <p className="category-tag">{group.section}</p>
                        <h2>{group.label}</h2>
                        <p>{group.desc}</p>
                    </div>
                </div>
            </section>

            <section className="menu-detail-products" aria-label={`${group.label} 제품 목록`}>
                {productList.map((product) => (
                    <ProductCard key={`${product.sourceCategoryId}-${product.id}`} product={product} />
                ))}
            </section>
        </main>
    );
}

export default MenuDetailPage;
