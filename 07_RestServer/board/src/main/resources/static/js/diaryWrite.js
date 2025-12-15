// 로그인 체크
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    alert('로그인이 필요합니다.');
    location.href = '/login.html';
}

// 일기 작성 폼 제출
document.getElementById('diaryWriteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const emotion = document.getElementById('emotion').value;

    try {
        const response = await fetch('/api/diaries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberId: user.id,
                title: title,
                content: content,
                emotion: emotion
            })
        });

        const result = await response.text();

        if (response.ok) {
            alert('일기가 작성되었습니다!');
            location.href = '/';
        } else {
            alert(result);
        }
    } catch (error) {
        console.error('일기 작성 실패:', error);
        alert('일기 작성 중 오류가 발생했습니다.');
    }
});
