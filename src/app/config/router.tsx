import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from 'widgets/layout';
import { Login } from 'pages/login';
import { Registration } from 'pages/registration';
import { PasswordReset } from 'pages/password-reset';
import { RequestPasswordReset } from 'pages/request-password-reset';
import { Support } from 'pages/support';
import { ProfileSettings } from 'pages/profile-settings';
import { Orders } from 'pages/orders';
import { About } from 'pages/about';
import { Home } from 'pages/home';
import { useAuth } from 'shared/utils/hooks/use-auth';
import { ProtectedRoute } from 'shared/ui/protected-route';
import { ProfileLayout } from 'widgets/profile-layout';

export const AppRouter = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute redirectPath='/' isAllowed={isAuth} />}>
            <Route path='/profile' element={<ProfileLayout />}>
              <Route path='/profile/orders' element={<Orders />} />
              <Route path='/profile/account-settings' element={<ProfileSettings />} />
              <Route path='/profile/support' element={<Support />} />
            </Route>
          </Route>
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/password-reset' element={<RequestPasswordReset />} />
        <Route path='/password-reset/:token' element={<PasswordReset />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
