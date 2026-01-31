import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import './BlogDetailPage.css';

const normalizeHtml = (htmlContent) => {
    if (!htmlContent) return '';
    // 만약 전체 HTML 문서가 들어오면 body 내부만 추출
    if (htmlContent.includes('<html') || htmlContent.includes('<body')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        return doc.body.innerHTML;
    }
    return htmlContent;
};

function BlogDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    // 이미지 지그재그 레이아웃 적용
    useEffect(() => {
        if (!post || !contentRef.current) return;
        // 에디토리얼 모드면 자동 이미지 배치 로직 스킵
        if (post.mode === 'editorial') return;

        const images = contentRef.current.querySelectorAll('img');

        images.forEach((img, index) => {
            // 기존 클래스 제거
            img.classList.remove('img-hero', 'img-left', 'img-right');

            if (index === 0) {
                // 첫 번째 이미지: Hero (전폭)
                img.classList.add('img-hero');
            } else {
                // 각 이미지 앞에 clear 요소 삽입 (겹침 방지)
                if (!img.previousElementSibling?.classList?.contains('img-clearfix')) {
                    const clearDiv = document.createElement('div');
                    clearDiv.style.clear = 'both';
                    clearDiv.style.height = '0';
                    clearDiv.className = 'img-clearfix';
                    img.parentNode.insertBefore(clearDiv, img);
                }

                // 나머지 이미지: 홀수(1,3,5...)는 left, 짝수(2,4,6...)는 right
                if (index % 2 === 1) {
                    img.classList.add('img-left');
                } else {
                    img.classList.add('img-right');
                }
            }
        });
    }, [post]);

    const fetchPost = async () => {
        try {
            const docRef = doc(db, "drink_stories", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPost({ id: docSnap.id, ...docSnap.data() });
            }
        } catch (error) {
            console.error("Error fetching post:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="loading-page">Loading...</div>;
    }

    if (!post) {
        return (
            <div className="not-found">
                <h1>글을 찾을 수 없습니다</h1>
                <Link to="/blog">블로그로 돌아가기</Link>
            </div>
        );
    }

    const getSummary = () => {
        if (post.summary) return post.summary;
        if (post.content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.content;
            return tempDiv.textContent.substring(0, 150) + '...';
        }
        return '베리굿초콜릿 블로그 글';
    };

    return (
        <>
            <Helmet>
                <title>{post.title} | 베리굿초콜릿 블로그</title>
                <meta name="description" content={getSummary()} />
                <link rel="canonical" href={`https://kr.verygood-chocolate.com/blog/${id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${post.title} | 베리굿초콜릿 블로그`} />
                <meta property="og:description" content={getSummary()} />
                {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
            </Helmet>

            <article className="blog-detail-section">
                <div className="post-container">
                    <div className="post-header">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-date">{formatDate(post.date)}</div>
                    </div>

                    <div
                        ref={contentRef}
                        className={`post-content ${post.mode === 'editorial' ? 'editorial' : ''}`}
                        dangerouslySetInnerHTML={{
                            __html: post.mode === 'editorial' ? normalizeHtml(post.content) : post.content
                        }}
                    />
                </div>

                <div className="back-btn-container">
                    <Link to="/blog" className="back-btn">← 목록으로 돌아가기</Link>
                </div>
            </article>
        </>
    );
}

export default BlogDetailPage;
