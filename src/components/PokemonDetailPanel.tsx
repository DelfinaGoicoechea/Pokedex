import React from "react";

type Props = {
  detailLoading: boolean;
  detailError: string | null;
  detail: any | null;
  imageUrl: string | null;
  imageLoaded: boolean;
  imageError: boolean;
  onImageLoad: () => void;
  onImageError: () => void;
};

export default function PokemonDetailPanel({
  detailLoading,
  detailError,
  detail,
  imageUrl,
  imageLoaded,
  imageError,
  onImageLoad,
  onImageError,
}: Props) {
  return (
    <main className="right-panel">
      <div className="placeholder">
        {detailLoading && <p>Loading details...</p>}
        {detailError && <p style={{ color: "red" }}>Error: {detailError}</p>}
        {!detail && <p>Choose a pokemon on the left to see its details.</p>}
        {detail && (
          <article className="pokemon-detail">
            <div className="pokemon-left">
              <h3 className="pokemon-name">{detail.name}</h3>

              <div className="image-block">
                {!imageLoaded && (
                  <div className="image-placeholder">Loading image...</div>
                )}
                {imageError && (
                  <div className="image-placeholder">Image failed to load</div>
                )}
                {imageUrl && (
                  <img
                    key={imageUrl}
                    src={imageUrl}
                    alt={detail.name}
                    className="pokemon-image"
                    onLoad={onImageLoad}
                    onError={onImageError}
                    style={{ display: imageLoaded ? "block" : "none" }}
                  />
                )}
              </div>

              <p className="pokemon-id">ID: {detail.id}</p>

              <div className="hw-row">
                <div className="hw-item">
                  <div className="hw-label">Height</div>
                  <div className="hw-value">
                    {(detail.height / 10).toFixed(1)} m
                  </div>
                </div>
                <div className="hw-item">
                  <div className="hw-label">Weight</div>
                  <div className="hw-value">
                    {(detail.weight / 10).toFixed(1)} kg
                  </div>
                </div>
              </div>
            </div>

            <aside className="pokemon-right">
              <div className="card types-card">
                <h4 className="card-title">Type</h4>
                <div className="badges">
                  {detail.types.map((t: any) => (
                    <span key={t.type.name} className="type-badge">
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card abilities-card">
                <h4 className="card-title">Abilities</h4>
                <div className="badges">
                  {detail.abilities.map((a: any) => (
                    <div key={a.ability.name} className="ability-badge">
                      {a.ability.name}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </article>
        )}
      </div>
    </main>
  );
}

