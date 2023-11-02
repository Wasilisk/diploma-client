type ProfileAvatar = {
  src?: string;
  username: string;
};
export const ProfileAvatar = ({ src, username }: ProfileAvatar) => {
  return src ? (
    <img
      src={src}
      alt='user profile image'
      className='aspect-square h-9 rounded-full object-cover md:h-[3rem]'
    />
  ) : (
    <div className='flex aspect-square h-9 items-center justify-center rounded-full bg-sky-400 text-xl font-bold text-white md:h-[3rem]'>
      {username[0].toUpperCase()}
    </div>
  );
};
