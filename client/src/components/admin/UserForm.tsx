// import {  useState } from 'react';

// import Input from '../common/Input';
// import Button from '../common/Button';

// import type {
//   AdminUser,
//   UserInput,
//   UserRole,
// } from '../../types/user';

// interface UserFormProps {
//   user?: AdminUser | null;
//   loading?: boolean;
//   onSubmit: (
//     data: UserInput,
//   ) => Promise<void>;
//   onCancel: () => void;
// }

// export default function UserForm({
//   user,
//   loading = false,
//   onSubmit,
//   onCancel,
// }: UserFormProps) {
//   const [userName, setUserName] =
//     useState(() => user?.userName ?? '');

//   const [email, setEmail] =
//     useState(() => user?.email ?? '');

//   const [password, setPassword] =
//     useState(() => '');

//   const [role, setRole] =
//     useState<UserRole>(() => user?.role ?? 'user');

//   const [interestInput, setInterestInput] =
//     useState('');

//   const [interests, setInterests] =
//     useState<string[]>(() => user?.interests ?? []);



//   const addInterest = () => {
//     const value =
//       interestInput.trim().toLowerCase();

//     if (
//       value &&
//       !interests.includes(value)
//     ) {
//       setInterests([
//         ...interests,
//         value,
//       ]);
//     }

//     setInterestInput('');
//   };

//   const removeInterest = (
//     interest: string,
//   ) => {
//     setInterests(
//       interests.filter(
//         (item) => item !== interest,
//       ),
//     );
//   };

//   const handleSubmit = async (
//     event: React.SyntheticEvent<HTMLFormElement>,
//   ) => {
//     event.preventDefault();

//     await onSubmit({
//       userName,
//       email,
//       ...(user ? {} : { password: password || "Test1@" }),
//       role,
//       interests,
//     });
//   };

 

//   return (
//     <form
//       key={user ? `${user.userName}:${user.email}` : 'new'}
//       onSubmit={handleSubmit}
//       className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
//     >
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-semibold">
//           {user
//             ? 'Edit User'
//             : 'Create User'}
//         </h2>

//         {user && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="text-sm text-slate-500"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       <Input
//         label="Username"
//         value={userName}
//         onChange={(e) =>
//           setUserName(e.target.value)
//         }
//         required
//       />

//       <Input
//         label="Gmail (Only)"
//         type="email"
//         value={email}
//         onChange={(e) =>
//           setEmail(e.target.value)
//         }
//         required
//       />

//       {!user && (
//         <Input
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//           required
//         />
//       )}

//       <div className="space-y-1.5">
//         <label className="text-sm font-medium text-slate-700">
//           Role
//         </label>

//         <select
//           value={role}
//           onChange={(e) =>
//             setRole(
//               e.target.value as UserRole,
//             )
//           }
//           className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
//         >
//           <option value="user">
//             User
//           </option>

//           <option value="admin">
//             Admin
//           </option>
//         </select>
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-slate-700">
//           Interests
//         </label>

//         <div className="flex gap-2">
//           <input
//             value={interestInput}
//             onChange={(e) =>
//               setInterestInput(
//                 e.target.value,
//               )
//             }
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 e.preventDefault();
//                 addInterest();
//               }
//             }}
//             placeholder="Add interest"
//             className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
//           />

//           <button
//             type="button"
//             onClick={addInterest}
//             className="rounded-lg border px-4 text-sm"
//           >
//             Add
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {interests.map(
//             (interest) => (
//               <button
//                 key={interest}
//                 type="button"
//                 onClick={() =>
//                   removeInterest(
//                     interest,
//                   )
//                 }
//                 className="rounded-full bg-slate-100 px-3 py-1 text-xs"
//               >
//                 {interest} ×
//               </button>
//             ),
//           )}
//         </div>
//       </div>

//       <Button
//         type="submit"
//         loading={loading}
//       >
//         {user
//           ? 'Update User'
//           : 'Create User'}
//       </Button>
//     </form>
//   );
// }

import {
  useEffect,
  useState,
} from 'react';

import Input from '../common/Input';
import Button from '../common/Button';

import type {
  AdminUser,
  UserInput,
  UserRole,
} from '../../types/user';

interface UserFormProps {
  user?: AdminUser | null;
  loading?: boolean;
  onSubmit: (
    data: UserInput,
  ) => Promise<void>;
  onCancel: () => void;
}

export default function UserForm({
  user,
  loading = false,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [userName, setUserName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState<UserRole>('user');

  const [interestInput, setInterestInput] =
    useState('');

  const [interests, setInterests] =
    useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setUserName(user.userName ?? '');
      setEmail(user.email ?? '');
      setRole(user.role ?? 'user');
      setInterests(user.interests ?? []);
      setPassword('');
    } else {
      setUserName('');
      setEmail('');
      setPassword('');
      setRole('user');
      setInterests([]);
      setInterestInput('');
    }
  }, [user]);

  const addInterest = () => {
    const value =
      interestInput.trim().toLowerCase();

    if (
      value &&
      !interests.includes(value)
    ) {
      setInterests((prev) => [
        ...prev,
        value,
      ]);
    }

    setInterestInput('');
  };

  const removeInterest = (
    interest: string,
  ) => {
    setInterests((prev) =>
      prev.filter(
        (item) => item !== interest,
      ),
    );
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onSubmit({
      userName,
      email,
      ...(user
        ? {}
        : {
            password:
              password || 'Test1@',
          }),
      role,
      interests,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {user
            ? 'Edit User'
            : 'Create User'}
        </h2>

        {user && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-slate-500"
          >
            Cancel
          </button>
        )}
      </div>

      <Input
        label="Username"
        value={userName}
        onChange={(e) =>
          setUserName(e.target.value)
        }
        required
      />

      <Input
        label="Gmail (Only)"
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      {!user && (
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Role
        </label>

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as UserRole,
            )
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        >
          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Interests
        </label>

        <div className="flex gap-2">
          <input
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
            placeholder="Add interest"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />

          <button
            type="button"
            onClick={addInterest}
            className="rounded-lg border px-4 text-sm"
          >
            Add
          </button>
        </div>

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
                className="rounded-full bg-slate-100 px-3 py-1 text-xs"
              >
                {interest} ×
              </button>
            ),
          )}
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
      >
        {user
          ? 'Update User'
          : 'Create User'}
      </Button>
    </form>
  );
}