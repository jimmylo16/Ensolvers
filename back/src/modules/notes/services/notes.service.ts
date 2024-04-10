import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-note.dto';
import { UpdatePostDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';
@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.noteRepository.create({
      user: { id: createPostDto.userId },
      ...createPostDto,
    });
    await this.noteRepository.save(post);

    return post;
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const posts = await this.noteRepository.find({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
    });

    return posts;
  }

  findOne(id: string) {
    const post = this.noteRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['id', 'content', 'title', 'user', 'createdAt'],
    });
    if (!post) {
      throw new NotFoundException(`post with id ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatepostDto: UpdatePostDto) {
    await this.findOne(id);

    const updatedpost = await this.noteRepository.update(id, updatepostDto);
    return updatedpost;
  }

  async remove(id: string) {
    const deletedpost = await this.update(id, { deletedAt: new Date() });

    return deletedpost;
  }
}
