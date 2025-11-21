import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BlackVault Inventory',
  description: 'Sistema de gestión de inventario con diseño Pure Black Mode',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-vault-black text-vault-text antialiased">
        {children}
      </body>
    </html>
  )
}
