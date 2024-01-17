import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserName from './UserName';

export default function Header() {
  return (
    <header className="flex items-center  justify-between bg-yellow-400 p-4 uppercase">
      <Link to="/" className="tracking-widest">
        React-Pizza
      </Link>

      <SearchBar />
      <UserName />
    </header>
  );
}
