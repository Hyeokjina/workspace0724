import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

function UserRegistration({ addUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    status: 'online'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.age) {
      newErrors.age = '나이를 입력해주세요';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    addUser({
      name: formData.name,
      age: parseInt(formData.age),
      status: formData.status
    });
    
    navigate('/');
  };

  return (
    <Container>
      <h1>유저 등록</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </FormGroup>

        <FormGroup>
          <label>나이</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p>{errors.age}</p>}
        </FormGroup>

        <FormGroup>
          <label>상태</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="online">온라인</option>
            <option value="offline">오프라인</option>
          </select>
        </FormGroup>

        <ButtonGroup>
          <button type="submit">저장</button>
          <button type="button" onClick={() => navigate('/')}>취소</button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default UserRegistration;
