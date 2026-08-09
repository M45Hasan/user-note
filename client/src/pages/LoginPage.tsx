import LoginForm from '../components/auth/LoginForm';

import type { AuthUser } from '../types/auth';

interface LoginPageProps {
  onSuccess: (user: AuthUser) => void;
  onRegister: () => void;
}

export default function LoginPage({
  onSuccess,
  onRegister,
}: LoginPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Secure Notes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your notes
          </p>
        </div>

        <LoginForm
          onSuccess={onSuccess}
          onRegister={onRegister}
        />
      </div>
    </main>
  );
}