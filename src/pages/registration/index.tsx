import { BackgroundImage } from 'shared/ui/background-image';
import { RegistrationForm } from 'features/auth/registration/registration-form';
import { AuthContainer } from 'shared/ui/auth-container';
import { StyledLink } from 'shared/ui/styled-link';

export const Registration = () => {
  return (
    <>
      <BackgroundImage />
      <AuthContainer title='Реєстрація'>
        <RegistrationForm />
        <div className='text-center'>
          Вже є акаунт ?{' '}
          <StyledLink to='/login' native>
            Увійдіть
          </StyledLink>
        </div>
      </AuthContainer>
    </>
  );
};
