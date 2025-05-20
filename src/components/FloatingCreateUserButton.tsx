import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ajusta si tu root está en otro ID

const FloatingCreateUserButton = ({ onUserCreated }: { onUserCreated: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/user', form);
      toast.success('Usuario registrado');
      setForm({ name: '', username: '', password: '' });
      setModalOpen(false);
      onUserCreated(); // actualiza la lista en pantalla
    } catch (err) {
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          fontSize: 30,
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
        title="Agregar usuario"
      >
        +
      </button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Registrar usuario"
        style={{
          content: {
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
          },
        }}
      >
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button type="submit" style={{ width: '100%', padding: 10, background: '#28a745', color: 'white', border: 'none' }}>
            Crear
          </button>
        </form>
      </Modal>
    </>
  );
};

export default FloatingCreateUserButton;
