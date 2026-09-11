import useApiCollection from './useApiCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { items, error, loading } = useApiCollection(endpoint)

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Workouts</h2>
        <p className="text-body-secondary">Connected to {endpoint}</p>
        {loading ? <p>Loading workouts…</p> : null}
        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}
        {!loading && !error ? (
          <div className="row g-3 text-start">
            {items.map((workout) => (
              <div key={workout._id ?? workout.title} className="col-12 col-lg-6">
                <article className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between gap-3">
                    <h3 className="h5">{workout.title}</h3>
                    <span className="badge text-bg-primary text-capitalize align-self-start">
                      {workout.difficulty}
                    </span>
                  </div>
                  <p>{workout.description}</p>
                  <ul className="mb-0">
                    {(workout.activities ?? []).map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Workouts
