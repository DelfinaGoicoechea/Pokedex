import type { PokemonListItem } from "../types/pokemon";
import SearchInput from "./SearchInput";

type Props = {
  query: string;
  onQueryChange: (next: string) => void;
  loading: boolean;
  error: string | null;
  pokemons: PokemonListItem[];
  selectedUrl: string | null;
  onSelectUrl: (url: string) => void;
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export default function PokemonListPanel({
  query,
  onQueryChange,
  loading,
  error,
  pokemons,
  selectedUrl,
  onSelectUrl,
  page,
  hasPrev,
  hasNext,
  onPrevPage,
  onNextPage,
}: Props) {
  return (
    <aside className="left-panel">
      <header className="panel-header">
        <h2>Pokédex</h2>
      </header>

      <SearchInput query={query} onChange={onQueryChange} />

      <ul className="pokemon-list">
        {loading && <li>Loading pokemons...</li>}
        {error && <li style={{ color: "red" }}>Error: {error}</li>}
        {!loading && !error && pokemons.length === 0 && (
          <li>No Pokemon found</li>
        )}
        {!loading &&
          !error &&
          pokemons.map((p) => (
            <li key={p.name}>
              <button
                className={`pokemon-button ${
                  selectedUrl === p.url ? "selected" : ""
                }`}
                onClick={() => onSelectUrl(p.url)}
              >
                {p.name}
              </button>
            </li>
          ))}
      </ul>

      <div className="pagination">
        <button
          type="button"
          className="pagination-button"
          onClick={onPrevPage}
          disabled={!hasPrev}
        >
          Previous
        </button>
        <span className="pagination-page">Page {page + 1}</span>
        <button
          type="button"
          className="pagination-button"
          onClick={onNextPage}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </aside>
  );
}

