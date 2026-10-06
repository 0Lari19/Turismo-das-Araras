import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApi } from '../services/api';
import { Loading } from '../components/Loading';

export const AtrativoDetalhes = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [atrativo, setAtrativo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAtrativo = async () => {
      try {
        const api = getApi();
        const response = await api.get(`/api/atrativos/${slug}`);
        setAtrativo(response.data);
      } catch (error) {
        console.error('Erro ao carregar atrativo:', error);
        navigate('/atrativos');
      } finally {
        setLoading(false);
      }
    };
    loadAtrativo();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Loading />
      </div>
    );
  }

  if (!atrativo) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Atrativo não encontrado.</div>;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#2c7a7b', marginBottom: '1rem' }}>{atrativo.nome}</h1>
        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{atrativo.categoria}</p>

        <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ color: '#3dd6ae' }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>
            {Math.abs(atrativo.latitude).toFixed(4)}° {atrativo.latitude >= 0 ? 'N' : 'S'}
            ,
            {Math.abs(atrativo.longitude).toFixed(4)}° {atrativo.longitude >= 0 ? 'E' : 'W'}
          </span>
        </div>

        <p style={{ lineHeight: '1.6', color: '#555' }}>{atrativo.descricao}</p>

        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e0e7ef' }}>
          <h2 style={{ color: '#2c7a7b', marginTop: '0' }}>Informações</h2>
          <p style={{ color: '#555', margin: '0.5rem 0' }}>
            <strong>Status:</strong> {atrativo.status}
          </p>
          <p style={{ color: '#555', margin: '0.5rem 0' }}>
            <strong>Versão:</strong> {atrativo.versao}
          </p>
        </div>
      </main>
      <Footer />
      <Link to="/" style={{ display: 'inline-block', margin: '1.5rem auto 0', padding: '0.75rem 1.5rem', background: '#3dd6ae', color: 'white', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
        ← Voltar ao Início
      </Link>
    </div>
  );
};