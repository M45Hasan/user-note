import type { AdminUser } from '../../types/user';

interface UserTableProps {
  users: AdminUser[];
  selectedUserId?: string;
  onSelect: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export default function UserTable({
  users,
  selectedUserId,
  onSelect,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3">
                User
              </th>

              <th className="px-4 py-3">
                Email
              </th>

              <th className="px-4 py-3">
                Role
              </th>

              <th className="px-4 py-3">
                Interests
              </th>

              <th className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr
                key={user._id}
                className={
                  selectedUserId ===
                  user._id
                    ? 'bg-slate-50'
                    : ''
                }
              >
                <td className="px-4 py-3 font-medium">
                  {user.userName}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {user.email}
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {user.interests?.join(
                    ', ',
                  ) || '-'}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onSelect(user)
                      }
                      className="rounded-lg border px-3 py-1.5 text-xs"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(user)
                      }
                      className="rounded-lg border px-3 py-1.5 text-xs"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(user)
                      }
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}