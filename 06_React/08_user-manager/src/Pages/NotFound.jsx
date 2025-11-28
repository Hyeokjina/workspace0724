import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다</p>
      <button onClick={() => navigate('/')}>홈으로 가기</button>
    </Container>
  );
}

export default NotFound;
