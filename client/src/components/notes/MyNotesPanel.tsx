import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import NoteForm from './NoteForm';
import NoteList from './NoteList';

import Pagination from '../common/Pagination';

import {
  createNote,
  deleteNote,
  getMyNotes,
  getPublicNotes,
  updateNote,
} from '../../services/noteApi';

import type { AuthUser } from '../../types/auth';

import type {
  Note,
  NoteInput,
} from '../../types/note';

interface MyNotesPanelProps {
  user: AuthUser;
}

type NoteTab = 'mine' | 'public';

export default function MyNotesPanel({ user }: MyNotesPanelProps) {
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

  const [
    hasPreviousPage,
    setHasPreviousPage,
  ] = useState(false);

  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [formLoading, setFormLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

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
    setEditingNote(null);
    void loadNotes(1);
  }, [tab, loadNotes]);

  const handleSubmit = async (
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

      const nextPage =
        notes.length === 1 &&
        page > 1
          ? page - 1
          : page;

      await loadNotes(nextPage);
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
console.log(user);
  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* NOTE FORM */}
        <section>
          <NoteForm
            note={editingNote}
            loading={formLoading}
            onSubmit={handleSubmit}
            onCancel={() =>
              setEditingNote(null)
            }
          />
        </section>

        {/* NOTES */}
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                My Notes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your notes
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

              <button
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
                Public Notes
              </button>
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
                deletingId={deletingId}
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
                onPageChange={loadNotes}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}