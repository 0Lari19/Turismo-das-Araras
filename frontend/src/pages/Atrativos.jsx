import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi } from '../services/api';
import { Loading } from '../components/Loading';
import { CardAtrativo } from '../components/CardAtrativo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useSearchParams } from 'react-router-dom';

export const Atrativos = () => {
  const navigate = useNavigate();
  const [atrativos, setAtrativos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ status: 'PUBLICADO', categoria: '' });
  const [categorias, setCategorias] = useState([]);

  const { searchParams } = useSearchParams();
  const savedCategoria = searchParams.get('categoria');

  useEffect(() => {
    const loadAtrativos = async () => {
      try {
        const api = getApi();
        let url = '/api/atrativos/publicados';
        if (savedCategoria) {
          url = `/api/atrativos/publicados?categoria=${savedCategoria}`;
        }
        const response = await api.get(url);
        setAtrativos(response.data);

        // Extract unique categories from the results
        const categoriasUnicas = [...new Set(response.data.map(a => a.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error('Erro ao carregar atrativos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAtrativos();
  }, [savedCategoria]);

  const handleFilterChange = (e) => {
    const categoria = e.target.value;
    setFiltros({ ...filtros, categoria });
    
    const params = new URLSearchParams();
    if (categoria) {
      params.append('categoria', categoria);
    }
    navigate({ pathname: '/atrativos', search: params.toString() });
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#2c7a7b', margin: '0', }}>Atrativos</h1>
          <p style={{ color: '#555', fontSize: '1rem' }}>Descubra os pontos turísticos de nossa região</p>
        </header>

        <section style={{ marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05) }}>
            <h2 style={{ color: '#2c7a7b', marginTop: '0' }} >Filtros</h2>
            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ marginRight: '1rem', fontSize: '0.875rem' }}>
                Categoria:
                <select
                  value={filtros.categoria || ''}
                  onChange={handleFilterChange}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </section>

        <div style={{ marginBottom: '2rem' }}>
          {loading ? (
            <Loading />
          ) : (
            atrativos.map((atrativo) => <CardAtrativo key={atrativo.slug} atrativo={atrativo} />)
          )}
        </div>

        {atrativos.length === 0 && <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>Nenhum atrativo encontrado com os filtros aplicados.</p>}
      </main>
      <Footer />
    </div>
  );
};