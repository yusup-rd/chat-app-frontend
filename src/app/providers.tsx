import { AuthProvider } from '@/providers/AuthProvider';
import { SocketProvider } from '@/providers/SocketProvider';
import { ToastContainer } from 'react-toastify';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        {children}
        <ToastContainer
          autoClose={3000}
          closeOnClick
          pauseOnHover
          draggable
          style={{ fontFamily: 'inherit' }}
        />
      </SocketProvider>
    </AuthProvider>
  );
};

export default Providers;
