import React from "react";

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
      placeholder="Search Pokemon..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

