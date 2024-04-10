import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ example: 'Note title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Note content' })
  readonly content: string;

  @IsNumber()
  @IsOptional()
  readonly likes?: number;

  @IsString()
  @IsOptional()
  readonly userId: string;
}
