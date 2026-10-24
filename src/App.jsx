import Home from './pages/Home';
import Admin from './pages/Admin';

export default function App() {
  return location.pathname.startsWith('/panel') ? <Admin /> : <Home />;
}
