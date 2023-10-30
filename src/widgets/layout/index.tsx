import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/layout/header';
import { Footer } from 'widgets/layout/footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='container mx-auto flex-1 px-5'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
