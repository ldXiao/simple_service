import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated && !auth.activeNavigator) {
      // Kick off OIDC login redirect
      auth.signinRedirect().catch(console.error);
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.activeNavigator]);

  if (auth.isLoading || auth.activeNavigator) return <div>Loading...</div>;
  if (!auth.isAuthenticated) return <div>Redirecting to login…</div>;

  return <>{children}</>;
}