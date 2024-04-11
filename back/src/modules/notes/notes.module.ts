import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category])],
  providers: [NotesService, CategoryService],
  controllers: [NotesController, CategoryController],
  exports: [NotesService, CategoryService],
})
export class NotesModule {}
