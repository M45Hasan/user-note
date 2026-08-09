import { useCallback, useEffect, useState } from 'react';

import NoteForm from '../components/notes/NoteForm';
import NoteList from '../components/notes/NoteList';
import Pagination from '../components/common/Pagination';

import {
  createNote,
  deleteNote,
  getMyNotes,
  getPublicNotes,
  updateNote,
} from '../services/noteApi';

import { logout } from '../utils/auth';

import type {
  AuthUser,
} from '../types/auth';

import type {
  Note,
  NoteInput,
} from '../types/note';

interface UserDashboardProps {
  user: AuthUser;
  onLogout: () => void;
}

type NoteTab = 'mine' | 'public';

export default function UserDashboard({
  user,
  onLogout,
}: UserDashboardProps) {
  const [tab, setTab] =
    useState<NoteTab>('mine');

  const [notes, setNotes] =
    useState<Note[]>([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [hasNextPage, setHasNextPage] =
    useState(false);

  const [hasPreviousPage, setHasPreviousPage] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  const [formLoading, setFormLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const loadNotes = useCallback(
    async (selectedPage: number) => {
      setLoading(true);
      setError('');

      try {
        const response =
          tab === 'mine'
            ? await getMyNotes(
                selectedPage,
              )
            : await getPublicNotes(
                selectedPage,
              );

        setNotes(response.data);
        setPage(
          response.pagination.page,
        );
        setTotalPages(
          response.pagination.totalPages,
        );
        setHasNextPage(
          response.pagination.hasNextPage,
        );
        setHasPreviousPage(
          response.pagination.hasPreviousPage,
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load notes',
        );
      } finally {
        setLoading(false);
      }
    },
    [tab],
  );

  useEffect(() => {
    setPage(1);
    void loadNotes(1);
  }, [tab, loadNotes]);

  const handleCreateOrUpdate = async (
    data: NoteInput,
  ) => {
    setFormLoading(true);
    setError('');

    try {
      if (editingNote) {
        await updateNote(
          editingNote._id,
          data,
        );
      } else {
        await createNote(data);
      }

      setEditingNote(null);
      await loadNotes(1);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to save note',
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (
    note: Note,
  ) => {
    const confirmed = window.confirm(
      `Delete "${note.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(note._id);
    setError('');

    try {
      await deleteNote(note._id);

      await loadNotes(
        notes.length === 1 &&
          page > 1
          ? page - 1
          : page,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to delete note',
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-bold text-slate-900">
              Secure Notes
            </h1>

            <p className="text-xs text-slate-500">
              Welcome, {user.userName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <section>
            <NoteForm
              note={editingNote}
              loading={formLoading}
              onSubmit={
                handleCreateOrUpdate
              }
              onCancel={() =>
                setEditingNote(null)
              }
            />
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Notes
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {tab === 'mine'
                    ? 'Your notes'
                    : 'Public published notes'}
                </p>
              </div>

              <div className="flex rounded-lg border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() =>
                    setTab('mine')
                  }
                  className={`rounded-md px-3 py-1.5 text-sm ${
                    tab === 'mine'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600'
                  }`}
                >
                  My Notes
                </button>

                {/* <button
                  type="button"
                  onClick={() =>
                    setTab('public')
                  }
                  className={`rounded-md px-3 py-1.5 text-sm ${
                    tab === 'public'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600'
                  }`}
                >
                  Public
                </button> */}
              </div>
            </div>

            {loading ? (
              <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">
                Loading notes...
              </div>
            ) : (
              <>
                <NoteList
                  notes={notes}
                  onEdit={
                    tab === 'mine'
                      ? setEditingNote
                      : () => undefined
                  }
                  onDelete={
                    tab === 'mine'
                      ? handleDelete
                      : () => undefined
                  }
                  deletingId={
                    deletingId
                  }
                />

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  hasNextPage={
                    hasNextPage
                  }
                  hasPreviousPage={
                    hasPreviousPage
                  }
                  onPageChange={
                    loadNotes
                  }
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}