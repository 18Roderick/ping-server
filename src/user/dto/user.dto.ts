import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsStrongPassword()
  readonly password: string;

  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(255)
  readonly name: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password'] as const),
) {}

export class UpdateUserPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @IsStrongPassword()
  newPassword: string;
}
