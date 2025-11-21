import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { destroySession } from '@/lib/db'

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  destroySession(cookieHeader)
  
  const cookie = serialize('db_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
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
}
