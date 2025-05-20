import React, { useMemo, useState } from 'react';
import Lottie from 'lottie-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import diamondAnimation from '../assets/animation.json';

interface UserDiamondProps {
  user: any;
  isActive: boolean;
  setActiveId: (id: number | null) => void;
}

const UserDiamond = ({ user, isActive, setActiveId }: UserDiamondProps) => {
  const position = useMemo(() => ({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
  }), []);

  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [editData, setEditData] = useState({
    name: user.name,
    username: user.username,
    password: '',
  });

  const handleAuth = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/user/authenticate', {
        username: user.username,
        password,
      });
      if (res.data.authorised) {
        setAuth(true);
        toast.success('Autenticado correctamente');
      } else {
        toast.error('Contraseña incorrecta');
      }
    } catch (err) {
      toast.error('Error al autenticar');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/user/${user.id}`, editData);
      toast.success('Usuario actualizado');
      setActiveId(null);
      setAuth(false);
    } catch (err) {
      toast.error('Error al actualizar datos');
    }
  };

  return (
    <div
      onClick={() => setActiveId(user.id)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 100,
        height: 100,
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
    >
      <p>{user.username}</p>
      <Lottie animationData={diamondAnimation} loop={true} />

      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: 110,
            background: '#f9f9f9',
            border: '1px solid #ccc',
            borderRadius: 10,
            zIndex: 100,
            width: 250,
            color: 'black',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setActiveId(null)} style={{ border: 'none', background: 'transparent', fontSize: '16px', cursor: 'pointer' }}>✖</button>
          </div>

          {!auth ? (
            <>
              <div style={{ marginBottom: 10 }}><strong>{user.username}</strong></div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '80%', padding: 6, marginBottom: 8, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <button
                onClick={handleAuth}
                style={{ width: '80%', padding: 8, borderRadius: 5, background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Entrar
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                style={{ width: '100%', padding: 6, marginBottom: 8, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <input
                type="text"
                placeholder="Usuario"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                style={{ width: '100%', padding: 6, marginBottom: 8, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                style={{ width: '100%', padding: 6, marginBottom: 8, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <button
                onClick={handleUpdate}
                style={{ width: '100%', padding: 8, borderRadius: 5, background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Actualizar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDiamond;
