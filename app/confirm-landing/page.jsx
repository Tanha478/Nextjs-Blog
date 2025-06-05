'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function ConfirmLanding() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('🔍 Session:', session)
      if (session) {
        router.replace('/')
      } else {
        router.replace('/login')
      }
    })
  }, [])

  return <p className="text-center mt-10">Verifying session...</p>
}
