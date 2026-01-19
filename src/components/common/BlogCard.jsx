import { Link } from 'react-router-dom';
import './BlogCard.css';

function BlogCard({ post }) {
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSummary = () => {
        if (post.summary) return post.summary;
        if (post.content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.content;
            return tempDiv.textContent.substring(0, 80) + '...';
        }
        return '';
    };

    const imageUrl = post.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <Link to={`/blog/${post.id}`} className="blog-card-link">
            <div className="blog-card">
                <div className="blog-thumb-wrapper">
                    <img src={imageUrl} alt={post.title} className="blog-thumb" loading="lazy" />
                </div>
                <div className="blog-content">
                    <h3 className="blog-title">{post.title}</h3>
                    <div className="blog-date">{formatDate(post.date)}</div>
                    <p className="blog-summary">{getSummary()}</p>
                </div>
            </div>
        </Link>
    );
}

export default BlogCard;
