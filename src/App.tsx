import { RouterProvider } from 'react-router-dom';
import ToastMessage from './components/Toast';
import { router } from './router';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastMessage />
      <RouterProvider router={router} />
    </>
  );
}
