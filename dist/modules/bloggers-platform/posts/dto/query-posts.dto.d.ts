import { PaginationDto } from '../../../../core/dto/pagination.dto';
export declare class QueryPostsDto extends PaginationDto {
    sortBy: 'createdAt' | 'title';
}
