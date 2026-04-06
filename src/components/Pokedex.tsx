import React from "react";
import { usePokedex } from "../hooks/usePokedex";
import PokemonDetailPanel from "./PokemonDetailPanel";
import PokemonListPanel from "./PokemonListPanel";

export default function Pokedex() {
  const { query, setQuery, list, selection, selectUrl, onImageLoad, onImageError } =
    usePokedex();

  return (
    <div className="App">
      <PokemonListPanel
        query={query}
        onQueryChange={setQuery}
        loading={list.loading}
        error={list.error}
        pokemons={list.filteredItems}
        selectedUrl={selection.url}
        onSelectUrl={selectUrl}
      />

      <PokemonDetailPanel
        detailLoading={selection.loading}
        detailError={selection.error}
        detail={selection.data}
        imageUrl={selection.image.url}
        imageLoaded={selection.image.loaded}
        imageError={selection.image.error}
        onImageLoad={onImageLoad}
        onImageError={onImageError}
      />
    </div>
  );
}

