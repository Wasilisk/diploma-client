import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const withToast = (component: () => ReactNode) => () => {
  return (
    <>
      {component()} <ToastContainer />
    </>
  );
};
