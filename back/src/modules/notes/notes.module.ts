import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesService } from './services/notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
