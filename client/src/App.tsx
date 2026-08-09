import { useState } from 'react';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

import { getCurrentUser } from './utils/auth';

import type { AuthUser } from './types/auth';

function App() {
  const [user, setUser] =
    useState<AuthUser | null>(
      getCurrentUser(),
    );

  const [showRegister, setShowRegister] =
    useState(false);

  if (user) {
    if (user.role === 'admin') {
      return (
        <AdminDashboard
          user={user}
          onLogout={() => setUser(null)}
        />
      );
    }

    return (
      <UserDashboard
        user={user}
        onLogout={() => setUser(null)}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterPage
        onSuccess={() =>
          setShowRegister(false)
        }
        onLogin={() =>
          setShowRegister(false)
        }
      />
    );
  }

  return (
    <LoginPage
      onSuccess={setUser}
      onRegister={() =>
        setShowRegister(true)
      }
    />
  );
}

export default App;