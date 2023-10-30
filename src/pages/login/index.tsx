import { BackgroundImage } from 'shared/ui/background-image';
import { LoginForm } from 'features/auth/login/login-form';
import { AuthContainer } from 'shared/ui/auth-container';
import { StyledLink } from 'shared/ui/styled-link';

export const Login = () => {
  return (
    <>
      <BackgroundImage />
      <AuthContainer title='Вхід'>
        <LoginForm />
        <div className='text-center'>
          Ще немає акаунту ?{' '}
          <StyledLink to='/registration' native>
            Зареєструйтесь
          </StyledLink>
        </div>
      </AuthContainer>
    </>
  );
};
