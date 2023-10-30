import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Logo from 'shared/assets/logo.png';
import { IconButton } from 'shared/ui/icon-button';
import CloseIcon from '@mui/icons-material/Close';
import { DirectionsMenu } from 'features/header/directions-menu';
import { Button } from 'shared/ui/button';
import { Link } from 'react-router-dom';
import { ProfileAvatar } from 'entities/profile/ui/profile-avatar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import { useDisableBodyScroll } from 'shared/utils/hooks/use-disable-body-scroll';
export const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useDisableBodyScroll(menuOpen);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const isAuth = true;
  const links = [
    { href: '/account-settings', label: 'Про сервіс' },
    { href: '/support', label: 'Блог' },
  ];
  const userLinks = [
    { to: '/account-settings', label: 'Мої замовлення' },
    { to: '/support', label: 'Налаштування профіля' },
    { to: '/license', label: 'Підтримка' },
  ];
  const user = {
    avatar:
      'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2021/07/Discord-Logo-Lede.png',
    username: 'Vasyl Petryna',
  };
  return (
    <>
      <button onClick={toggleMenu} className='block appearance-none md:hidden'>
        <MenuIcon />
      </button>
      {menuOpen && (
        <div className='fixed left-0 top-0 z-20 flex h-screen w-screen flex-col bg-white p-5'>
          <div className='flex-1'>
            <div className='mb-10 flex items-center justify-between'>
              <img className='h-10 w-28' src={Logo} alt='logo' />
              <IconButton icon={<CloseIcon />} onClick={toggleMenu} />
            </div>
            <div className='mb-8 flex flex-wrap gap-y-4'>
              <div className='flex-1'>
                <DirectionsMenu />
              </div>
              {!isAuth ? (
                <Button variant='secondary' rounded className='font-semibold'>
                  Ввійти
                </Button>
              ) : (
                <div className='flex items-center'>
                  <ProfileAvatar src={user.avatar} username={user.username} />
                  <p className='no-wrap ml-2'>{user.username}</p>
                </div>
              )}
            </div>
            <nav className='flex flex-col divide-y divide-neutral-200'>
              {isAuth &&
                userLinks.map((link) => (
                  <Link to={link.to} className='w-full whitespace-nowrap py-3 text-lg font-medium'>
                    {link.label}
                  </Link>
                ))}
              {links.map((link) => (
                <Link to={link.href} className='w-full whitespace-nowrap py-3 text-lg font-medium'>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <footer className='flex-0 flex flex-wrap justify-center gap-x-5 gap-y-2'>
            <span className='flex items-center gap-2'>
              <LocalPhoneIcon />
              +380 832 13 32 312
            </span>
            <span className='flex items-center gap-2'>
              <MailIcon />
              vasyl@gmail.com
            </span>
          </footer>
        </div>
      )}
    </>
  );
};
