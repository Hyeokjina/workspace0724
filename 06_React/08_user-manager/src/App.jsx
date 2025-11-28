import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './Pages/UserList';
import UserDetail from './Pages/UserDetail';
import UserRegistration from './Pages/UserRegistration';
import NotFound from './Pages/NotFound';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== parseInt(id)));a
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path="/user" element={<UserRegistration addUser={addUser} />} />
        <Route path="/user/:id" element={<UserDetail users={users} deleteUser={deleteUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
