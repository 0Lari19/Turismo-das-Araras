import { createRoot } from 'react-dom/client';

import './styles/global.css';

import { RouterRoutes } from './App';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<RouterRoutes />);
}