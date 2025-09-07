import { AuthProvider } from 'react-oidc-context';

export function OIDCProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider
      authority={import.meta.env.VITE_OIDC_ISSUER}
      client_id={import.meta.env.VITE_OIDC_CLIENT_ID}
      redirect_uri={import.meta.env.VITE_OIDC_REDIRECT_URI}
      post_logout_redirect_uri={import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI}
      response_type="code"
      scope={import.meta.env.VITE_OIDC_SCOPE ?? 'openid profile email'}
      automaticSilentRenew
      onSigninCallback={() => {
        // remove query/hash without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
      }}
    >
      {children}
    </AuthProvider>
  );
}