import type { Note } from '../../types/note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  deleting?: boolean;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  deleting = false,
}: NoteCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {note.title}
          </h3>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {note.content}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs ${
              note.isPublished
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {note.isPublished
              ? 'Published'
              : 'Draft'}
          </span>

          {/* {note.isPublic && (
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700">
              Public
            </span>
          )} */}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {new Date(
            note.updatedAt,
          ).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={() => onDelete(note)}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
          >
            {deleting
              ? 'Deleting...'
              : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}