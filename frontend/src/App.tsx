import { useState, useEffect } from 'react'
import './App.css'

interface Item {
  id: number;
  name: string;
  description?: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/items`)
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createItem = async () => {
    if (!newItemName.trim()) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItemName,
          description: newItemDescription || undefined,
        }),
      })
      if (!response.ok) throw new Error('Failed to create item')
      setNewItemName('')
      setNewItemDescription('')
      await fetchItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/items/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete item')
      await fetchItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Service - Items Manager</h1>
      </header>

      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchItems}>Retry</button>
        </div>
      )}

      <div className="form-section">
        <h2>Add New Item</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Item description (optional)"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            disabled={loading}
          />
          <button onClick={createItem} disabled={loading || !newItemName.trim()}>
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </div>

      <div className="items-section">
        <h2>Items ({items.length})</h2>
        {loading && <p>Loading...</p>}
        {items.length === 0 && !loading && <p>No items found. Add some items to get started!</p>}
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              {item.description && <p>{item.description}</p>}
              <button
                onClick={() => deleteItem(item.id)}
                disabled={loading}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
