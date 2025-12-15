// 회원가입 폼 제출
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nickname = document.getElementById('nickname').value;

    try {
        const response = await fetch('/api/members/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname
            })
        });

        const result = await response.text();

        if (response.ok) {
            alert('회원가입이 완료되었습니다!');
            location.href = '/login.html';
        } else {
            alert(result);
        }
    } catch (error) {
        console.error('회원가입 실패:', error);
        alert('회원가입 중 오류가 발생했습니다.');
    }
});
