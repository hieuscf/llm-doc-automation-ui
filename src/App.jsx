
import './App.css'
import AppRouter from './routes/AppRoutes';
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <div>
      <AppRouter/>
      <ToastContainer />
    </div>
  );
}

export default App
