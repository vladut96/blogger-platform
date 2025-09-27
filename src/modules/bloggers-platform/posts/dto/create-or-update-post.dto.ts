import { IsMongoId, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrUpdatePostDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 30)
  title!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 100)
  shortDescription!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 1000)
  content!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsMongoId()
  blogId!: string;
}

export class CreatePostDtoWithIdParam {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 30)
  title!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 100)
  shortDescription!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(1, 1000)
  content!: string;
}
