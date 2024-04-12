import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ example: 'Note title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Note content' })
  readonly content: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['Note category'] })
  @IsOptional()
  readonly category: string[];
}
