import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const InfoBox = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

function UserDetail({ users, deleteUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <Container>
        <h1>유저를 찾을 수 없습니다</h1>
        <button onClick={() => navigate('/')}>목록으로</button>
      </Container>
    );
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteUser(id);
      navigate('/');
    }
  };

  return (
    <Container>
      <h1>유저 상세 정보</h1>
      <InfoBox>
        <p>이름: {user.name}</p>
        <p>나이: {user.age}세</p>
        <p>상태: {user.status}</p>
      </InfoBox>
      
      <ButtonGroup>
        <button onClick={() => navigate('/')}>목록으로</button>
        <button onClick={handleDelete}>삭제</button>
      </ButtonGroup>
    </Container>
  );
}

export default UserDetail;
