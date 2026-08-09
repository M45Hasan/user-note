import { useState } from 'react';

import Input from '../common/Input';
import Button from '../common/Button';

import { registerUser } from '../../services/authApi';

interface RegisterFormProps {
  onSuccess: () => void;
  onLogin: () => void;
}

export default function RegisterForm({
  onSuccess,
  onLogin,
}: RegisterFormProps) {
  const [userName, setUserName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [interestInput, setInterestInput] =
    useState('');

  const [interests, setInterests] =
    useState<string[]>([]);

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const addInterest = () => {
    const value =
      interestInput.trim().toLowerCase();

    if (
      value &&
      !interests.includes(value)
    ) {
      setInterests([
        ...interests,
        value,
      ]);
    }

    setInterestInput('');
  };

  const removeInterest = (
    interest: string,
  ) => {
    setInterests(
      interests.filter(
        (item) => item !== interest,
      ),
    );
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match',
      );
      return;
    }

    if (interests.length === 0) {
      setError(
        'At least one interest is required',
      );
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        userName,
        email,
        password,
        interests,
      });

      onSuccess();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Registration failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Username"
        placeholder="Your name"
        value={userName}
        onChange={(e) =>
          setUserName(e.target.value)
        }
        required
      />

      <Input
        label="Gmail (Only)"
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
        placeholder="Min 6 : 1 lowercase 1 uppercase  1 number 1 special char "
        
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value,
          )
        }
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Interests
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. technology"
            value={interestInput}
            onChange={(e) =>
              setInterestInput(
                e.target.value,
              )
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addInterest();
              }
            }}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          />

          <button
            type="button"
            onClick={addInterest}
            className="rounded-lg border border-slate-300 px-4 text-sm hover:bg-slate-50"
          >
            Add
          </button>
        </div>

        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {interests.map(
              (interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() =>
                    removeInterest(
                      interest,
                    )
                  }
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                >
                  {interest} ×
                </button>
              ),
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        loading={loading}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onLogin}
          className="font-medium text-slate-900 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}