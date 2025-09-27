import { IsEmail, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(3, 10)
  login!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsEmail()
  email!: string;
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @Length(6, 20)
  password!: string;
}
