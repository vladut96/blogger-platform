import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  login!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 64)
  password!: string;
}
