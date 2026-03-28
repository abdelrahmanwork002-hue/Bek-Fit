'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({ children, requireOnboarding = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else if (requireOnboarding && !user?.hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  }, [isAuthenticated, user, requireOnboarding, router]);

  if (!isAuthenticated || (requireOnboarding && !user?.hasCompletedOnboarding)) {
    return null; // Return nothing while redirecting
  }

  return <>{children}</>;
}
