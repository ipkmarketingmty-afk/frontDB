'use client'

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    stock: number
    image: string | null
  }
  onEdit: () => void
  onDelete: () => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="card-vault group hover:border-vault-gray transition-all">
      <div className="aspect-square bg-vault-black rounded-lg mb-4 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
      
      {product.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        <span className={`text-sm px-3 py-1 rounded-full ${
          product.stock > 10 
            ? 'bg-green-950 text-green-200' 
            : product.stock > 0 
            ? 'bg-yellow-950 text-yellow-200'
            : 'bg-red-950 text-red-200'
        }`}>
          Stock: {product.stock}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 btn-vault text-sm"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex-1 btn-vault text-sm hover:bg-red-950 hover:border-red-800 hover:text-red-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
