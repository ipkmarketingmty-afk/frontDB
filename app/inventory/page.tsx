import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import InventoryClient from '@/components/InventoryClient'

export default async function InventoryPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('db_session')
  
  if (!sessionCookie) {
    redirect('/')
  }
  
  return <InventoryClient />
}
