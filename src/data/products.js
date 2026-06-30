// 베리굿초콜릿(very gout) 배민 메뉴판 기준 메뉴 데이터
const price = (delivery, pickup = delivery) => `배달 ${delivery}원\n픽업 ${pickup}원`;

export const products = {
    'hot-chocolate': [
        {
            id: 'dark-57',
            name: '다크 57.9%',
            description: price('6,900', '6,500'),
            image: '/product/dark_chocolat.png'
        },
        {
            id: 'dark-70',
            name: '다크 70.5%',
            description: price('7,500', '7,000'),
            image: '/product/dark_chocolat.png'
        },
        {
            id: 'dark-100',
            name: '다크 100%',
            description: `1컵\n${price('7,900', '7,500')}`,
            image: '/product/dark_chocolat.png'
        },
        {
            id: 'mild-milk',
            name: '마일드 밀크',
            description: `1컵\n${price('7,500', '7,000')}`,
            image: '/product/cafe_chocolat.png'
        }
    ],
    'coffee-classics': [
        { id: 'americano', name: '아메리카노', description: price('3,300', '3,000') },
        { id: 'cafe-latte', name: '카페 라떼', description: price('3,800'), image: '/product/cafe_latte.png' },
        { id: 'vanilla-latte', name: '바닐라 라떼', description: price('4,300'), image: '/product/vanilla_latte.png' },
        { id: 'caramel-latte', name: '카라멜라떼', description: price('4,300'), image: '/product/caramel_latte.png' },
        { id: 'almond-latte', name: '아몬드라떼', description: price('4,300'), image: '/product/almond_latte.png' },
        { id: 'matcha-latte', name: '말차라떼', description: `6500\n${price('6,900')}`, image: '/product/matcha.png' },
        {
            id: 'cafe-mocha',
            name: '카페모카',
            description: `리얼 다크 카페 모카, 에스프레소 2샷 추가\n${price('7,900', '7,500')}`,
            image: '/product/cafe_chocolat.png'
        }
    ],
    'chocolate-box': [
        {
            id: 'ruby-berry-pink-chocolate',
            name: '1+1 루비 베리 핑크 초콜릿',
            description: `[이벤트] 1+1 루비베리 핑크 초콜릿 1박스 60g\n${price('11,000')}`
        }
    ],
    'chocolate-bottle': [
        {
            id: 'almond-dark-chocolate-bottle',
            name: '아몬드 다크 초콜릿 유리병',
            description: `[실속형] 아몬드 다크 초콜릿 유리병 1병 100g\n${price('12,900', '12,000')}`
        }
    ],
    'cacao-detox-tea': [
        { id: 'british-black', name: '브리티쉬블랙', description: '4,500원', image: '/product/british.png' },
        { id: 'asian-gold', name: '아시안골드', description: '4,500원', image: '/product/asiangold.png' },
        { id: 'hibiscus-fruit', name: '히비스커스프룻', description: '4,500원', image: '/product/hibiscus.png' },
        { id: 'minty-chocolat', name: '민티쇼콜라', description: '4,500원', image: '/product/mintychocolat.png' }
    ],
    'non-coffee': [
        { id: 'cacao-milk-tea', name: '카카오 밀크티', description: '6,500원' },
        { id: 'matcha-latte-non-coffee', name: '말차 라떼', description: '6,000원', image: '/product/matcha.png' },
        { id: 'strawberry-latte', name: '딸기 라떼', description: '6,500원' }
    ],
    ade: [
        { id: 'detox-tea-ade', name: '디톡스티 에이드', description: '5,500원' },
        { id: 'cherry-ade', name: '체리에이드', description: '5,000원' },
        { id: 'lemon-ade', name: '레몬에이드', description: '4,500원' },
        { id: 'iced-tea', name: '아이스티', description: '4,000원' }
    ],
    tiramisu: [
        { id: 'classic-tiramisu', name: '클래식 티라미수', description: '7,500원' },
        { id: 'choco-choco-tiramisu', name: '초코 초코 티라미수', description: '8,000원', image: '/product/dark_chocolat.png' },
        { id: 'matcha-dubai-tiramisu', name: '말차 두바이 티라미수', description: '9,000원', image: '/product/matcha.png' },
        { id: 'strawberry-tiramisu', name: '딸기 티라미수', description: '8,000원' },
        { id: 'ube-tiramisu', name: '우베 티라미수', description: '8,500원' }
    ],
    'levain-cookie': [
        {
            id: 'basic-levain-cookie',
            name: '기본 르뱅쿠키',
            description: '4,000원'
        },
        {
            id: 'choco-levain-cookie',
            name: '초코 르뱅쿠키',
            description: '4,500원'
        }
    ],
    'cacao-granola': [
        {
            id: 'cacao-granola',
            name: '카카오 그래놀라 (병선택)',
            description: `[수제] 카카오 그래놀라 1병, 플라스틱 병 220g / 선물용 유리병 180g\n${price('12,900')}`
        }
    ],
    'pain-au-chocolat': [
        {
            id: 'basic-pain-au-chocolat',
            name: '기본 빵오 쇼콜라',
            description: '4,500원'
        },
        {
            id: 'choco-pain-au-chocolat',
            name: '초코 빵오 쇼콜라',
            description: '5,000원'
        }
    ],
    'gateau-au-chocolat': [
        {
            id: 'gateau-au-chocolat-piece',
            name: '가토 오 쇼콜라 조각',
            description: '4,000원'
        }
    ],
    canele: [
        {
            id: 'canele',
            name: '까눌레',
            description: `[당일생산] 겉바속쫀 수제 까눌레, 바닐라/초코 선택\n${price('4,500', '4,000')}`
        }
    ],
    'chocolat-macaron': [
        {
            id: 'marshmallow-smore-stick',
            name: '마시멜로우 스모어스틱',
            description: `[수제] 마시멜로우 스모어스틱 1개\n${price('3,900')}`
        }
    ],
    dubai: [
        {
            id: 'dubai-jjondeuk-cookie',
            name: '두바이 쫀득 쿠키',
            description: '7,500원'
        },
        {
            id: 'dubai-chocolate',
            name: '두바이 초콜릿',
            description: '8,500원'
        },
        {
            id: 'dubai-buttertteok',
            name: '두바이 버터떡',
            description: '9,500원'
        },
        {
            id: 'choco-buttertteok',
            name: '초코 버터떡',
            description: '4,500원'
        }
    ],
    cake: [
        {
            id: 'verygood-handmade-chocolate-cake',
            name: '베리굿 수제 초콜릿 케이크',
            description: `가토 쇼콜라 홀케이크 + 에펠탑 초콜릿 장식 + 고급 리본 패키징\n${price('40,000')}`
        }
    ]
};

export const categories = [
    { id: 'hot-chocolate', name: 'Hot Chocolate', desc: '카카오 농도별로 고르는 베리굿초콜릿의 시그니처 핫초콜릿입니다.', repImage: '/product/dark_chocolat.png' },
    { id: 'coffee-classics', name: 'Coffee Classics', desc: '아메리카노부터 라떼, 카페모카까지 기본 커피 메뉴입니다.', repImage: '/product/cafe_latte.png' },
    { id: 'chocolate-box', name: '초코볼(종이박스)', desc: '선물하기 좋은 박스형 수제 초콜릿입니다.', repImage: '/product/chocosnow.png' },
    { id: 'chocolate-bottle', name: '초코볼(유리병)', desc: '실속형 유리병 패키지 수제 초콜릿입니다.', repImage: '/product/chocosnow.png' },
    { id: 'cacao-detox-tea', name: 'Cacao Detox Tea', desc: '브리티쉬블랙, 아시안골드, 히비스커스프룻, 민티쇼콜라 티 메뉴입니다.', repImage: '/product/british.png' },
    { id: 'non-coffee', name: 'Non Coffee', desc: '카카오 밀크티, 말차 라떼, 딸기 라떼 논커피 음료입니다.', repImage: '/hero/hero_noncoffee.webp' },
    { id: 'ade', name: 'Ade (Iced only)', desc: '카카오 디톡스와 과일 에이드, 아이스티 메뉴입니다.', repImage: '/product/hibiscus.png' },
    { id: 'tiramisu', name: '티라미수', desc: '클래식, 초코, 말차, 딸기, 우베 티라미수입니다.', repImage: '/hero/hero_tiramisu5ea.webp' },
    { id: 'levain-cookie', name: '르뱅쿠키', desc: '기본과 초코로 고르는 르뱅쿠키입니다.', repImage: '/hero/hero_dessert.webp' },
    { id: 'cacao-granola', name: '카카오 그래놀라', desc: '플라스틱 병과 선물용 유리병으로 선택 가능한 수제 그래놀라입니다.', repImage: '/hero/hero_granola.webp' },
    { id: 'pain-au-chocolat', name: '빵오 쇼콜라', desc: '기본과 초코로 고르는 빵오 쇼콜라입니다.', repImage: '/hero/hero_dessert.webp' },
    { id: 'gateau-au-chocolat', name: 'Gâteau au Chocolat', desc: '진한 초콜릿 풍미의 가토 오 쇼콜라 조각입니다.', repImage: '/hero/hero_dessert.webp' },
    { id: 'canele', name: '까눌레', desc: '겉바속쫀 식감의 당일 생산 수제 까눌레입니다.', repImage: '/product/cafe_chocolat.png' },
    { id: 'chocolat-macaron', name: '쇼콜라 마카롱', desc: '수제 마시멜로우 스모어스틱 메뉴입니다.', repImage: '/product/rainbow.png' },
    { id: 'dubai', name: '두바이', desc: '두바이 쫀득 쿠키, 두바이 초콜릿, 두바이 버터떡, 초코 버터떡 메뉴입니다.', repImage: '/hero/hero_dubai3ea.webp' },
    { id: 'cake', name: '예약주문 케이크', desc: '시그니처 수제 초콜릿 케이크 예약 주문 메뉴입니다.', repImage: '/product/dark_chocolat.png' }
];
