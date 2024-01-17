import { Link } from 'react-router-dom';

export default function BackButton({ children, className, to }) {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}
