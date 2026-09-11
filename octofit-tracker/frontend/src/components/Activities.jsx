import useApiCollection from './useApiCollection.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const { items, error, loading } = useApiCollection(endpoint)

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Activities</h2>
        <p className="text-body-secondary">Connected to {endpoint}</p>
        {loading ? <p>Loading activities…</p> : null}
        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}
        {!loading && !error ? (
          <div className="table-responsive">
            <table className="table align-middle mb-0 text-start">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {items.map((activity) => (
                  <tr key={activity._id ?? `${activity.userId}-${activity.completedAt}`}>
                    <td>
                      {activity.userId?.displayName ??
                        activity.userId?.username ??
                        activity.userId ??
                        'Unknown user'}
                    </td>
                    <td className="text-capitalize">{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Activities
