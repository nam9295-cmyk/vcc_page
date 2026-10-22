import './FAQSection.css';

import { mochiFaq } from '../../data/store';

function FAQSection() {
    return (
        <section className="faq-section" aria-labelledby="faq-title">
            <h2 id="faq-title" className="section-title">자주 묻는 질문</h2>
            <div className="faq-container">
                {mochiFaq.map((item, index) => (
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
