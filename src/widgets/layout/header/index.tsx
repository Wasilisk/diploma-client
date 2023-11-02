import { BurgerMenu } from 'features/header/burger-menu';
import Logo from 'shared/assets/logo.png';
import { DirectionsMenu } from 'features/header/directions-menu';
import { Link } from 'react-router-dom';
import { IconButton } from 'shared/ui/icon-button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from 'shared/ui/button';
import { UserProfileMenu } from 'features/header/user-profile-menu';
import { useAuth } from 'shared/utils/hooks/use-auth';

export const Header = () => {
  const { isAuth } = useAuth();
  return (
    <header className='flex-0 shadow'>
      <div className='container mx-auto flex justify-between px-5 py-5'>
        <div className='flex items-center md:gap-4 lg:gap-9'>
          <BurgerMenu />
          <img className='ml-4 h-10 w-28 object-contain md:ml-0' src={Logo} alt='logo' />
          <div className='hidden md:flex'>
            <DirectionsMenu />
            <nav className='inline-flex items-center justify-start md:ml-4 md:gap-2 lg:ml-9 lg:gap-14'>
              <Link to='/about' className='decoration-solid underline-offset-2 hover:underline'>
                Про сервіс
              </Link>
              <Link to='/to' className='decoration-solid underline-offset-2 hover:underline'>
                Блог
              </Link>
            </nav>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <IconButton icon={<FavoriteBorderIcon />} />
          {!isAuth ? (
            <Link to='/login'>
              <Button variant='secondary' rounded className='font-semibold'>
                Ввійти
              </Button>
            </Link>
          ) : (
            <UserProfileMenu />
          )}
        </div>
      </div>
    </header>
  );
};
