import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsInt()
  pageNumber: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsInt()
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @Transform(({ value }) => (value === 'asc' ? 1 : -1))
  sortDirection: 1 | -1 = -1;
}
