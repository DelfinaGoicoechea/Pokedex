import { useEffect, useMemo, useState } from "react";
import type { PokemonDetail, PokemonListItem } from "../types/pokemon";
import { fetchPokemonDetail, fetchPokemonList } from "../services/pokeapi";

type PokemonSelection = {
  url: string | null;
  data: PokemonDetail | null;
  loading: boolean;
  error: string | null;
  image: {
    url: string | null;
    loaded: boolean;
    error: boolean;
  };
};

const initialSelection: PokemonSelection = {
  url: null,
  data: null,
  loading: false,
  error: null,
  image: {
    url: null,
    loaded: false,
    error: false,
  },
};

const PAGE_SIZE = 30;

export function usePokedex() {
  const [list, setList] = useState<{
    items: PokemonListItem[];
    loading: boolean;
    error: string | null;
    count: number;
  }>({ items: [], loading: false, error: null, count: 0 });

  const [page, setPage] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [selection, setSelection] = useState<PokemonSelection>(initialSelection);

  useEffect(() => {
    let alive = true;
    (async () => {
      setList((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetchPokemonList(PAGE_SIZE, page * PAGE_SIZE);
        if (!alive) return;
        setList({
          items: data.results || [],
          loading: false,
          error: null,
          count: data.count ?? 0,
        });
      } catch (err) {
        if (!alive) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setList((s) => ({
          ...s,
          loading: false,
          error: message,
        }));
      }
    })();
    return () => {
      alive = false;
    };
  }, [page]);

  useEffect(() => {
    if (!selection.url) {
      setSelection(initialSelection);
      return;
    }

    const controller = new AbortController();
    const url = selection.url;

    (async () => {
      setSelection((s) => ({
        ...s,
        loading: true,
        error: null,
      }));
      try {
        const json = await fetchPokemonDetail(url, controller.signal);
        const img = 
          json?.sprites?.other?.["official-artwork"]?.front_default ??
          json?.sprites?.front_default ?? 
          null;
        setSelection((s) => {
          if (s.url !== url) return s;
          return {
            url,
            data: json,
            loading: false,
            error: null,
            image: { url: img, loaded: false, error: false },
          };
        });
      } catch (err) {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setSelection((s) => {
          if (s.url !== url) return s;
          return {
            ...s,
            loading: false,
            error: message,
          };
        });
      }
    })();

    return () => {
      controller.abort();
    };
  }, [selection.url]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list.items;
    return list.items.filter((p) => p.name.toLowerCase().includes(q));
  }, [list.items, query]);

  const hasPrev = page > 0;
  const hasNext = (page + 1) * PAGE_SIZE < list.count;

  return {
    query,
    setQuery,
    page,
    hasPrev,
    hasNext,
    prevPage: () => {
      if (!hasPrev) return;
      setPage((p) => p - 1);
    },
    nextPage: () => {
      if (!hasNext) return;
      setPage((p) => p + 1);
    },
    list: { ...list, filteredItems },
    selection,
    selectUrl: (url: string) => {
      setSelection((s) => ({
        ...initialSelection,
        url,
        data: s.url === url ? s.data : null,
      }));
    },
    onImageLoad: () => {
      setSelection((s) => ({
        ...s,
        image: { ...s.image, loaded: true },
      }));
    },
    onImageError: () => {
      setSelection((s) => ({
        ...s,
        image: { ...s.image, error: true },
      }));
    },
  };
}

