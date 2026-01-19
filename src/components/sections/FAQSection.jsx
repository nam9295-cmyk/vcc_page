import './FAQSection.css';

const faqData = [
    {
        question: '베리굿초콜릿 영업시간은 어떻게 되나요?',
        answer: '평일 오전 8시부터 오후 6시까지 영업합니다 (08:00 - 18:00). 주말 및 공휴일은 휴무이며, 명절 등 특별 휴무일은 공지사항을 확인해주세요.'
    },
    {
        question: '어떤 종류의 초콜릿을 판매하나요?',
        answer: '벨기에산 프리미엄 커버춰 초콜릿을 사용하여 다크쇼콜라, 말차쇼콜라 등 다양한 시그니처 초콜릿 음료를 판매합니다. 특별히 카카오 농도(당도)를 33% 밀크부터 100% 다크까지 취향대로 조절할 수 있어 나만의 초콜릿을 즐길 수 있습니다.'
    },
    {
        question: '베리굿초콜릿 위치가 어디인가요?',
        answer: '대구광역시 수성구 상록로11길 13, 1층에 위치해 있습니다. 네이버 지도에서 \'베리굿초콜릿\'을 검색하시면 쉽게 찾아오실 수 있습니다.'
    },
    {
        question: '온라인으로 주문할 수 있나요?',
        answer: '네, 네이버 스마트스토어(smartstore.naver.com/verygout)에서 온라인 주문이 가능합니다. 선물 세트, 답례품 등 다양한 상품을 구매하실 수 있습니다.'
    },
    {
        question: '답례품이나 맞춤 선물 서비스가 있나요?',
        answer: '네, 결혼 답례품, 기업 선물, 원데이 클래스 등 맞춤 서비스를 제공합니다. 홈페이지 하단의 문의하기를 통해 상담 신청해주세요.'
    }
];

function FAQSection() {
    return (
        <section className="faq-section" aria-labelledby="faq-title">
            <h2 id="faq-title" className="section-title">자주 묻는 질문</h2>
            <div className="faq-container">
                {faqData.map((item, index) => (
                    <details key={index} className="faq-item">
                        <summary>{item.question}</summary>
                        <p className="faq-answer">{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}

export default FAQSection;
