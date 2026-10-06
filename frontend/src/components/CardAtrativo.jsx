import { Link } from 'react-router-dom';

export const CardAtrativo = ({ atrativo }) => {
  return (
    <div style={{
      border: '1px solid #e0e7ef',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      background: 'white',
      transition: 'transform 0.2s',
      ':hover': { transform: 'translateY(-4px)' }
    }}>
      <h3 style={{ margin: '0 0 0.5rem', color: '#2c7a7b' }}>{atrativo.nome}</h3>
      <p style={{ fontSize: '0.875rem', color: '#555', margin: '0.25rem 0' }}>
        {atrativo.categoria}
      </p>
      <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
        {atrativo.descricao}
      </p>
      <Link 
        to=`/atrativo/${atrativo.slug}` 
        style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', background: '#3dd6ae', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Ver detalhes
      </Link>
    </div>
  );
};