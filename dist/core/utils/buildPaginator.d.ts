import { Paginator, PaginationQuery } from '../types/types';
export declare function buildPaginator<T>(query: PaginationQuery & {
    searchEmailTerm?: string | null;
    searchNameTerm?: string | null;
}, totalCount: number, items: T[]): Paginator<T>;
