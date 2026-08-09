import type { Note } from '../../types/note';

interface UserNotesProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export default function UserNotes({
  notes,
  onEdit,
  onDelete,
}: UserNotesProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h3 className="font-semibold">
          User Notes
        </h3>
      </div>

      {notes.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">
          No notes found.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium">
                    {note.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {note.content}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">
                    {note.isPublished
                      ? 'Published'
                      : 'Draft'}
                  </span>

                  {/* {note.isPublic && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                      Public
                    </span>
                  )} */}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onEdit(note)
                  }
                  className="rounded-lg border px-3 py-1.5 text-xs"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onDelete(note)
                  }
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}