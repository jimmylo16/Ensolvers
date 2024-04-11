import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ example: 'Note title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Note content' })
  readonly content: string;

  @IsString()
  @ApiProperty()
  readonly userId: string;

  @IsArray()
  @IsString({ each: true })
  readonly category: string[];
}
