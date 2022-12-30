import { ToastContainer } from 'react-toastify';

const ToastMessage = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="colored"
    />
  );
};

export default ToastMessage;
