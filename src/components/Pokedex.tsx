import { usePokedex } from "../hooks/usePokedex";
import PokemonDetailPanel from "./PokemonDetailPanel";
import PokemonListPanel from "./PokemonListPanel";

export default function Pokedex() {
  const { query, setQuery, list, selection, selectUrl, onImageLoad, onImageError, page, hasPrev, hasNext, prevPage, nextPage } =
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
        page={page}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrevPage={prevPage}
        onNextPage={nextPage}
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

