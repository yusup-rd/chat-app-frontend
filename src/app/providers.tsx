import { AuthProvider } from '@/providers/AuthProvider';
import { ToastContainer } from 'react-toastify';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
      <ToastContainer
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        style={{ fontFamily: 'inherit' }}
      />
    </AuthProvider>
  );
};

export default Providers;
