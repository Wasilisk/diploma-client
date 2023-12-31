import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { Direction } from 'pages/direction';
import { Tours } from 'pages/tours';
import { Tour } from 'pages/tour';
import { SuccessPayment } from 'pages/success-payment';
import { UserManagement } from 'pages/user-management';
import { Role } from 'shared/utils/types';
import { TechnicalSupport } from 'pages/technical-support';
import { BecomeGuide } from 'pages/become-guide';
import { GuidePermissionRequests } from 'pages/guide-permission-requests';
import {Directions} from "pages/directions";

export const AppRouter = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path='/profile' element={<ProfileLayout />}>
              <Route path='/profile/orders' element={<Orders />} />
              <Route path='/profile/account-settings' element={<ProfileSettings />} />
              <Route path='/profile/support' element={<Support />} />
              <Route
                path='/profile/user-management'
                element={
                  <ProtectedRoute requiredRoles={[Role.MODERATOR, Role.ADMIN]}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/technical-support'
                element={
                  <ProtectedRoute requiredRoles={[Role.MODERATOR, Role.ADMIN]}>
                    <TechnicalSupport />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/guide-permission-requests'
                element={
                  <ProtectedRoute requiredRoles={[Role.MODERATOR, Role.ADMIN]}>
                    <GuidePermissionRequests />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route path='/directions/:directionId' element={<Direction />} />
          <Route path='/directions' element={<Directions />} />
          <Route path='tours' element={<Tours />} />
          <Route path='tours/:tourId' element={<Tour />} />
          <Route path='success-payment' element={<SuccessPayment />} />
          <Route
            path='become-guide'
            element={
              <ProtectedRoute requiredRoles={[Role.USER]}>
                <BecomeGuide />
              </ProtectedRoute>
            }
          />
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
