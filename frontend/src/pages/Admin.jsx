import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Verifica se é admin ou gestor
  if (user.papel !== 'ADMINISTRADOR' && user.papel !== 'GESTOR') {
    return <Navigate to="/atrativos" />;
  }

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [atrativos, setAtrativos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = getApi();

        // Carregar solicitações
        let solicitacoesUrl = '/api/solicitacoes';
        if (filtroStatus) {
          solicitacoesUrl = `/api/solicitacoes?status=${filtroStatus}`;
        }
        const solicitacoesResponse = await api.get(solicitacoesUrl);
        setSolicitacoes(solicitacoesResponse.data);

        // Carregar atrativos
        const atrativosResponse = await api.get('/api/atrativos/publicados');
        setAtrativos(atrativosResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados administrativos:', error);
      } finally {
        setCarregando(false);
      }
    };
    loadData();
  }, [filtroStatus]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#2c7a7b', margin: '0' }} >
            Área Administrativa {user.papel}
          </h1>
          <p style={{ color: '#555', fontSize: '1rem' }}>Bem-vindo, {user.nome}</p>
        </header>

        {carregando ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando dados...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <section>
              <h2 style={{ color: '#2c7a7b', marginTop: '0' }}>Solicitações</h2>
              {solicitacoes.length === 0 ? (
                <p style={{ color: '#666', padding: '1rem' }}>Nenhuma solicitação encontrada.</p>
              ) : (
                <div style={{ 
                  maxHeight: '400px', overflowY: 'auto', border: '1px solid #e0e7ef', borderRadius: '4px', padding: '1rem'
                }}>
                  {solicitacoes.map((s, i) => (
                    <div key={i} style={{
                      background: 'white', padding: '1rem', marginBottom: '0.75rem', borderRadius: '4px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{s.nome}</p>
                      <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0' }}>{s.email}</p>
                      <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0' }}>{s.telefone || 'Não informado'}</p>
                      <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0' }}>{s.mensagem.substring(0, 100)}{s.mensagem.length > 100 ? '...' : ''}</p>
                      <p style={{ fontSize: '0.75rem', color: '#888' }}>{s.status} - {s.criado_em ? new Date(s.criado_em).toLocaleDateString() : ''}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 style={{ color: '#2c7a7b', marginTop: '0' }}>Atrativos Cadastrados</h2>
              {atrativos.length === 0 ? (
                <p style={{ color: '#666', padding: '1rem' }}>Nenhum atrativo cadastrado.</p>
              ) : (
                <div style={{ 
                  maxHeight: '400px', overflowY: 'auto', border: '1px solid #e0e7ef', borderRadius: '4px', padding: '1rem'
                }}>
                  {atrativos.map((a) => (
                    <div key={a.slug} style={{
                      background: 'white', padding: '0.75rem', marginBottom: '0.5rem', borderRadius: '4px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                      <strong>{a.nome}</strong> - {a.categoria}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        <div style={{ padding: '1rem', background: '#f8fbff', borderRadius: '4px', marginTop: '2rem' }}>
          <h3 style={{ color: '#2c7a7b', marginBottom: '0.75rem' }}>Informações do Sistema</h3>
          <p style={{ color: '#555', fontSize: '0.875rem' }}>
            <strong>Papéis disponíveis:</strong> USUARIO, GESTOR, ADMINISTRADOR
          </p>
          <p style={{ color: '#555', fontSize: '0.875rem' }}>
            <strong>Última atualização:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};