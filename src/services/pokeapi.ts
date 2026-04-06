import type { PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function fetchPokemonList(limit = 30) {
  return fetchJson<PokemonListResponse>(`${BASE_URL}/pokemon?limit=${limit}`);
}

export function fetchPokemonDetail(url: string, signal?: AbortSignal) {
  return fetchJson<any>(url, { signal });
}

