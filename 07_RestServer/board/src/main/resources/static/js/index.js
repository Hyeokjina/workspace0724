// 로그인 상태 확인
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // 로그인 상태
        document.getElementById('userNickname').textContent = `${user.nickname}님`;
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('signupBtn').style.display = 'none';
        document.getElementById('writeBtn').style.display = 'inline-block';
        document.getElementById('loginMessage').style.display = 'none';

        // 일기 목록 로드
        loadDiaries(user.id);
    } else {
        // 비로그인 상태
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('signupBtn').style.display = 'inline-block';
        document.getElementById('writeBtn').style.display = 'none';
        document.getElementById('loginMessage').style.display = 'block';
        document.getElementById('diaryList').innerHTML = '';
    }
}

// 로그아웃
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    location.reload();
});

// 일기 목록 로드
async function loadDiaries(memberId) {
    try {
        const response = await fetch(`/api/diaries/member/${memberId}`);
        const diaries = await response.json();

        const diaryList = document.getElementById('diaryList');
        diaryList.innerHTML = '';

        if (diaries.length === 0) {
            diaryList.innerHTML = '<div class="login-message">작성된 일기가 없습니다. 첫 일기를 작성해보세요!</div>';
            return;
        }

        diaries.forEach(diary => {
            const diaryItem = createDiaryItem(diary);
            diaryList.appendChild(diaryItem);
        });
    } catch (error) {
        console.error('일기 목록 로드 실패:', error);
        alert('일기 목록을 불러오는데 실패했습니다.');
    }
}

// 일기 아이템 생성
function createDiaryItem(diary) {
    const div = document.createElement('div');
    div.className = 'diary-item';
    div.onclick = () => location.href = `/diaryDetail.html?id=${diary.id}`;

    const emotionMap = {
        'happy': '😊',
        'excited': '😆',
        'normal': '😐',
        'sad': '😢',
        'angry': '😠',
        'tired': '😴'
    };

    div.innerHTML = `
        <h3>${diary.title}</h3>
        <div class="diary-info">
            <span class="emotion-badge">${emotionMap[diary.emotion] || '😐'}</span>
            <span class="diary-date">${new Date(diary.createdAt).toLocaleDateString('ko-KR')}</span>
        </div>
    `;

    return div;
}

// 페이지 로드 시 실행
checkLoginStatus();
