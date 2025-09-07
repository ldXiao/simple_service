import { useAuth } from 'react-oidc-context'

interface Item {
  id: number;
  name: string;
  description?: string;
}

export default function Login() {
  const auth = useAuth()
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      {auth.isAuthenticated && (
        <div>Signed in as {auth.user?.profile?.email ?? auth.user?.profile?.preferred_username}</div>
      )}
    </div>
  )
}
