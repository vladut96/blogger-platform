import { PaginationDto } from '../../../core/dto/pagination.dto';
export declare class QueryUsersDto extends PaginationDto {
    searchLoginTerm: string | null;
    searchEmailTerm: string | null;
}
