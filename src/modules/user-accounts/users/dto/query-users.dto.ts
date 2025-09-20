import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../core/dto/pagination.dto';

export class QueryUsersDto extends PaginationDto {
  @IsOptional()
  @IsString()
  searchLoginTerm: string | null = null;
  @IsOptional()
  @IsString()
  searchEmailTerm: string | null = null;
}
