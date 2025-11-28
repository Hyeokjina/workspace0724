import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const UserItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

function UserList({ users }) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>유저 목록</h1>
      <button onClick={() => navigate('/user')}>유저 등록</button>
      
      <div>
        {users.map(user => (
          <UserItem key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
            {user.name} ({user.age}세) - {user.status}
          </UserItem>
        ))}
      </div>
    </Container>
  );
}

export default UserList;
