import { useEffect, useMemo, useState } from "react";
import type { PokemonListItem } from "../types/pokemon";
import { fetchPokemonDetail, fetchPokemonList } from "../services/pokeapi";

type PokemonSelection = {
  url: string | null;
  data: any | null;
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

export function usePokedex() {
  const [list, setList] = useState<{
    items: PokemonListItem[];
    loading: boolean;
    error: string | null;
  }>({ items: [], loading: false, error: null });

  const [query, setQuery] = useState<string>("");
  const [selection, setSelection] = useState<PokemonSelection>(initialSelection);

  useEffect(() => {
    let alive = true;
    (async () => {
      setList((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetchPokemonList(30);
        if (!alive) return;
        setList({ items: data.results || [], loading: false, error: null });
      } catch (err: any) {
        if (!alive) return;
        setList((s) => ({
          ...s,
          loading: false,
          error: err?.message ?? "Unknown error",
        }));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

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
        const img = json?.sprites?.front_default ?? null;
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
      } catch (err: any) {
        if (controller.signal.aborted) return;
        setSelection((s) => {
          if (s.url !== url) return s;
          return {
            ...s,
            loading: false,
            error: err?.message ?? "Unknown error",
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

  return {
    query,
    setQuery,
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

