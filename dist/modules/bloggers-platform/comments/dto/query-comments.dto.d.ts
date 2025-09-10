import { PaginationDto } from '../../../../core/dto/pagination.dto';
export declare class QueryCommentsDto extends PaginationDto {
    searchNameTerm: string | null;
}
export declare class QueryBlogsWithIdDto extends PaginationDto {
    blogId: string;
}
