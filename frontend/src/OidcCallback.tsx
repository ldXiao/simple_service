import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

export default function OidcCallback() {
  const auth = useAuth();
  useEffect(() => {
    auth.signinRedirectCallback().catch(console.error);
  }, []);
  return <div>Signing in...</div>;
}