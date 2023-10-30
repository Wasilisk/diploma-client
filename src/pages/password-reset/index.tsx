import { BackgroundImage } from 'shared/ui/background-image';
import { AuthContainer } from 'shared/ui/auth-container';
import { StyledLink } from 'shared/ui/styled-link';
import { PasswordResetForm } from 'features/auth/password-reset/password-reset-form';

export const PasswordReset = () => {
  return (
    <>
      <BackgroundImage />
      <AuthContainer title='Відновлення паролю'>
        <PasswordResetForm />
        <div className='text-center'>
          Пам'ятаєте свій пароль ?{' '}
          <StyledLink to='/login' native>
            Увійдіть
          </StyledLink>
        </div>
      </AuthContainer>
    </>
  );
};
