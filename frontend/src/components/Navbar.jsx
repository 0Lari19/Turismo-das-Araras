import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: 'linear-gradient(135deg, #2c7a7b, #3dd6ae)', padding: '1rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
          TURISMO DAS ARARAS
        </Link>
        <Link to="/atrativos" style={{ color: 'white', textDecoration: 'none' }}>Atrativos</Link>
        {user ? (
          <>
            <Link to="/solicitacoes" style={{ color: 'white', textDecoration: 'none' }}>Solicitações</Link>
            <button 
              onClick={logout} 
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/cadastro" style={{ color: 'white', textDecoration: 'none' }}>Cadastro</Link>
          </>
        )}
      </div>
    </nav>
  );
};