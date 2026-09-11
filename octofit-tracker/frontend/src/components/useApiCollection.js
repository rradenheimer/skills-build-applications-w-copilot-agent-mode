import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}

export default function useApiCollection(endpoint) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!ignore) {
          setItems(normalizeItems(payload))
        }
      } catch (caughtError) {
        if (!ignore) {
          setItems([])
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load data.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      ignore = true
    }
  }, [endpoint])

  return { items, error, loading }
}
