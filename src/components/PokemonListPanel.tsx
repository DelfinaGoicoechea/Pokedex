import React from "react";
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
};

export default function PokemonListPanel({
  query,
  onQueryChange,
  loading,
  error,
  pokemons,
  selectedUrl,
  onSelectUrl,
}: Props) {
  return (
    <aside className="left-panel">
      <header className="panel-header">
        <h2>Pokedex</h2>
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
    </aside>
  );
}

