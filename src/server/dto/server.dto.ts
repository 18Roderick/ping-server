import { IsIP, IsOptional, IsUrl, IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateServerDto {
  @ValidateIf((o: CreateServerDto) => o.ip === undefined || o.ip === null)
  @IsUrl()
  url: string;

  @ValidateIf((o: CreateServerDto) => o.url === undefined || o.url === null)
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
