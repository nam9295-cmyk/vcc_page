import { useState } from 'react';
import './ContactSection.css';

function ContactSection() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/mwvveyoj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setSubmitMessage('문의가 성공적으로 전송되었습니다!');
                setFormState({ name: '', email: '', message: '' });
            } else {
                setSubmitMessage('전송에 실패했습니다. 다시 시도해주세요.');
            }
        } catch {
            setSubmitMessage('오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <h2 className="section-title">CONTACT US</h2>
            <div className="contact-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="이름"
                            value={formState.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={formState.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="메시지를 입력해주세요"
                            rows="5"
                            value={formState.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? '전송 중...' : '문의하기'}
                    </button>
                    {submitMessage && <p className="submit-message">{submitMessage}</p>}
                </form>
            </div>
        </section>
    );
}

export default ContactSection;
