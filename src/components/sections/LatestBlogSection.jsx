import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import BlogCard from '../common/BlogCard';
import './LatestBlogSection.css';

function LatestBlogSection() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestPosts();
    }, []);

    const fetchLatestPosts = async () => {
        try {
            const q = query(collection(db, "drink_stories"), orderBy("date", "desc"), limit(3));
            const querySnapshot = await getDocs(q);

            const fetchedPosts = [];
            querySnapshot.forEach((doc) => {
                fetchedPosts.push({ id: doc.id, ...doc.data() });
            });

            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="latest-blog-section">
            <h2 className="section-title">LATEST STORIES</h2>
            <div className="latest-blog-grid">
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : posts.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>등록된 글이 없습니다.</p>
                ) : (
                    posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))
                )}
            </div>
            <div className="blog-more-btn-wrapper">
                <Link to="/blog" className="blog-more-btn">더보기</Link>
            </div>
        </section>
    );
}

export default LatestBlogSection;
