// 로그인 체크
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    alert('로그인이 필요합니다.');
    location.href = '/login.html';
}

// URL에서 일기 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const diaryId = urlParams.get('id');

let currentDiary = null;

// 감정 매핑
const emotionMap = {
    'happy': '😊 행복해요',
    'excited': '😆 신나요',
    'normal': '😐 평범해요',
    'sad': '😢 슬퍼요',
    'angry': '😠 화나요',
    'tired': '😴 피곤해요'
};

// 일기 상세 정보 로드
async function loadDiary() {
    try {
        const response = await fetch(`/api/diaries/${diaryId}`);

        if (!response.ok) {
            alert('일기를 찾을 수 없습니다.');
            location.href = '/';
            return;
        }

        currentDiary = await response.json();

        // 일기 정보 표시
        document.getElementById('diaryTitle').textContent = currentDiary.title;
        document.getElementById('diaryEmotion').textContent = emotionMap[currentDiary.emotion] || '😐';
        document.getElementById('diaryDate').textContent = new Date(currentDiary.createdAt).toLocaleString('ko-KR');
        document.getElementById('diaryContent').textContent = currentDiary.content;

    } catch (error) {
        console.error('일기 로드 실패:', error);
        alert('일기를 불러오는데 실패했습니다.');
        location.href = '/';
    }
}

// 수정 버튼 클릭
function editDiary() {
    // 상세 정보 숨기고 수정 폼 표시
    document.querySelector('.diary-detail').style.display = 'none';
    document.getElementById('editForm').style.display = 'block';

    // 폼에 기존 데이터 채우기
    document.getElementById('editTitle').value = currentDiary.title;
    document.getElementById('editContent').value = currentDiary.content;
    document.getElementById('editEmotion').value = currentDiary.emotion;
}

// 수정 취소
function cancelEdit() {
    document.querySelector('.diary-detail').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
}

// 일기 수정 폼 제출
document.getElementById('diaryEditForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('editTitle').value;
    const content = document.getElementById('editContent').value;
    const emotion = document.getElementById('editEmotion').value;

    try {
        const response = await fetch(`/api/diaries/${diaryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
                emotion: emotion
            })
        });

        const result = await response.text();

        if (response.ok) {
            alert('일기가 수정되었습니다!');
            location.reload();
        } else {
            alert(result);
        }
    } catch (error) {
        console.error('일기 수정 실패:', error);
        alert('일기 수정 중 오류가 발생했습니다.');
    }
});

// 일기 삭제
async function deleteDiary() {
    if (!confirm('정말로 이 일기를 삭제하시겠습니까?')) {
        return;
    }

    try {
        const response = await fetch(`/api/diaries/${diaryId}`, {
            method: 'DELETE'
        });

        const result = await response.text();

        if (response.ok) {
            alert('일기가 삭제되었습니다.');
            location.href = '/';
        } else {
            alert(result);
        }
    } catch (error) {
        console.error('일기 삭제 실패:', error);
        alert('일기 삭제 중 오류가 발생했습니다.');
    }
}

// 페이지 로드 시 일기 정보 로드
loadDiary();
