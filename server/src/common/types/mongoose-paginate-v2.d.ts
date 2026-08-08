import type { Model, FilterQuery } from "mongoose";

declare module "mongoose-paginate-v2" {
  export interface PaginateOptions {
    select?: any;
    sort?: any;
    populate?: any;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;
    pagination?: boolean;
    customLabels?: Record<string, string>;
  }

  export interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page?: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage?: number | null;
    nextPage?: number | null;
  }

  export interface PaginateModel<T> extends Model<T> {
    paginate(
      query?: FilterQuery<T>,
      options?: PaginateOptions
    ): Promise<PaginateResult<T>>;
  }

  const paginate: (schema: any) => void;
  export default paginate;
}
