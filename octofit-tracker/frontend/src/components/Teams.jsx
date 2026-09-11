import useApiCollection from './useApiCollection.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const { items, error, loading } = useApiCollection(endpoint)

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Teams</h2>
        <p className="text-body-secondary">Connected to {endpoint}</p>
        {loading ? <p>Loading teams…</p> : null}
        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}
        {!loading && !error ? (
          <div className="row g-3 text-start">
            {items.map((team) => (
              <div key={team._id ?? team.name} className="col-12 col-lg-6">
                <article className="border rounded p-3 h-100">
                  <h3 className="h5">{team.name}</h3>
                  <p className="mb-2">{team.description || 'No description provided.'}</p>
                  <div className="small text-body-secondary">
                    Members:{' '}
                    {team.members?.length
                      ? team.members
                          .map((member) => member.displayName ?? member.username ?? member)
                          .join(', ')
                      : 'No members yet'}
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Teams
