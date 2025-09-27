import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../core/dto/pagination.dto';

export class QueryCommentsDto extends PaginationDto {
  @IsOptional() @IsString() searchNameTerm: string | null = null;
}
