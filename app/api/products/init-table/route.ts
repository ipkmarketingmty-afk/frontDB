import { NextRequest, NextResponse } from 'next/server'
import { parseDbSession, createPool, ensureProductsTable } from '@/lib/db'

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  const credentials = parseDbSession(cookieHeader)
  
  if (!credentials) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  
  const pool = createPool(credentials)
  
  try {
    await ensureProductsTable(pool)
    await pool.end()
    return NextResponse.json({ success: true, message: 'Tabla creada exitosamente' })
  } catch (error: any) {
    await pool.end()
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
