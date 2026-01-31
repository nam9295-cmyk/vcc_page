import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import './AdminPage.css';

function AdminPage() {
    const [posts, setPosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        imageUrl: '',
        summary: '',
        mode: 'regular' // 'regular' (default) or 'editorial'
    });

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'vcc2023'; // 환경변수 사용, 없으면 기본값

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const fetchPosts = async () => {
        try {
            const q = query(collection(db, "drink_stories"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);

            const fetchedPosts = [];
            querySnapshot.forEach((doc) => {
                fetchedPosts.push({ id: doc.id, ...doc.data() });
            });

            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleAddPost = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "drink_stories"), {
                ...newPost,
                date: serverTimestamp()
            });

            setNewPost({ title: '', content: '', imageUrl: '', summary: '', mode: 'regular' });
            fetchPosts();
            alert('글이 등록되었습니다.');
        } catch (error) {
            console.error("Error adding post:", error);
            alert('등록에 실패했습니다.');
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await deleteDoc(doc(db, "drink_stories", postId));
            fetchPosts();
            alert('삭제되었습니다.');
        } catch (error) {
            console.error("Error deleting post:", error);
            alert('삭제에 실패했습니다.');
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="admin-page">
                <div className="login-box">
                    <h1>관리자 로그인</h1>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button onClick={handleLogin}>로그인</button>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>관리자 | 베리굿초콜릿</title>
            </Helmet>

            <main className="admin-page">
                <h1>블로그 관리</h1>

                <section className="add-post-section">
                    <h2>새 글 작성</h2>
                    <form onSubmit={handleAddPost}>
                        <input
                            type="text"
                            placeholder="제목"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="이미지 URL"
                            value={newPost.imageUrl}
                            onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="요약"
                            value={newPost.summary}
                            onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                        />
                        <textarea
                            placeholder="내용 (HTML 지원)"
                            rows="10"
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            required
                        ></textarea>
                        <div style={{ margin: '10px 0' }}>
                            <label style={{ marginRight: '10px' }}>게시글 모드: </label>
                            <select
                                value={newPost.mode}
                                onChange={(e) => setNewPost({ ...newPost, mode: e.target.value })}
                                style={{ padding: '5px' }}
                            >
                                <option value="regular">일반 글 (자동 이미지 배치)</option>
                                <option value="editorial">에디토리얼 (매거진 HTML)</option>
                            </select>
                        </div>
                        <button type="submit">등록</button>
                    </form>
                </section>

                <section className="posts-list-section">
                    <h2>게시글 목록</h2>
                    <div className="posts-table">
                        {posts.map(post => (
                            <div key={post.id} className="post-item">
                                <span className="post-title">{post.title}</span>
                                <button onClick={() => handleDeletePost(post.id)} className="delete-btn">삭제</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default AdminPage;
