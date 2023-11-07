interface PageHeaderProps {
  title: string;
  description: string;
}
export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className='space-y-2 sm:space-y-5'>
      <h2 className='text-3xl font-bold leading-10 text-neutral-800 sm:text-5xl'>{title}</h2>
      <p className='text-sm sm:text-base'>{description}</p>
    </div>
  );
};
