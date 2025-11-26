import React, { useEffect, useState } from 'react'
import { apiFetch } from '../utils/fetcher'

export default function PublicView() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch('/publications/public')
        setItems(data || [])
      } catch (err) {
        console.error('Failed to load public publications:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const getPreview = (item: any) => {
    if (item.summary) return item.summary
    if (item.content) return item.content.substring(0, 120)
    return ''
  }

  return (
    <div>
      <h2>Public Publications</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id} style={{ marginBottom: '15px' }}>
              <strong>{item.title}</strong>
              <p>{getPreview(item)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
