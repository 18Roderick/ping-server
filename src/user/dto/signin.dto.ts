import { IsEmail, MinLength, IsStrongPassword, Equals } from 'class-validator';

export class Signing {
  @MinLength(3)
  name: string;

  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
