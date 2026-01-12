// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Firebase 설정값을 여기에 입력하세요.
const firebaseConfig = {
    apiKey: "AIzaSyBCZdp-mfMX8BHu1Wv2BvQVVJVT9E6TT7E",
    authDomain: "verygood-d36c5.firebaseapp.com",
    projectId: "verygood-d36c5",
    storageBucket: "verygood-d36c5.firebasestorage.app",
    messagingSenderId: "789302109242",
    appId: "1:789302109242:web:9c466ca4c5cabba1cdc103",
    measurementId: "G-H6HKSZYN39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const blogGrid = document.getElementById('blog-grid');

// 날짜 포맷팅 함수
function formatDate(timestamp) {
    if (!timestamp) return '';
    // Firestore Timestamp or standard Date object
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 블로그 데이터 가져오기
async function fetchBlogPosts() {
    try {
        const q = query(collection(db, "drink_stories"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        // 로딩 스피너 제거
        blogGrid.innerHTML = '';

        if (querySnapshot.empty) {
            blogGrid.innerHTML = '<div class="loading-spinner">등록된 스토리가 없습니다.</div>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const card = createBlogCard(post, doc.id);
            blogGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching documents: ", error);
        blogGrid.innerHTML = `
            <div class="loading-spinner">
                데이터를 불러오는데 실패했습니다.<br>
                Firebase 설정값을 확인해주세요.
            </div>`;
    }
}

// 블로그 카드 생성 함수
function createBlogCard(post, docId) {
    const cardLink = document.createElement('a');
    cardLink.href = `blog-detail.html?id=${docId}`;
    cardLink.className = 'blog-card-link'; // 스타일링을 위해 클래스 추가 (필요시 CSS 추가)
    cardLink.style.textDecoration = 'none';
    cardLink.style.color = 'inherit';
    cardLink.style.display = 'block';

    const card = document.createElement('div');
    card.className = 'blog-card';

    // 이미지가 없으면 플레이스홀더 사용
    const imageUrl = post.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image';

    // 요약문이 없으면 본문에서 태그 제거하고 앞부분만 자름 (하위 호환성)
    let summaryText = post.summary;
    if (!summaryText && post.content) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.content;
        summaryText = tempDiv.textContent.substring(0, 100) + '...';
    }

    card.innerHTML = `
        <div class="blog-thumb-wrapper">
            <img src="${imageUrl}" alt="${post.title}" class="blog-thumb" loading="lazy">
        </div>
        <div class="blog-content">
            <h3 class="blog-title">${post.title}</h3>
            <div class="blog-date">${formatDate(post.date)}</div>
            <p class="blog-summary">${summaryText || ''}</p>
        </div>
    `;

    cardLink.appendChild(card);
    return cardLink;
}

// 초기화
fetchBlogPosts();
