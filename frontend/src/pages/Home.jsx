import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApi } from '../services/api';
import { Loading } from '../components/Loading';
import { CardAtrativo } from '../components/CardAtrativo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home = () => {
  const [atrativos, setAtrativos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAtrativos = async () => {
      try {
        const api = getApi();
        const response = await api.get('/api/atrativos/publicados');
        setAtrativos(response.data);
      } catch (error) {
        console.error('Erro ao carregar atrativos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAtrativos();
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#2c7a7b', margin: '0', }}>TURISMO DAS ARARAS</h1>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>Descubra as maravilhas do nosso paraíso natural</p>
        </header>

        <section style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>
            Explore os incríveis atrativos naturais de nossa região. Clique abaixo para começar sua aventura.
          </p>
          <Link to="/atrativos" style={{
            display: 'inline-block', marginTop: '1rem',
            padding: '0.75rem 1.5rem', background: '#3dd6ae',
            color: 'white', borderRadius: '4px', fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Ver Todos os Atrativos
          </Link>
        </section>

        <section style={{ background: '#f8fbff', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c7a7b', marginTop: '0' }}>Atrativos em Destaque</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill', minmax: '250px', gap: '1.5rem' }}>
            {loading ? (
              <Loading />
            ) : (
              atrativos.map((atrativo) => <CardAtrativo key={atrativo.slug} atrativo={atrativo} />)
            )}
          </div>
        </section>

        <section style={{ background: '#e8f5f5', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c7a7b', marginTop: '0' }}>Envie uma Solicitação</h2>
          <p style={{ color: '#555', marginBottom: '1rem' }}>
            Interessado em mais informações ou tem alguma solicitação especial? Entre em contato conosco.
          </p>
          <Link to="/solicitacoes" style={{
            display: 'inline-block', padding: '0.75rem 1.5rem', background: '#1a5a5c',
            color: 'white', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none'
          }}>
            Fazer Solicitação
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};