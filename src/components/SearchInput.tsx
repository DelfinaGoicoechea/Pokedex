
type Props = {
  query: string;
  onChange: (next: string) => void;
};

export default function SearchInput({ query, onChange }: Props) {
  return (
    <input
      id="pokemon-search"
      type="search"
      className="search-input"
      placeholder="Search Pokémon..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

