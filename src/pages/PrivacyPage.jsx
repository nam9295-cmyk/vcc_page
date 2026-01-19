import { Helmet } from 'react-helmet-async';
import './LegalPage.css';

function PrivacyPage() {
    return (
        <>
            <Helmet>
                <title>개인정보처리방침 | 베리굿초콜릿</title>
                <meta name="description" content="베리굿초콜릿 개인정보처리방침" />
            </Helmet>

            <main className="legal-page">
                <h1>개인정보처리방침</h1>

                <section className="legal-content">
                    <h2>1. 개인정보의 수집 및 이용 목적</h2>
                    <p>
                        베리굿초콜릿(이하 "회사")은 다음의 목적을 위하여 개인정보를 수집 및 이용합니다.
                        수집된 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.
                    </p>
                    <ul>
                        <li>고객 문의 응대 및 상담</li>
                        <li>주문 처리 및 배송</li>
                        <li>이벤트 및 프로모션 안내</li>
                    </ul>

                    <h2>2. 수집하는 개인정보 항목</h2>
                    <p>회사는 다음과 같은 개인정보를 수집합니다.</p>
                    <ul>
                        <li>필수항목: 이름, 이메일 주소</li>
                        <li>선택항목: 연락처, 주소</li>
                    </ul>

                    <h2>3. 개인정보의 보유 및 이용 기간</h2>
                    <p>
                        회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                        단, 관련 법령에 의하여 보존할 필요가 있는 경우에는 해당 기간 동안 보관합니다.
                    </p>

                    <h2>4. 개인정보의 제3자 제공</h2>
                    <p>
                        회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
                        다만, 아래의 경우에는 예외로 합니다.
                    </p>
                    <ul>
                        <li>이용자가 사전에 동의한 경우</li>
                        <li>법령에 의하여 제공이 요구되는 경우</li>
                    </ul>

                    <h2>5. 개인정보 보호 책임자</h2>
                    <p>
                        이메일: contact@verygood-chocolate.com
                    </p>
                </section>
            </main>
        </>
    );
}

export default PrivacyPage;
