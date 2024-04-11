import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ example: 'Note title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Note content' })
  readonly content: string;

  @IsString()
  @IsOptional()
  readonly userId: string;
}
