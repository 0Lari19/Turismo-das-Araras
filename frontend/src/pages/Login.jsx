import { useState } from 'react';
import { useNavigate, useRouter } from 'react-router-dom';
import { getApi } from '../services/api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const api = getApi();
      const response = await api.post('/api/auth/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      navigate('/atrativos');
    } catch (error) {
      console.error('Erro no login:', error);
      setErro('Email ou senha inválidos. Por favor, tente novamente.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fbff', padding: '2rem' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c7a7b', marginBottom: '1.5rem' }}>Login</h2>
        
        {erro && (
          <div style={{ background: '#fee2e2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', color: '#dc2626' }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#555' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px',
                fontSize: '1rem', width: '100%'
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#555' }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px',
                fontSize: '1rem', width: '100%'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem', background: '#2c7a7b', color: 'white',
              border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold',
              cursor: 'pointer', width: '100%'
            }}
          >
            Entrar
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Não tem uma conta? <a href="/cadastro" style={{ color: '#3dd6ae', textDecoration: 'none' }}>Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};