import Background from 'shared/assets/background.png';
export const BackgroundImage = () => (
  <>
    <div
      className={`absolute left-0 top-0 box-border h-full w-full bg-cover bg-no-repeat `}
      style={{ backgroundImage: `url(${Background})` }}
    />
    <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
  </>
);
