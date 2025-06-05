'use client';

import { useEffect, useState } from 'react';
import { usePathname , useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../components/theme-provider';

export default function AuthLayout({ children }) {
    const supabase = createClient();
    const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

   const publicRoutes = ['/login', '/signup', '/auth/confirm', '/check-email', '/error'];

  useEffect(() => {
    if (!publicRoutes.includes(pathname)) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && window.location.pathname !== '/login') {
        router.push('/login');
      } else {
        setChecking(false);
      }
    });
}
    else {
      setChecking(false);
    }
  }, [pathname]);

  if (checking) return <p>Checking auth...</p>;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
