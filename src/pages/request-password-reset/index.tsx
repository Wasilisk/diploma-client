import { BackgroundImage } from 'shared/ui/background-image';
import { AuthContainer } from 'shared/ui/auth-container';
import { StyledLink } from 'shared/ui/styled-link';
import { RequestPasswordResetForm } from 'features/auth/request-password-reset/request-password-reset-form';

export const RequestPasswordReset = () => {
  return (
    <>
      <BackgroundImage />
      <AuthContainer title='Відновлення паролю'>
        <RequestPasswordResetForm />
        <div className='text-center'>
          Вже зареєстровані ?{' '}
          <StyledLink to='/login' native>
            Увійдіть
          </StyledLink>
        </div>
      </AuthContainer>
    </>
  );
};
