import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/layout/header';
import { Footer } from 'widgets/layout/footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
