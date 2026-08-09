import { useEffect, useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';

import type {
  Note,
  NoteInput,
} from '../../types/note';

interface NoteFormProps {
  note?: Note | null;
  loading?: boolean;
  onSubmit: (
    data: NoteInput,
  ) => Promise<void>;
  onCancel: () => void;
}

const initialState: NoteInput = {
  title: '',
  content: '',
  isPublic: false,
  isPublished: false,
};

export default function NoteForm({
  note,
  loading = false,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [form, setForm] =
    useState<NoteInput>(
      initialState,
    );

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title,
        content: note.content,
        isPublic: note.isPublic,
        isPublished: note.isPublished,
      });
    } else {
      setForm(initialState);
    }
  }, [note]);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          {note
            ? 'Edit Note'
            : 'Create Note'}
        </h2>

        {note && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            Cancel
          </button>
        )}
      </div>

      <Input
        label="Title"
        value={form.title}
        placeholder="Note title"
        onChange={(event) =>
          setForm({
            ...form,
            title: event.target.value,
          })
        }
        required
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Content
        </label>

        <textarea
          value={form.content}
          placeholder="Write your note..."
          onChange={(event) =>
            setForm({
              ...form,
              content:
                event.target.value,
            })
          }
          required
          rows={6}
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="flex flex-wrap gap-5">
        {/* <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={(event) =>
              setForm({
                ...form,
                isPublic:
                  event.target.checked,
              })
            }
          />
          Public
        </label> */}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) =>
              setForm({
                ...form,
                isPublished:
                  event.target.checked,
              })
            }
          />
          Published
        </label>
      </div>

      <Button
        type="submit"
        loading={loading}
      >
        {note
          ? 'Update Note'
          : 'Create Note'}
      </Button>
    </form>
  );
}