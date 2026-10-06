import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApi } from '../services/api';

export const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não conferem.');
      return;
    }

    try {
      const api = getApi();
      await api.post('/api/auth/register', { nome, email, senha });
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErro('Erro ao cadastrar. Verifique os dados informados.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fbff', padding: '2rem' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c7a7b', marginBottom: '1.5rem' }}>Cadastro</h2>
        
        {erro && (
          <div style={{ background: '#fee2e2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', color: '#dc2626' }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#555' }}>Nome Completo</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{
                padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px',
                fontSize: '1rem', width: '100%'
              }}
            />
          </div>
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
          <div>
            <label style={{ fontSize: '0.875rem', color: '#555' }}>Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
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
            Criar Conta
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
          Já tem uma conta? <a href="/login" style={{ color: '#3dd6ae', textDecoration: 'none' }}>Faça login</a>
        </p>
      </div>
    </div>
  );
};