import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';
@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const uniqueCategories = [...new Set(createNoteDto.category)];
    const note = this.noteRepository.create({
      user: { id: createNoteDto.userId },
      ...createNoteDto,
      categories: uniqueCategories.map((categoryId) => ({
        id: categoryId,
      })),
    });
    await this.noteRepository.save(note);

    return note;
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const notes = await this.noteRepository.find({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
      relations: ['user', 'categories'],
    });

    return notes;
  }

  findOne(id: string) {
    const note = this.noteRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['id', 'content', 'categories', 'title', 'user', 'createdAt'],
      relations: ['user', 'categories'],
      cache: true,
    });
    if (!note) {
      throw new NotFoundException(`note with id ${id} not found`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);

    const updatedRecord = await this.noteRepository.update(id, updateNoteDto);
    return updatedRecord;
  }

  async remove(id: string) {
    const deletedRecord = await this.update(id, { deletedAt: new Date() });

    return deletedRecord;
  }
}
