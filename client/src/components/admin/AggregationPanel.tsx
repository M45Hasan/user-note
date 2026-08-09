import { useEffect, useState } from 'react';

import Pagination from '../common/Pagination';

import {
  getUsersByInterests,
} from '../../services/adminApi';

interface InterestGroup {
  _id: string;
  users: {
    id: string;
    userName: string;
    email: string;
  }[];
  userCount: number;
}

export default function AggregationPanel() {
  const [groups, setGroups] =
    useState<InterestGroup[]>([]);

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState({
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const loadData = async (
    selectedPage: number,
  ) => {
    setLoading(true);
    setError('');

    try {
      const response =
        await getUsersByInterests(
          selectedPage,
          10,
        );

      setGroups(response.data);
      setPage(
        response.pagination.page,
      );

      setPagination({
        totalPages:
          response.pagination
            .totalPages,
        hasNextPage:
          response.pagination
            .hasNextPage,
        hasPreviousPage:
          response.pagination
            .hasPreviousPage,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load aggregation',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData(1);
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">
        Users by Interests
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Aggregation result
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">
          Loading...
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {groups.map((group) => (
            <div
              key={group._id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex justify-between">
                <h3 className="font-medium capitalize">
                  {group._id}
                </h3>

                <span className="text-sm text-slate-500">
                  {group.userCount}{' '}
                  users
                </span>
              </div>

              <div className="mt-3 space-y-1">
                {group.users.map(
                  (user) => (
                    <div
                      key={user.id}
                      className="text-sm text-slate-600"
                    >
                      {user.userName}{' '}
                      <span className="text-slate-400">
                        ({user.email})
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={
          pagination.totalPages
        }
        hasNextPage={
          pagination.hasNextPage
        }
        hasPreviousPage={
          pagination.hasPreviousPage
        }
        onPageChange={loadData}
      />
    </section>
  );
}