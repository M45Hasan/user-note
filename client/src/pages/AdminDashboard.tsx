// import {
//   useCallback,
//   useEffect,
//   useState,
// } from 'react';

// import Pagination from '../components/common/Pagination';
// import UserForm from '../components/admin/UserForm';
// import UserTable from '../components/admin/UserTable';
// import UserNotes from '../components/admin/UserNotes';
// import AggregationPanel from '../components/admin/AggregationPanel';

// import {
//   deleteUser,
//   getUser,
//   getUsers,
//   updateUser,
// } from '../services/userApi';

// import {
//   deleteNote,
//   updateNote,
// } from '../services/noteApi';

// import { logout } from '../utils/auth';

// import type {
//   AuthUser,
// } from '../types/auth';

// import type {
//   AdminUser,
//   UserInput,
// } from '../types/user';

// import type {
//   Note,
//   NoteUpdateInput,
// } from '../types/note';
// import { registerUser } from '../services/authApi';

// interface AdminDashboardProps {
//   user: AuthUser;
//   onLogout: () => void;
// }

// type AdminTab =
//   | 'users'
//   | 'aggregation';

// export default function AdminDashboard({
//   user,
//   onLogout,
// }: AdminDashboardProps) {
//   const [tab, setTab] =
//     useState<AdminTab>('users');

//   const [users, setUsers] =
//     useState<AdminUser[]>([]);

//   const [page, setPage] =
//     useState(1);

//   const [totalPages, setTotalPages] =
//     useState(1);

//   const [hasNextPage, setHasNextPage] =
//     useState(false);

//   const [
//     hasPreviousPage,
//     setHasPreviousPage,
//   ] = useState(false);

//   const [selectedUser, setSelectedUser] =
//     useState<AdminUser | null>(null);

//   const [editingUser, setEditingUser] =
//     useState<AdminUser | null>(null);

//     console.log(editingUser);
//   const [formLoading, setFormLoading] =
//     useState(false);

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState('');

//   const loadUsers = useCallback(
//     async (selectedPage: number) => {
//       setLoading(true);
//       setError('');

//       try {
//         const response =
//           await getUsers(
//             selectedPage,
//           );

//         setUsers(response.data);
//         setPage(
//           response.pagination.page,
//         );
//         setTotalPages(
//           response.pagination
//             .totalPages,
//         );
//         setHasNextPage(
//           response.pagination
//             .hasNextPage,
//         );
//         setHasPreviousPage(
//           response.pagination
//             .hasPreviousPage,
//         );
//       } catch (error) {
//         setError(
//           error instanceof Error
//             ? error.message
//             : 'Failed to load users',
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     void loadUsers(1);
//   }, [loadUsers]);

//   const handleSelectUser = async (
//     user: AdminUser,
//   ) => {
//     setError('');

//     try {
//       const response =
//         await getUser(user._id);

//       setSelectedUser(
//         response.data,
//       );
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : 'Failed to load user',
//       );
//     }
//   };

//   const handleUserSubmit = async (
//     data: UserInput,
//   ) => {
//     if (!editingUser) {
//       setError('No user selected for editing.');    setLoading(true);
      
//           try {
//             await registerUser({
//              userName: data.userName,
//               email: data.email,
//               password: data.password||"Test1@",
//               interests: data.interests,
//             });
      
//            window.alert("User Created Successfully")
//           } catch (error) {
//             setError(
//               error instanceof Error
//                 ? error.message
//                 : 'Registration failed',
//             );
//           } finally {
//             setLoading(false);
//           }
//            await loadUsers(page);
//       return;
//     }

//     setFormLoading(true);
//     setError('');

//     try {
//       await updateUser(
//         editingUser._id,
//         {
//           userName: data.userName,
//           email: data.email,
//           role: data.role,
//           interests: data.interests,
//         },
//       );

//       setEditingUser(null);
//       await loadUsers(page);

//       if (
//         selectedUser?._id ===
//         editingUser._id
//       ) {
//         await handleSelectUser(
//           editingUser,
//         );
//       }
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : 'Failed to update user',
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDeleteUser = async (
//     target: AdminUser,
//   ) => {
//     if (
//       target._id === user.id
//     ) {
//       setError(
//         'You cannot delete your own admin account.',
//       );
//       return;
//     }

//     if (
//       !window.confirm(
//         `Delete ${target.userName}?`,
//       )
//     ) {
//       return;
//     }

//     setError('');

//     try {
//       await deleteUser(
//         target._id,
//       );

//       if (
//         selectedUser?._id ===
//         target._id
//       ) {
//         setSelectedUser(null);
//       }

//       await loadUsers(
//         users.length === 1 &&
//           page > 1
//           ? page - 1
//           : page,
//       );
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : 'Failed to delete user',
//       );
//     }
//   };

//   const handleUpdateNote = async (
//     note: Note,
//   ) => {
//     const title = window.prompt(
//       'Note title',
//       note.title,
//     );

//     if (title === null) {
//       return;
//     }

//     const content = window.prompt(
//       'Note content',
//       note.content,
//     );

//     if (content === null) {
//       return;
//     }

//     const isPublished =
//       window.confirm(
//         note.isPublished
//           ? 'Click OK to keep published. Cancel to unpublish.'
//           : 'Click OK to publish this note. Cancel to keep draft.',
//       );

//     const data: NoteUpdateInput = {
//       title,
//       content,
//       isPublished,
//     };

//     try {
//       await updateNote(
//         note._id,
//         data,
//       );

//       if (selectedUser) {
//         await handleSelectUser(
//           selectedUser,
//         );
//       }
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : 'Failed to update note',
//       );
//     }
//   };

//   const handleDeleteNote = async (
//     note: Note,
//   ) => {
//     if (
//       !window.confirm(
//         `Delete "${note.title}"?`,
//       )
//     ) {
//       return;
//     }

//     try {
//       await deleteNote(
//         note._id,
//       );

//       if (selectedUser) {
//         await handleSelectUser(
//           selectedUser,
//         );
//       }
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : 'Failed to delete note',
//       );
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     onLogout();
//   };

//   const selectedNotes = [
//     ...(selectedUser?.notes || []),
//   ].sort(
//     (a, b) =>
//       new Date(
//         b.createdAt,
//       ).getTime() -
//       new Date(
//         a.createdAt,
//       ).getTime(),
//   );

//   return (
//     <main className="min-h-screen bg-slate-100">
//       <header className="border-b border-slate-200 bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//           <div>
//             <h1 className="font-bold text-slate-900">
//               Secure Notes Admin
//             </h1>

//             <p className="text-xs text-slate-500">
//               {user.userName}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="mx-auto max-w-7xl px-4 py-6">
//         <div className="mb-6 flex gap-2">
//           <button
//             type="button"
//             onClick={() =>
//               setTab('users')
//             }
//             className={`rounded-lg px-4 py-2 text-sm font-medium ${
//               tab === 'users'
//                 ? 'bg-slate-900 text-white'
//                 : 'bg-white text-slate-600'
//             }`}
//           >
//             Users
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               setTab('aggregation')
//             }
//             className={`rounded-lg px-4 py-2 text-sm font-medium ${
//               tab === 'aggregation'
//                 ? 'bg-slate-900 text-white'
//                 : 'bg-white text-slate-600'
//             }`}
//           >
//             Aggregation
//           </button>
//         </div>

//         {error && (
//           <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {tab === 'aggregation' ? (
//           <AggregationPanel />
//         ) : (
//           <div className="space-y-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
//               <section>
//                 <div className="mb-4 flex items-center justify-between">
//                   <div>
//                     <h2 className="text-xl font-semibold">
//                       Users
//                     </h2>

//                     <p className="text-sm text-slate-500">
//                       Manage platform users
//                     </p>
//                   </div>
//                 </div>

//                 {loading ? (
//                   <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">
//                     Loading users...
//                   </div>
//                 ) : (
//                   <UserTable
//                     users={users}
//                     selectedUserId={
//                       selectedUser?._id
//                     }
//                     onSelect={
//                       handleSelectUser
//                     }
//                     onEdit={
//                       setEditingUser
//                     }
//                     onDelete={
//                       handleDeleteUser
//                     }
//                   />
//                 )}

//                 <Pagination
//                   page={page}
//                   totalPages={totalPages}
//                   hasNextPage={
//                     hasNextPage
//                   }
//                   hasPreviousPage={
//                     hasPreviousPage
//                   }
//                   onPageChange={
//                     loadUsers
//                   }
//                 />
//               </section>

//               <section>
//                 <UserForm
//                   user={editingUser}
//                   loading={formLoading}
//                   onSubmit={
//                     handleUserSubmit
//                   }
//                   onCancel={() =>
//                     setEditingUser(null)
//                   }
//                 />
//               </section>
//             </div>

//             {selectedUser && (
//               <section className="space-y-4">
//                 <div className="rounded-xl border border-slate-200 bg-white p-5">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h2 className="text-lg font-semibold">
//                         {selectedUser.userName}
//                       </h2>

//                       <p className="text-sm text-slate-500">
//                         {selectedUser.email}
//                       </p>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setSelectedUser(
//                           null,
//                         )
//                       }
//                       className="text-sm text-slate-500"
//                     >
//                       Close
//                     </button>
//                   </div>

//                   <div className="mt-4 flex flex-wrap gap-2">
//                     <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
//                       {selectedUser.role}
//                     </span>

//                     {selectedUser.interests?.map(
//                       (interest) => (
//                         <span
//                           key={interest}
//                           className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
//                         >
//                           {interest}
//                         </span>
//                       ),
//                     )}
//                   </div>
//                 </div>

//                 <UserNotes
//                   notes={selectedNotes}
//                   onEdit={
//                     handleUpdateNote
//                   }
//                   onDelete={
//                     handleDeleteNote
//                   }
//                 />
//               </section>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import Pagination from '../components/common/Pagination';
import UserForm from '../components/admin/UserForm';
import UserTable from '../components/admin/UserTable';
import UserNotes from '../components/admin/UserNotes';
import AggregationPanel from '../components/admin/AggregationPanel';
import MyNotesPanel from '../components/notes/MyNotesPanel';

import {
  deleteUser,
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '../services/userApi';

import {
  deleteNote,
  updateNote,
} from '../services/noteApi';

import { logout } from '../utils/auth';

import type { AuthUser } from '../types/auth';

import type {
  AdminUser,
  UserInput,
} from '../types/user';

import type {
  Note,
  NoteUpdateInput,
} from '../types/note';

interface AdminDashboardProps {
  user: AuthUser;
  onLogout: () => void;
}

type AdminTab =
  | 'notes'
  | 'users'
  | 'aggregation';

export default function AdminDashboard({
  user,
  onLogout,
}: AdminDashboardProps) {
  const [tab, setTab] =
    useState<AdminTab>('notes');

  const [users, setUsers] =
    useState<AdminUser[]>([]);

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

  const [selectedUser, setSelectedUser] =
    useState<AdminUser | null>(null);

  const [editingUser, setEditingUser] =
    useState<AdminUser | null>(null);

  const [formLoading, setFormLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const loadUsers = useCallback(
    async (selectedPage: number) => {
      setLoading(true);
      setError('');

      try {
        const response =
          await getUsers(selectedPage);

        setUsers(response.data);

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
            : 'Failed to load users',
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadUsers(1);
  }, [loadUsers]);

  const handleSelectUser = async (
    selected: AdminUser,
  ) => {
    setError('');

    try {
      const response =
        await getUser(selected._id);

      setSelectedUser(
        response.data,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load user',
      );
    }
  };

  const handleUserSubmit = async (
    data: UserInput,
  ) => {
    setFormLoading(true);
    setError('');

    try {
      // CREATE USER
      if (!editingUser) {
        await createUser({
          userName: data.userName,
          email: data.email,
          password:
            data.password || 'Test1@',
          role: data.role,
          interests: data.interests,
        });

        window.alert(
          'User created successfully',
        );

        await loadUsers(page);

        return;
      }

      // UPDATE USER
      await updateUser(
        editingUser._id,
        {
          userName: data.userName,
          email: data.email,
          role: data.role,
          interests: data.interests,
        },
      );

      setEditingUser(null);

      await loadUsers(page);

      // Refresh selected user
      if (
        selectedUser?._id ===
        editingUser._id
      ) {
        const response =
          await getUser(
            editingUser._id,
          );

        setSelectedUser(
          response.data,
        );
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : editingUser
            ? 'Failed to update user'
            : 'Failed to create user',
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (
    target: AdminUser,
  ) => {
    if (
      target._id === user.id
    ) {
      setError(
        'You cannot delete your own admin account.',
      );
      return;
    }

    if (
      !window.confirm(
        `Delete ${target.userName}?`,
      )
    ) {
      return;
    }

    setError('');

    try {
      await deleteUser(
        target._id,
      );

      if (
        selectedUser?._id ===
        target._id
      ) {
        setSelectedUser(null);
      }

      await loadUsers(
        users.length === 1 &&
          page > 1
          ? page - 1
          : page,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to delete user',
      );
    }
  };

  const handleUpdateNote = async (
    note: Note,
  ) => {
    const title = window.prompt(
      'Note title',
      note.title,
    );

    if (title === null) {
      return;
    }

    const content = window.prompt(
      'Note content',
      note.content,
    );

    if (content === null) {
      return;
    }

    const isPublished =
      window.confirm(
        note.isPublished
          ? 'Click OK to keep published. Cancel to unpublish.'
          : 'Click OK to publish this note. Cancel to keep draft.',
      );

    const data: NoteUpdateInput = {
      title,
      content,
      isPublished,
    };

    try {
      await updateNote(
        note._id,
        data,
      );

      if (selectedUser) {
        const response =
          await getUser(
            selectedUser._id,
          );

        setSelectedUser(
          response.data,
        );
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to update note',
      );
    }
  };

  const handleDeleteNote = async (
    note: Note,
  ) => {
    if (
      !window.confirm(
        `Delete "${note.title}"?`,
      )
    ) {
      return;
    }

    try {
      await deleteNote(
        note._id,
      );

      if (selectedUser) {
        const response =
          await getUser(
            selectedUser._id,
          );

        setSelectedUser(
          response.data,
        );
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to delete note',
      );
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const selectedNotes = [
    ...(selectedUser?.notes || []),
  ].sort(
    (a, b) =>
      new Date(
        b.createdAt,
      ).getTime() -
      new Date(
        a.createdAt,
      ).getTime(),
  );

  return (
    <main className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-bold text-slate-900">
              Secure Notes
            </h1>

            <p className="text-xs text-slate-500">
              Admin: {user.userName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* TABS */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setTab('notes')
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === 'notes'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            My Notes
          </button>

          <button
            type="button"
            onClick={() =>
              setTab('users')
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === 'users'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            Users
          </button>

          <button
            type="button"
            onClick={() =>
              setTab('aggregation')
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === 'aggregation'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            Aggregation
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* MY NOTES */}
        {tab === 'notes' && (
          <MyNotesPanel
            user={user}
          />
        )}

        {/* AGGREGATION */}
        {tab === 'aggregation' && (
          <AggregationPanel />
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              {/* USER LIST */}
              <section>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">
                    Users
                  </h2>

                  <p className="text-sm text-slate-500">
                    Manage platform users
                  </p>
                </div>

                {loading ? (
                  <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">
                    Loading users...
                  </div>
                ) : (
                  <UserTable
                    users={users}
                    selectedUserId={
                      selectedUser?._id
                    }
                    onSelect={
                      handleSelectUser
                    }
                    onEdit={
                      setEditingUser
                    }
                    onDelete={
                      handleDeleteUser
                    }
                  />
                )}

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
                    loadUsers
                  }
                />
              </section>

              {/* USER FORM */}
              <section>
                <UserForm
                  user={editingUser}
                  loading={formLoading}
                  onSubmit={
                    handleUserSubmit
                  }
                  onCancel={() =>
                    setEditingUser(null)
                  }
                />
              </section>
            </div>

            {/* SELECTED USER */}
            {selectedUser && (
              <section className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {selectedUser.userName}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {selectedUser.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedUser(
                          null,
                        )
                      }
                      className="text-sm text-slate-500"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                      {selectedUser.role}
                    </span>

                    {selectedUser.interests?.map(
                      (interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                        >
                          {interest}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <UserNotes
                  notes={selectedNotes}
                  onEdit={
                    handleUpdateNote
                  }
                  onDelete={
                    handleDeleteNote
                  }
                />
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}