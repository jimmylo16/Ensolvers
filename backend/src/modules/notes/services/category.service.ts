import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createDto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      user: { id: createDto.userId },
      ...createDto,
    });
    await this.categoryRepository.save(category);

    return category;
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    const categorys = await this.categoryRepository.find({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
      select: ['id', 'description', 'notes', 'name', 'user', 'createdAt'],
      relations: { notes: true },
    });

    return categorys;
  }

  findOne(id: string) {
    const category = this.categoryRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['id', 'description', 'notes', 'name', 'user', 'createdAt'],
      relations: ['user', 'notes'],
    });
    if (!category) {
      throw new NotFoundException(`category with id ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateDto: UpdateNoteDto) {
    await this.findOne(id);

    const updatedRecord = await this.categoryRepository.update(id, updateDto);
    return updatedRecord;
  }

  async remove(id: string) {
    const deletedRecord = await this.update(id, { deletedAt: new Date() });

    return deletedRecord;
  }
}
