import NoteCard from './NoteCard';

import type { Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  deletingId?: string | null;
}

export default function NoteList({
  notes,
  onEdit,
  onDelete,
  deletingId,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">
          No notes found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          deleting={
            deletingId === note._id
          }
        />
      ))}
    </div>
  );
}