import RegisterForm from '../components/auth/RegisterForm';

interface RegisterPageProps {
  onSuccess: () => void;
  onLogin: () => void;
}

export default function RegisterPage({
  onSuccess,
  onLogin,
}: RegisterPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your Secure Notes account
          </p>
        </div>

        <RegisterForm
          onSuccess={onSuccess}
          onLogin={onLogin}
        />
      </div>
    </main>
  );
}