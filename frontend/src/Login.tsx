import { useAuth } from 'react-oidc-context'

export default function Login() {
  const auth = useAuth()

  if (auth.isLoading) return <div>Loading...</div>

  if (!auth.isAuthenticated) {
    return (
      <div className="login">
        <h2>Login</h2>
        <button onClick={() => auth.signinRedirect()}>Sign in with SSO</button>
      </div>
    )
  }

  return (
    <div className="login">
      <div>Signed in as {auth.user?.profile?.email ?? auth.user?.profile?.preferred_username}</div>
      <button onClick={() => auth.signoutRedirect()}>Sign out</button>
    </div>
  )
}
