import useApiCollection from './useApiCollection.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const { items, error, loading } = useApiCollection(endpoint)

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Leaderboard</h2>
        <p className="text-body-secondary">Connected to {endpoint}</p>
        {loading ? <p>Loading leaderboard…</p> : null}
        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}
        {!loading && !error ? (
          <ol className="list-group list-group-numbered text-start">
            {items.map((entry) => (
              <li key={entry._id ?? entry.username} className="list-group-item">
                <div className="fw-semibold">{entry.displayName}</div>
                <div className="text-body-secondary">
                  @{entry.username} · {entry.points} pts
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  )
}

export default Leaderboard
