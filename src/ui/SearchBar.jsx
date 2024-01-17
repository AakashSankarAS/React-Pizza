import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(
      `order/${query.charAt(0) === '#' ? query.slice(1, query.length) : query}`,
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input w-[122px] sm:w-64"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
