import { useState } from 'react';

import Input from '../common/Input';
import Button from '../common/Button';

import { loginUser } from '../../services/authApi';
import { loginSession } from '../../utils/auth';

import type { AuthUser } from '../../types/auth';

interface LoginFormProps {
  onSuccess: (user: AuthUser) => void;
  onRegister: () => void;
}

export default function LoginForm({
  onSuccess,
  onRegister,
}: LoginFormProps) {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response =
        await loginUser({
          email,
          password,
        });

      loginSession(
        response.data.accessToken,
        response.data.user,
      );

      onSuccess(response.data.user);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Gmail"
        type="email"
        placeholder="you@gmail.com"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
      />

      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        loading={loading}
      >
        Login
      </Button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onRegister}
          className="font-medium text-slate-900 hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}