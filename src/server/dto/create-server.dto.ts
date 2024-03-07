import { IsIP, IsOptional, IsUrl, IsNotEmpty, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateServerDto {
  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsIP()
  ip: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  title: string;
}

export class UpdateServerDto extends PartialType(CreateServerDto) {
  @IsUUID()
  idServer: string;
}
