import { IsIP, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
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
