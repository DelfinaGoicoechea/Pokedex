import { PokemonDetail } from "../types/pokemon";

type Props = {
  detailLoading: boolean;
  detailError: string | null;
  detail: PokemonDetail | null;
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
  function renderContent() {
    if(detailLoading) {
      return <p>Loading details...</p>;
    }

    if(detailError) {
      return <p style={{ color: "red" }}>Error: {detailError}</p>;
    }

    if(!detail) {
      return <p>Choose a pokemon on the left to see its details.</p>;
    }

    return (
      <article className="pokemon-detail">
        <div className="pokemon-left">
          <h3 className="pokemon-name">{detail.name}</h3>

          <div className="image-block">
            {renderImage(detail)}
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
              {detail.types.map((t) => (
                <span key={t.type.name} className="type-badge">
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="card abilities-card">
            <h4 className="card-title">Abilities</h4>
            <div className="badges">
              {detail.abilities.map((a) => (
                <div key={a.ability.name} className="ability-badge">
                  {a.ability.name}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </article>
    );
  }

  function renderImage(pokemon: PokemonDetail) {
    if(imageError) {
      return <div className="image-placeholder">Image failed to load</div>;
    }

    if(!imageUrl) {
      return <div className="image-placeholder">No image available</div>;
    }

    return (
      <>
        {!imageLoaded && (
          <div className="image-placeholder">Loading image...</div>
        )}
        <img
          key={imageUrl}
          src={imageUrl}
          alt={pokemon.name}
          className="pokemon-image"
          onLoad={onImageLoad}
          onError={onImageError}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      </>
    );
  }

  return (
    <main className="right-panel">
      <div className="placeholder">
        {renderContent()}
      </div>
    </main>
  );
}

