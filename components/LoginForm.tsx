'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    host: '',
    port: '5432',
    user: '',
    password: '',
    database: '',
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          port: parseInt(formData.port),
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al conectar')
      }
      
      router.push('/inventory')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Host</label>
        <input
          type="text"
          className="input-vault"
          placeholder="localhost o IP del servidor"
          value={formData.host}
          onChange={(e) => setFormData({ ...formData, host: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Puerto</label>
        <input
          type="number"
          className="input-vault"
          placeholder="5432"
          value={formData.port}
          onChange={(e) => setFormData({ ...formData, port: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Usuario</label>
        <input
          type="text"
          className="input-vault"
          placeholder="postgres"
          value={formData.user}
          onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Contraseña</label>
        <input
          type="password"
          className="input-vault"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Base de Datos</label>
        <input
          type="text"
          className="input-vault"
          placeholder="nombre_bd"
          value={formData.database}
          onChange={(e) => setFormData({ ...formData, database: e.target.value })}
          required
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-950 border border-red-800 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        className="w-full btn-vault-primary"
        disabled={loading}
      >
        {loading ? 'Conectando...' : 'Conectar'}
      </button>
    </form>
  )
}
