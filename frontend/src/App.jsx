import { Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Atrativos } from './pages/Atrativos';
import { AtrativoDetalhes } from './pages/AtrativoDetalhes';
import { Solicitacoes } from './pages/Solicitacoes';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

export const RouterRoutes = () => {
  return (
    <Router history={window.history}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="atrativos" element={<Atrativos />} />
          <Route path="atrativo/:slug" element={<AtrativoDetalhes />} />
          <Route path="solicitacoes" element={<Solicitacoes />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="admin" element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR', 'GESTOR']}>
              <Admin />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="/logout" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Logout realizado com sucesso</h2>
            <p>Você será redirecionado em breve...</p>
            <button onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}>OK</button>
          </div>
        } />
      </Routes>
    </Router>
  );
};