import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { IsNull, Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';
@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string) {
    const uniqueCategories = [...new Set(createNoteDto.category)];
    const note = this.noteRepository.create({
      user: { id: userId },
      ...createNoteDto,
      categories: uniqueCategories.map((categoryId) => ({
        id: categoryId,
      })),
    });
    await this.noteRepository.save(note);

    return note;
  }

  async findAll(pagination: PaginationDto, userId: string) {
    const { limit = 10, offset = 0 } = pagination;
    const notes = await this.noteRepository.find({
      where: { deletedAt: IsNull(), user: { id: userId } },
      take: limit,
      skip: offset,
      relations: ['user', 'categories'],
    });
    console.log({ notes });

    return notes;
  }

  findOne(id: string) {
    const note = this.noteRepository.findOne({
      where: { id: id, deletedAt: IsNull() },
      select: ['id', 'content', 'categories', 'title', 'user', 'createdAt'],
      relations: ['user', 'categories'],
    });
    if (!note) {
      throw new NotFoundException(`note with id ${id} not found`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);
    const uniqueCategories = [...new Set(updateNoteDto.category)];

    const updatedRecord = await this.noteRepository.preload({
      id: id,
      ...updateNoteDto,
      categories: uniqueCategories.map((categoryId) => ({
        id: categoryId,
      })),
    });
    await this.noteRepository.save(updatedRecord);
    return updatedRecord;
  }

  async remove(id: string) {
    console.log(new Date());
    const deletedRecord = await this.update(id, { deletedAt: new Date() });

    return deletedRecord;
  }
}
