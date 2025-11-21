import { NextRequest, NextResponse } from 'next/server'
import { testConnection, encodeDbSession, type DbCredentials } from '@/lib/db'
import { serialize } from 'cookie'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { host, port, user, password, database } = body
    
    if (!host || !port || !user || !password || !database) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }
    
    const credentials: DbCredentials = {
      host,
      port: parseInt(port),
      user,
      password,
      database,
    }
    
    const isConnected = await testConnection(credentials)
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'No se pudo conectar a la base de datos. Verifica tus credenciales.' },
        { status: 401 }
      )
    }
    
    const sessionValue = encodeDbSession(credentials)
    
    const cookie = serialize('db_session', sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error del servidor' },
      { status: 500 }
    )
  }
}
