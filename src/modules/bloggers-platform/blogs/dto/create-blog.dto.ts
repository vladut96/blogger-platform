import { IsString, IsUrl, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 15)
  name!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 500)
  description!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsUrl()
  @Length(1, 100)
  websiteUrl!: string;
}
