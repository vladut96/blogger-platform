import { IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../../core/dto/pagination.dto';

export class QueryPostsDto extends PaginationDto {
  @IsOptional()
  @IsIn(['createdAt', 'title'])
  sortBy: 'createdAt' | 'title' = 'createdAt';
}
