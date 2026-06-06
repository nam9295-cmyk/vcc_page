import { categories, products } from './products';

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));

const makeGroup = ({
    id,
    section,
    label,
    displayWord,
    desc,
    repImage,
    categoryIds,
    aliases = []
}) => {
    const groupProducts = categoryIds.flatMap((categoryId) =>
        (products[categoryId] || []).map((product) => ({
            ...product,
            sourceCategoryId: categoryId,
            sourceCategoryName: categoryById[categoryId]?.name || label
        }))
    );

    return {
        id,
        section,
        label,
        displayWord,
        desc,
        repImage,
        categoryIds,
        aliases,
        products: groupProducts
    };
};

export const menuSections = [
    {
        id: 'drink',
        label: '드링크',
        groups: [
            makeGroup({
                id: 'chocolate',
                section: 'drink',
                label: 'Chocolate',
                displayWord: 'CHOCOLATE',
                desc: '카카오 농도별로 고르는 베리굿초콜릿의 시그니처 핫초콜릿입니다.',
                repImage: '/hero/hero_choco.webp',
                categoryIds: ['hot-chocolate'],
                aliases: ['hot-chocolate']
            }),
            makeGroup({
                id: 'ade',
                section: 'drink',
                label: 'Ade',
                displayWord: 'ADE',
                desc: '카카오 디톡스와 과일 에이드, 아이스티 메뉴입니다.',
                repImage: '/hero/hero_ade.webp',
                categoryIds: ['ade']
            }),
            makeGroup({
                id: 'detox',
                section: 'drink',
                label: 'Detox',
                displayWord: 'DETOX',
                desc: '얼그레이, 피치 우롱, 히비스커스 블렌드 티 메뉴입니다.',
                repImage: '/hero/hero_detox.webp',
                categoryIds: ['cacao-detox-tea'],
                aliases: ['cacao-detox-tea']
            }),
            makeGroup({
                id: 'noncoffee',
                section: 'drink',
                label: 'Noncoffee',
                displayWord: 'NONCOFFEE',
                desc: '논커피 음료와 커피 클래식 메뉴를 함께 확인할 수 있습니다.',
                repImage: '/product/matcha.png',
                categoryIds: ['non-coffee', 'coffee-classics'],
                aliases: ['non-coffee', 'coffee-classics']
            })
        ]
    },
    {
        id: 'dessert',
        label: '디저트',
        groups: [
            makeGroup({
                id: 'bread',
                section: 'dessert',
                label: 'Bread',
                displayWord: 'BREAD',
                desc: '티라미수, 쿠키, 까눌레, 빵오 쇼콜라 등 디저트 메뉴입니다.',
                repImage: '/product/cafe_chocolat.png',
                categoryIds: [
                    'tiramisu',
                    'levain-cookie',
                    'cacao-granola',
                    'pain-au-chocolat',
                    'canele',
                    'chocolat-macaron'
                ],
                aliases: [
                    'tiramisu',
                    'levain-cookie',
                    'cacao-granola',
                    'pain-au-chocolat',
                    'canele',
                    'chocolat-macaron'
                ]
            }),
            makeGroup({
                id: 'dubai',
                section: 'dessert',
                label: 'Dubai',
                displayWord: 'DUBAI',
                desc: '두바이 쫀득쿠키, 두바이 초콜릿, 버터떡 메뉴입니다.',
                repImage: '/product/chocosnow.png',
                categoryIds: ['dubai']
            })
        ]
    },
    {
        id: 'cake',
        label: '케이크',
        groups: [
            makeGroup({
                id: 'cake',
                section: 'cake',
                label: 'Cake',
                displayWord: 'CAKE',
                desc: '시그니처 수제 초콜릿 케이크 예약 주문 메뉴입니다.',
                repImage: '/product/dark_chocolat.png',
                categoryIds: ['cake']
            })
        ]
    }
];

export const menuGroups = menuSections.flatMap((section) => section.groups);

export const findMenuGroup = (id) =>
    menuGroups.find((group) => group.id === id || group.aliases.includes(id));
