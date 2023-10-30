import { Link, LinkProps } from 'react-router-dom';

type StyledLinkProps = LinkProps & {
  native?: boolean;
};
export const StyledLink = ({ native = false, className, ...otherProps }: StyledLinkProps) => (
  <Link
    {...otherProps}
    className={`decoration-solid underline-offset-2 hover:underline ${
      native && 'text-blue-600'
    } ${className}`}
  />
);
