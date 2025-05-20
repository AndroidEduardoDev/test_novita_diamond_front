import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDiamond from '../components/UserDiamond';
import FloatingCreateUserButton from '../components/FloatingCreateUserButton';


const DiamondScreen = () => {
  const [users, setUsers] = useState([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/api/user').then((res) => {
      setUsers(res.data.items);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {users.map((user:any) => (
        <UserDiamond key={user.id} user={user} isActive={activeId === user.id} setActiveId={setActiveId} />
      ))}
      <FloatingCreateUserButton onUserCreated={fetchUsers} />
    </div>
  );
};


export default DiamondScreen;
