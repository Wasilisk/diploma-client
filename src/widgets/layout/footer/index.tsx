import Logo from 'shared/assets/logo.png';
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';

export const Footer = () => {
  return (
    <footer className='bg-neutral-50'>
      <div className='flex-0 mx-auto flex flex-col items-center gap-y-3 divide-y divide-gray-200 p-5 md:container'>
        <div className='flex w-full flex-col items-center gap-x-20 divide-y divide-gray-200 md:flex-row md:items-start md:divide-none'>
          <div className='mb-5 flex items-start md:flex-1'>
            <img className='flex h-10 w-28 object-contain' src={Logo} alt='logo' />
          </div>
          <div className='hidden md:block'>
            <p className='mb-5 font-semibold leading-loose'>Сервіс</p>
            <nav className='flex flex-col gap-y-2 '>
              <Link to='/to'>Про сервіс</Link>
              <Link to='/to'>Блог</Link>
            </nav>
          </div>
          <div className='pt-4 text-center md:pt-0 md:text-left '>
            <p className='mb-5 font-semibold leading-loose'>Підтримка клієнтів</p>
            <div className='flex flex-col gap-y-2 text-xs md:items-start md:text-base'>
              <div>
                <span className='font-semibold'>
                  <LocalPhoneIcon className='mr-1' />
                  Телефон:
                </span>
                <span> +380 743 12 421</span>
              </div>
              <div>
                <span className=' font-semibold'>
                  <MailIcon className='mr-1' />
                  Email:
                </span>
                <span> hello@trevelme.com</span>
              </div>
              <div>
                <span className='font-semibold'>
                  <PlaceIcon className='mr-1' />
                  Офіс:
                </span>
                <span> Івано-Франкіськ, вул.Незалежності 97А</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-y-2 pt-5 text-center text-xs md:flex-row md:justify-between'>
          <span>© 2023 «Tenloc».</span>
          <span>Розробка сайту: Василь Петрина</span>
        </div>
      </div>
    </footer>
  );
};
