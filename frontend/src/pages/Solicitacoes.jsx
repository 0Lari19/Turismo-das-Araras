import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Solicitacoes = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleEnviar = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);
    setEnviando(true);

    try {
      const api = getApi();
      await api.post('/api/solicitacoes', { nome, email, telefone, mensagem });
      setSucesso(true);
      setNome('');
      setEmail('');
      setTelefone('');
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      setErro('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fbff', padding: '2rem' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#2c7a7b', margin: '0' }}>Enviar Solicitação</h1>
          <p style={{ color: '#555', fontSize: '1rem' }}>Preencha o formulário para entrarmos em contato</p>
        </header>

        {sucesso && (
          <div style={{ background: '#d1e7dd', border: '1px solid '#badnie', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', color: '#0f5132' }}>
            <strong>Solicitação enviada com sucesso!</strong> Entramos em contato em breve.
          </div>
        )}

        {erro && (
          <div style={{ background: '#f8d7da', border: '1px solid '#f5c6cb', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', color: '#842029' }}>
            <strong>Erro:</strong> {erro}
          </div>
        )}

        <form onSubmit={handleEnviar} style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            <label style={{ fontSize: '0.875rem', color: '#555' }}>Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={{
                padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px',
                fontSize: '1rem', width: '100%'
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#555' }}>Mensagem</label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={4}
              required
              style={{
                padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px',
                fontSize: '1rem', width: '100%', resize: 'vertical'
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={enviando}
            style={{
              padding: '0.75rem 1.5rem', background: '#1a5a5c', color: 'white',
              border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold',
              cursor: 'pointer', width: '100%'
            }}
          >
            {enviando ? 'Enviando...' : 'Enviar Solicitação'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};