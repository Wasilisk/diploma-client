import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Role } from 'shared/utils/types';
import { useRole } from 'shared/utils/hooks/use-role';

interface ProtectedRouterProps {
  isAllowed?: boolean;
  redirectPath?: string;
  requiredRoles?: Role[];
  children?: ReactNode;
}

export const ProtectedRoute = ({
  isAllowed = true,
  redirectPath = '/',
  requiredRoles = [Role.USER, Role.GUIDE, Role.MODERATOR, Role.ADMIN],
  children,
}: ProtectedRouterProps) => {
  const userRole = useRole();

  if (!isAllowed || !requiredRoles?.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
