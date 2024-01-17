import { Link } from 'react-router-dom';

const base =
  ' inline-block rounded-full text-xs font-semibold uppercase tracking-wide  transition-colors duration-300  focus:outline-none disabled:cursor-not-allowed focus:ring  focus:ring-offset-2';

const styles = {
  primary:
    base +
    ' px-4 py-2.5 sm:px-5 sm:py-3.5 bg-yellow-400 hover:bg-yellow-300 focus:ring-yellow-300',
  small:
    base +
    ' px-2 py-1.5 sm:px-3 sm:py-2.5 bg-yellow-400 hover:bg-yellow-300 focus:ring-yellow-300',
  secondary:
    base +
    'px-4 py-2.5 sm:px-5 sm:py-3.5 border-2 text-stone-400 border-stone-300 hover:text-black hover:bg-stone-300 focus:ring-stone-300',
};

export default function Button({
  type,
  children,
  to,
  disabled,
  onClick,
  className,
}) {
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={styles[type] + className}
      >
        {children}
      </button>
    </div>
  );
}
