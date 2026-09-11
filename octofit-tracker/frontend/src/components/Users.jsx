import useApiCollection from './useApiCollection.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const { items, error, loading } = useApiCollection(endpoint)

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Users</h2>
        <p className="text-body-secondary">Connected to {endpoint}</p>
        {loading ? <p>Loading users…</p> : null}
        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}
        {!loading && !error ? (
          <ul className="list-group list-group-flush text-start">
            {items.map((user) => (
              <li key={user._id ?? user.username} className="list-group-item px-0">
                <div className="fw-semibold">{user.displayName}</div>
                <div className="text-body-secondary">
                  @{user.username} · {user.email} · {user.points} pts
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export default Users
