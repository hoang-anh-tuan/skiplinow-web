import * as React from 'react'
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import { fakeAuthProvider } from './auth'
import LoginPage from './pages/LoginPage'
import ProtectedPage from './pages/ProtectedPage'
import PublicPage from './pages/PublicPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <PublicPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

function Layout() {
  return (
    <div className="w-screen">
      <Outlet />
    </div>
  )
}

interface AuthContextType {
  user: any
  signin: (user: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

let AuthContext = React.createContext<AuthContextType>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null)

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />
  }

  return children
}
