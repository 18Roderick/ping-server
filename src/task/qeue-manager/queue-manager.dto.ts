import { IsString } from 'class-validator';
export class QueueManagerAddDto {
  @IsString()
  idUser: string;
  @IsString()
  idServer: string;
}
