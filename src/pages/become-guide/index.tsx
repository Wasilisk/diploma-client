import GuideBannerImage from 'shared/assets/guide-banner-image.jpeg';
import GuideImage from 'shared/assets/guide-image.png';
import BannerDivider from 'shared/assets/banner-divider.png';
import { Button } from 'shared/ui/button';
import { RestIcon } from 'shared/assets/rest-icon';
import { TapIcon } from 'shared/assets/tap-icon';
import { TalkingIcon } from 'shared/assets/talking-icon';
import { WebDesignIcon } from 'shared/assets/web-design-icon';
import { ReactElement } from 'react';
import { GuideRegistrationForm } from 'features/become-guide/guide-registration-form';

interface BecomeGuideStepCardProps {
  order: number;
  icon: ReactElement;
  title: string;
  description: string;
}

const BecomeGuideStepCard = ({ order, icon, title, description }: BecomeGuideStepCardProps) => {
  return (
    <div className='flex w-60 flex-col items-center'>
      <div className='relative flex h-32 w-32 items-center justify-center rounded-full bg-amber-100'>
        <div className='absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400'>
          {order}
        </div>
        {icon}
      </div>
      <p className='mt-5 text-center text-lg font-bold text-neutral-800'>{title}</p>
      <p className='mt-3 text-center text-base leading-snug text-zinc-700'>{description}</p>
    </div>
  );
};

export const BecomeGuide = () => {
  const handleScrollOnClick = () => {
    document
      .getElementById('guide-registration')
      ?.scrollIntoView({ behavior: 'smooth'});
  };
  return (
    <>
      <div className='z-10 w-full rounded-bl-3xl rounded-br-3xl bg-white pb-24'>
        <div className='container relative mx-auto mt-8 flex flex flex-1 flex-col flex-col p-24 pb-28'>
          <div
            className={`absolute bottom-0 left-0 -z-10 box-border h-full w-full rounded-2xl bg-cover bg-no-repeat`}
            style={{ backgroundImage: `url(${GuideBannerImage})` }}
          />
          <div className='flex flex-col justify-start'>
            <h5 className='leading-14 text-5xl font-black text-neutral-900'>
              Станьте гідом
              <br />
              нашого сервису
            </h5>
            <img src={BannerDivider} className='mt-1 w-56' alt='Banner divider' />
            <p className='mt-4 max-w-xl leading-relaxed text-neutral-800'>
              Trevel Me - це сервіс незвичайних екскурсій від місцевих жителів. Приєднайтеся до
              величезної спільноти гідів, діліться своїми знаннями, зустрічайтеся з цікавими людьми
              та заробляйте, займаючись улюбленою справою!
            </p>
            <Button variant='primary' className='mt-10' onClick={handleScrollOnClick}>
              Стати гідом
            </Button>
          </div>
        </div>
      </div>
      <div className='-mt-10 flex w-full justify-center bg-[#9cd6ec] pt-10'>
        <img src={GuideImage} className='-mr-32' alt='Guide image' />
        <div className='flex flex-col justify-center'>
          <div className='text-5xl font-bold leading-10 text-neutral-800'>Хто може стати гідом</div>
          <p className='mt-8 max-w-xl leading-relaxed text-neutral-800'>
            Ми працюємо і з професійними гідами, і з закоханими в місто ентузіастами, які хочуть
            проводити екскурсії. З нами співпрацюють журналісти, історики, архітектори,
            мистецтвознавці та інші харизматичні оповідачі.
            <br />
            <br />
            Щоб стати гідом Trevel Me, важливо знати і любити своє місто, а також вміти захопити
            своїми знаннями. В іншому ми допоможемо!
          </p>
        </div>
      </div>
      <div className='container mx-auto my-20 flex flex-col items-center'>
        <h6 className='text-center text-4xl font-bold leading-10 text-neutral-800'>
          Як запропонувати свою екскурсію
        </h6>
        <p className='mt-5 max-w-2xl text-center leading-relaxed text-neutral-800'>
          Кожна екскурсія на Trevel Me - продукт, створений спільними зусиллями гідів і нашої
          команди.
        </p>
        <div className='mt-20 flex w-full justify-evenly'>
          <BecomeGuideStepCard
            order={1}
            icon={<TapIcon />}
            title='Відправте заявку'
            description='Нам важливо, щоб у екскурсії була зрозуміла концепція, через яку ви ділитеся своїм поглядом на місто.'
          />
          <BecomeGuideStepCard
            order={2}
            icon={<RestIcon />}
            title='Очікуйте відповіді'
            description="Ми зв'яжемося з вами, повідомимо, чи підходить ви нам, і домовимося про дзвінок."
          />
          <BecomeGuideStepCard
            order={3}
            icon={<TalkingIcon />}
            title='Звінок-знайомство'
            description='Зідзвонимося й обговоримо основні ідеї, зміст екскурсій та умови співпраці.'
          />
          <BecomeGuideStepCard
            order={4}
            icon={<WebDesignIcon />}
            title='Екскурсія на сайті'
            description='Ми допоможемо вам з користуванням нашим сервісом.'
          />
        </div>
        <GuideRegistrationForm />
      </div>
    </>
  );
};
