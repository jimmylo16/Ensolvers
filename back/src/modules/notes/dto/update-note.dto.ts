import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-note.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  readonly deletedAt?: Date;
}
