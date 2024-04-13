import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { NoteStatus } from '../models/note.model';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  readonly deletedAt?: Date;
  @IsEnum(NoteStatus)
  @ApiProperty({ enum: NoteStatus })
  @IsOptional()
  readonly status?: NoteStatus;
}
