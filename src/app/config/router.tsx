import { createBrowserRouter } from 'react-router-dom';
import { Layout } from 'widgets/layout';
import { Login } from 'pages/login';
import { Registration } from 'pages/registration';
import { PasswordReset } from 'pages/password-reset';
import { RequestPasswordReset } from 'pages/request-password-reset';
import { ProfileLayout } from '@src/widgets/profile-layout';
import { Support } from 'pages/support';
import { ProfileSettings } from 'pages/profile-settings';
import { Orders } from 'pages/orders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
          {
            path: 'profile/orders',
            element: <Orders />,
          },
          {
            path: 'profile/settings',
            element: <ProfileSettings />,
          },
          {
            path: 'profile/support',
            element: <Support />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/password-reset',
    element: <RequestPasswordReset />,
  },
  {
    path: '/password-reset/:token',
    element: <PasswordReset />,
  },
]);
