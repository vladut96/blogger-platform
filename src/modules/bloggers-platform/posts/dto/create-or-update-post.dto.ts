import { IsMongoId, IsString, Length } from 'class-validator';

export class CreateOrUpdatePostDto {
  @IsString() @Length(1, 30) title: string;
  @IsString() @Length(1, 100) shortDescription: string;
  @IsString() @Length(1, 1000) content: string;
  @IsMongoId() blogId: string;
}

export class CreatePostDtoWithIdParam {
  @IsString() @Length(1, 30) title: string;
  @IsString() @Length(1, 100) shortDescription: string;
  @IsString() @Length(1, 1000) content: string;
}
