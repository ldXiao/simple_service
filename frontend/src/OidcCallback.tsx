import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

export default function OidcCallback() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Clean URL and go home (or wherever you want)
      window.history.replaceState({}, document.title, '/');
      window.location.replace('/');
    }
  }, [auth.isAuthenticated]);

  if (auth.error) return <div>Sign-in error: {auth.error.message}</div>;
  return <div>Signing in...</div>;
}